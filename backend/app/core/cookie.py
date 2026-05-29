from fastapi import Response

from app.core.config import settings


def set_sso_cookie(response: Response, token: str, max_age: int | None = None) -> None:
    """Inject the JWT session token inside a secure, HttpOnly cookie.

    Scoped to the wildcard domain.
    """
    response.set_cookie(
        key="session_token",
        value=token,
        domain=settings.COOKIE_DOMAIN,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=max_age,
    )


def delete_sso_cookie(response: Response) -> None:
    """Clear the session token cookie from the wildcard domain."""
    response.delete_cookie(
        key="session_token",
        domain=settings.COOKIE_DOMAIN,
        httponly=True,
        secure=True,
        samesite="lax",
    )
