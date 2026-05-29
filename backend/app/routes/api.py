from fastapi import APIRouter

from app.routes.auth import router as auth_router
from app.routes.collaborators import router as collaborators_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(collaborators_router)
