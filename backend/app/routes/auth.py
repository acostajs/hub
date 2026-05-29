from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlmodel import Session, select

from app.core.cookie import delete_sso_cookie, set_sso_cookie
from app.core.database import get_session
from app.core.security import create_sso_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import UserLogin, UserOut, UserRegister

router = APIRouter(prefix="", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserOut)
async def register(
    user_in: UserRegister, session: Session = Depends(get_session)
) -> User:
    """Register a new student user, ensuring username and email are unique."""
    # Check for email collision
    email_exists = session.exec(select(User).where(User.email == user_in.email)).first()
    if email_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already registered.",
        )

    # Check for username collision
    username_exists = session.exec(
        select(User).where(User.username == user_in.username)
    ).first()
    if username_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered.",
        )

    # Hash the password asynchronously
    hashed = await hash_password(user_in.password)

    db_user = User(username=user_in.username, email=user_in.email, password_hash=hashed)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@router.post("/login", response_model=UserOut)
async def login(
    response: Response,
    user_in: UserLogin,
    session: Session = Depends(get_session),
) -> User:
    """Authenticate student credentials.

    Signs a stateless JWT token and appends cross-subdomain cookies.
    """
    # Look up by email (or username, for enhanced usability)
    db_user = session.exec(
        select(User).where(
            (User.email == user_in.email) | (User.username == user_in.email)
        )
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email/username or password.",
        )

    # Verify password asynchronously
    is_valid = await verify_password(user_in.password, db_user.password_hash)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email/username or password.",
        )

    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User account is deactivated.",
        )

    # Generate secure JWT SSO token
    token = create_sso_token(
        user_id=db_user.id, username=db_user.username, email=db_user.email
    )

    # Append cross-subdomain wildcard cookie
    set_sso_cookie(response, token)

    return db_user


@router.post("/logout")
async def logout(response: Response) -> dict[str, str]:
    """Wipe the browser's token cookie container instantly."""
    delete_sso_cookie(response)
    return {"detail": "Successfully logged out."}
