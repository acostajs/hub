from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///hub.db"
    JWT_SECRET: str = "your-super-secure-shared-jwt-secret-key"
    COOKIE_DOMAIN: str = ".hub.ca"
    ENVIRONMENT: str = "development"
    HUB_SYSTEM_API_KEY: str = "your-highly-secure-internal-microservice-mesh-token"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
