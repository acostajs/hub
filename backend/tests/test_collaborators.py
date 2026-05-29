import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings
from app.core.database import get_session
from app.main import app
from app.models import User  # noqa: F401


@pytest.fixture(name="client")
def client_fixture():
    # Setup in-memory sqlite engine with StaticPool for test isolation
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


def test_user_lookup_success(client: TestClient):
    # Register a user first via endpoint
    payload = {
        "username": "meshstudent",
        "email": "mesh@hub.ca",
        "password": "supersecurepassword123",
    }
    client.post("/api/register", json=payload)

    # Perform lookup with valid header and email
    headers = {"X-Internal-System-Token": settings.HUB_SYSTEM_API_KEY}
    response = client.get("/api/users/lookup?email=mesh@hub.ca", headers=headers)
    assert response.status_code == 200

    data = response.json()
    assert data["username"] == "meshstudent"
    assert data["email"] == "mesh@hub.ca"
    assert data["is_active"] is True


def test_user_lookup_nonexistent_email(client: TestClient):
    headers = {"X-Internal-System-Token": settings.HUB_SYSTEM_API_KEY}
    response = client.get("/api/users/lookup?email=nonexistent@hub.ca", headers=headers)
    assert response.status_code == 404
    assert "User not found" in response.json()["detail"]


def test_user_lookup_missing_token(client: TestClient):
    # Missing header altogether
    response = client.get("/api/users/lookup?email=mesh@hub.ca")
    assert response.status_code == 404
    assert "Not Found" in response.json()["detail"]


def test_user_lookup_incorrect_token(client: TestClient):
    # Altered/incorrect header token
    headers = {"X-Internal-System-Token": "altered-token-value"}
    response = client.get("/api/users/lookup?email=mesh@hub.ca", headers=headers)
    assert response.status_code == 404
    assert "Not Found" in response.json()["detail"]
