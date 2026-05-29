# Hub REST API Backend

This is the central identity backend and Single Sign-On (SSO) API service for the Student Hub. Built using Python, **FastAPI**, and **SQLModel**, it manages user registration, secure password hashing, JWT session signing, and wildcard domain cookie issuance.

---

## 🛠️ Technology Stack & Library Suite

* **Core Framework**: **FastAPI** for modern, asynchronous, high-performance API endpoint structures.
* **ORM Engine**: **SQLModel** (combining SQL Alchemy and Pydantic) to maintain single-source database model definitions.
* **Environment Manager**: **uv** for blazing-fast virtual environment creation and package updates.
* **Code Quality & Lints**: **Ruff** for high-speed, strict linting, import sorting, and code formatting.
* **Schema Migrations**: **Alembic** managing incremental, non-destructive SQL structural updates.
* **Testing Framework**: **pytest** + **httpx** running asynchronous unit and integration tests over an ephemeral SQLite in-memory engine.

---

## 📂 Backend Architecture Topography

```text
backend/
├── app/
│   ├── core/
│   │   ├── config.py         # Pydantic Settings loading variables from .env
│   │   ├── cookie.py         # Cookie injector setting hub_session with Domain=.hub.ca
│   │   ├── database.py       # SQLModel database engine & session generator
│   │   ├── deps.py           # Dependency injectors (e.g. verify_internal_system_token)
│   │   └── security.py       # Async password hashing (bcrypt) & JWT token builders
│   ├── models/
│   │   └── user.py           # User database model structure
│   ├── routes/
│   │   ├── api.py            # Aggregated main API router
│   │   ├── auth.py           # Public authentication routers (/register, /login, /logout)
│   │   └── collaborators.py  # Secure internal lookup routers (/users/lookup)
│   ├── schemas/
│   │   └── auth.py           # Pydantic models for request/response serialization
│   └── main.py               # Main FastAPI entry point with CORS configuration
├── migrations/               # Alembic incremental migration tracking directory
├── pyproject.toml            # Python dependency definitions & configuration paths
├── ruff.toml                 # Ruff gate rules
└── alembic.ini               # Alembic migration configuration file
```

---

## ⚙️ Environment Configurations (`.env`)

Configure the following variables in a local `backend/.env` file:

```env
DATABASE_URL="sqlite:///hub.db" # Database connection URL
JWT_SECRET="your-super-secure-shared-jwt-secret-key" # Secret key to sign stateless JWTs
COOKIE_DOMAIN=".hub.ca" # Scopes the SSO cookie to wildcard domain
ENVIRONMENT="development"

# Secure Service-Mesh Communication Keys
HUB_SYSTEM_API_KEY="your-highly-secure-internal-microservice-mesh-token"
```

---

## 💾 Database Schemas & Alembic Migrations

### The `User` Table Schema

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(36)` | **Primary Key**, Unique, UUIDv4 | Unique structural identity used as a distributed foreign key. |
| `username` | `VARCHAR(50)` | Unique, Not Null, Indexed | Handle chosen by the student. |
| `email` | `VARCHAR(255)` | Unique, Not Null, Indexed | Universal verification lookup. Max length 255. |
| `password_hash` | `VARCHAR(255)` | Not Null | bcrypt cryptographic salted password hash. |
| `created_at` | `TIMESTAMP` | Default: `CURRENT_TIMESTAMP` | Audit log tracking when account was created. |
| `is_active` | `BOOLEAN` | Default: `TRUE` | State toggle to suspend/deactivate accounts. |

### Alembic Migration Guide

All database updates must be managed non-destructively through Alembic:

```bash
# Generate a new migration blueprint after modifying SQLModel definitions
uv run alembic revision --autogenerate -m "describe_changes"

# Apply all pending migrations to the active database
uv run alembic upgrade head

# Revert the latest database revision
uv run alembic downgrade -1
```

---

## 🔒 SSO Cookie & Security Architecture

Upon successful credential validation, the `POST /api/login` route signs a stateless JWT token packaging `user_id`, `username`, and `email` with a cryptographically verified signature. 

The token is injected into an HTTP response using a custom cookie injector with strict configurations:
* **Cookie Key**: `hub_session`
* **Domain**: `.hub.ca` (Enables wildcard access across subdomains like `picocards.hub.ca`)
* **Properties**: `HTTPOnly` (Shields cookies from malicious clientside scripts), `Secure=True`, and `SameSite=Lax`.

---

## 🛰️ API Routing Specifications

| Method | Endpoint | Description | Access Level |
|---|---|---|---|
| **POST** | `/api/register` | Registers a new student, verifying email/username uniqueness. Hashes password with bcrypt. | Public |
| **POST** | `/api/login` | Validates credentials, signs JWT, and drops the wildcard domain `hub_session` cookie. | Public |
| **POST** | `/api/logout` | Returns header instructions instructing browser to wipe the `hub_session` cookie. | Authenticated |
| **GET** | `/api/users/lookup` | Intercepts `email` queries from subdomains and returns profile details. | 🔒 **Service Mesh Only** |

### Service-Mesh Secure Interception

To protect the `GET /api/users/lookup` endpoint from unauthorized access or database probing, the system utilizes a custom security dependency. It verifies that incoming headers contain:
```http
X-Internal-System-Token: <HUB_SYSTEM_API_KEY>
```
If the token is invalid or missing, the API responds with a generic `404 Not Found`, completely obscuring user existence.

---

## 🧪 Quick Start & Testing

### 1. Install & Synchronize Dependencies
Ensure you have `uv` installed, then run:
```bash
uv sync
```

### 2. Launch Local Dev Server
```bash
uv run uvicorn app.main:app --reload
```
View active API docs and interactive schema shapes at `http://127.0.0.1:8000/docs`.

### 3. Run Automated Tests
```bash
uv run pytest
```
The test suite operates over an ephemeral SQLite in-memory connection, running isolated database transactions and cleaning up automatically.
