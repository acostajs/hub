import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine

from app.core.database import get_session
from app.main import app
from app.models import User  # noqa: F401


@pytest.fixture(name="client")
def client_fixture():
    # Setup in-memory sqlite engine for test isolation with StaticPool
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)

    def override_get_session():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session

    with TestClient(app) as client:
        yield client

    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(engine)


def test_register_user_success(client: TestClient):
    payload = {
        "username": "newstudent",
        "email": "student@hub.ca",
        "password": "supersecurepassword123",
    }
    response = client.post("/api/register", json=payload)
    assert response.status_code == 201

    data = response.json()
    assert data["id"] is not None
    assert data["username"] == "newstudent"
    assert data["email"] == "student@hub.ca"
    assert "password_hash" not in data
    assert data["is_active"] is True


def test_register_duplicate_username_or_email(client: TestClient):
    payload = {
        "username": "newstudent",
        "email": "student@hub.ca",
        "password": "supersecurepassword123",
    }
    # First registration
    response = client.post("/api/register", json=payload)
    assert response.status_code == 201

    # Duplicate username
    payload2 = {
        "username": "newstudent",
        "email": "other@hub.ca",
        "password": "supersecurepassword123",
    }
    response2 = client.post("/api/register", json=payload2)
    assert response2.status_code == 400
    assert "Username already registered" in response2.json()["detail"]

    # Duplicate email
    payload3 = {
        "username": "otherstudent",
        "email": "student@hub.ca",
        "password": "supersecurepassword123",
    }
    response3 = client.post("/api/register", json=payload3)
    assert response3.status_code == 400
    assert "Email address already registered" in response3.json()["detail"]


def test_login_success(client: TestClient):
    # Register first
    payload = {
        "username": "loginstudent",
        "email": "login@hub.ca",
        "password": "supersecurepassword123",
    }
    client.post("/api/register", json=payload)

    # Login using email
    login_payload = {"email": "login@hub.ca", "password": "supersecurepassword123"}
    response = client.post("/api/login", json=login_payload)
    assert response.status_code == 200

    data = response.json()
    assert data["username"] == "loginstudent"
    assert data["email"] == "login@hub.ca"

    # Verify cookie was attached to root domain
    cookie_header = response.headers.get("set-cookie")
    assert cookie_header is not None
    assert "hub_session=" in cookie_header
    assert "Domain=.hub.ca" in cookie_header


def test_login_incorrect_credentials(client: TestClient):
    # Register first
    payload = {
        "username": "loginstudent",
        "email": "login@hub.ca",
        "password": "supersecurepassword123",
    }
    client.post("/api/register", json=payload)

    # Wrong password
    response = client.post(
        "/api/login", json={"email": "login@hub.ca", "password": "wrongpassword"}
    )
    assert response.status_code == 400
    assert "Incorrect email/username or password" in response.json()["detail"]

    # Non-existing email
    response2 = client.post(
        "/api/login",
        json={"email": "nonexistent@hub.ca", "password": "password123"},
    )
    assert response2.status_code == 400
    assert "Incorrect email/username or password" in response2.json()["detail"]


def test_logout(client: TestClient):
    response = client.post("/api/logout")
    assert response.status_code == 200
    assert response.json()["detail"] == "Successfully logged out."

    cookie_header = response.headers.get("set-cookie")
    assert cookie_header is not None
    assert "hub_session=" in cookie_header
    assert "max-age=0" in cookie_header.lower() or "expires=" in cookie_header.lower()
