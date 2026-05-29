import uuid
from datetime import UTC, datetime
from typing import ClassVar

from sqlalchemy import Boolean, Column, DateTime, String, text
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    __tablename__: ClassVar[str] = "user"

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        sa_column=Column(String(36), primary_key=True, index=True, nullable=False),
    )
    username: str = Field(
        sa_column=Column(String(50), unique=True, index=True, nullable=False),
    )
    email: str = Field(
        sa_column=Column(String(255), unique=True, index=True, nullable=False),
    )
    password_hash: str = Field(
        sa_column=Column(String(255), nullable=False),
    )
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            server_default=text("CURRENT_TIMESTAMP"),
        ),
    )
    is_active: bool = Field(
        default=True,
        sa_column=Column(
            Boolean, nullable=False, server_default=text("true")
        ),  # Safe for both sqlite and postgres
    )
