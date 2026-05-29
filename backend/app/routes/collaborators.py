from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.core.deps import verify_internal_system_token
from app.models.user import User
from app.schemas.auth import UserOut

router = APIRouter(prefix="/users", tags=["Collaborators"])


@router.get(
    "/lookup",
    response_model=UserOut,
    dependencies=[Depends(verify_internal_system_token)],
)
def lookup_user_by_email(email: str, session: Session = Depends(get_session)) -> User:
    """Process email verification lookups requested by subdomains (like PicoCards).

    Returns user profile details if matches, otherwise 404 Not Found.
    """
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    return user
