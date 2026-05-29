from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import api_router

app = FastAPI(
    title="Hub Identity Provider (IdP)",
    description=(
        "Central Single Sign-On microservice provider for PicoCards and Napuccino."
    ),
    version="1.0.0",
)

# Standard development CORS middleware to enable React local dev support
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def read_root() -> dict[str, str]:
    return {"status": "healthy", "service": "Hub Identity Provider"}
