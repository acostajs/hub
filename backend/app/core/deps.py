from fastapi import Header, HTTPException, status

from app.core.config import settings


async def verify_internal_system_token(
    x_internal_system_token: str | None = Header(None, alias="X-Internal-System-Token"),
) -> None:
    """Security guard checking X-Internal-System-Token against HUB_SYSTEM_API_KEY.

    Returns a standard 404 Not Found if missing or incorrect to hide structure.
    """
    if (
        not x_internal_system_token
        or x_internal_system_token != settings.HUB_SYSTEM_API_KEY
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not Found",
        )
