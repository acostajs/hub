from datetime import timedelta

import pytest

from app.core.security import (
    create_sso_token,
    decode_sso_token,
    hash_password,
    verify_password,
)


@pytest.mark.anyio
async def test_password_hashing_and_verification():
    password = "secret_password_123"
    hashed = await hash_password(password)

    assert hashed is not None
    assert hashed != password
    assert await verify_password(password, hashed) is True
    assert await verify_password("wrong_password", hashed) is False


def test_jwt_token_creation_and_decoding():
    user_id = "test-user-uuid-123"
    username = "testuser"
    email = "test@hub.ca"

    # Create token
    token = create_sso_token(
        user_id=user_id,
        username=username,
        email=email,
        expires_delta=timedelta(minutes=15),
    )

    assert token is not None

    # Decode and check claims
    payload = decode_sso_token(token)
    assert payload is not None
    assert payload["sub"] == user_id
    assert payload["user_id"] == user_id
    assert payload["username"] == username
    assert payload["email"] == email
    assert "exp" in payload


def test_invalid_jwt_decoding():
    assert decode_sso_token("invalid.token.value") is None
