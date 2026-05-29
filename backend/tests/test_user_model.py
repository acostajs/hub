import pytest
from sqlmodel import Session, SQLModel, create_engine

from app.models.user import User


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


def test_user_creation(session: Session):
    user = User(
        username="teststudent",
        email="student@hub.ca",
        password_hash="hashed_password_string_xyz",
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    assert user.id is not None
    assert len(user.id) == 36
    assert user.username == "teststudent"
    assert user.email == "student@hub.ca"
    assert user.is_active is True
    assert user.created_at is not None
