from datetime import UTC, datetime, timedelta

import anyio
import bcrypt
import jwt

from app.core.config import settings

ALGORITHM = "HS256"


def _hash_password_sync(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def _verify_password_sync(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"), hashed_password.encode("utf-8")
        )
    except Exception:
        return False


async def hash_password(password: str) -> str:
    """Asynchronously hash a password using bcrypt and anyio thread pool."""
    return await anyio.to_thread.run_sync(_hash_password_sync, password)


async def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Asynchronously verify a password using bcrypt and anyio thread pool."""
    return await anyio.to_thread.run_sync(
        _verify_password_sync, plain_password, hashed_password
    )


def create_sso_token(
    user_id: str,
    username: str,
    email: str,
    expires_delta: timedelta | None = None,
) -> str:
    """Build a stateless JWT token packaging user_id, sub, username, and email."""
    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(days=1)

    payload = {
        "sub": user_id,
        "user_id": user_id,
        "username": username,
        "email": email,
        "exp": int(expire.timestamp()),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=ALGORITHM)


def decode_sso_token(token: str) -> dict | None:
    """Decode and verify a stateless JWT SSO token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
