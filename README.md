# Student Hub (SSO Identity Provider)

Welcome to the **Student Hub**, the central Single Sign-On (SSO) gateway and identity management microservice for the student-focused application ecosystem (including subdomains such as `picocards.hub.ca` and `napuccino.hub.ca`).

The Hub is designed to completely eliminate repetitive credential checks and "login exhaustion" by authenticating students once at `hub.ca` and distributing a secure, shared root-domain cookie. This stateless token acts as a secure identity passport across all connected web utilities.

---

## 🏗️ Repository Topography

This repository is organized as a monorepo containing both the React frontend single-page application and the FastAPI backend API:

```text
hub-repository/
├── .docs/                # Curated system specifications & guardrails
│   ├── CONTEXT.md        # Core product vision & internationalization guide
│   ├── ARCHITECTURE.md   # DB schemas & API routing specs
│   ├── DESIGN.md         # Monochromatic design system tokens
│   ├── CLEAN_CODE.md     # Code guidelines, type laws, & test requirements
│   └── TODO.md           # Implementation checklist
│
├── lefthook.yml          # Git pre-commit orchestrator (Biome, Ruff, tsc)
│
├── frontend/             # Single-Page React App (Bun + React + TypeScript)
│   ├── src/
│   │   ├── components/   # Shared UI components
│   │   ├── context/      # AuthContext & LanguageContext systems
│   │   ├── pages/        # Domain-driven features (Portal, Login, Register)
│   │   ├── styles/       # Global CSS definitions
│   │   └── main.tsx      # Application bootloader
│   ├── package.json      # Node-compatible manifest
│   └── biome.json        # Unified Biome linter/formatter configurations
│
└── backend/              # RESTful API Service (uv + FastAPI + SQLModel)
    ├── app/
    │   ├── core/         # SSO cookie engines, cryptos, & DB configurations
    │   ├── models/       # User schemas mapped via SQLModel
    │   └── routes/       # Auth routes & service-mesh lookups
    ├── pyproject.toml    # Python dependencies & metadata
    └── ruff.toml         # Ruff quality gate rules
```

---

## 🛠️ Global Technology Stack & Operations

The Hub enforces clean segregation of operational tools and avoids any custom/local installations of standard Node.js:

* **Frontend Environment**: Executed exclusively via **Bun**. Biome acts as the exclusive gatekeeper for automatic formatting and linting.
* **Backend Environment**: Executed exclusively via **uv** (virtual environment & package manager). Ruff handles all quality checks, linting, and formatting.
* **Database & Migration Engine**: Local development utilizes **SQLite** (`hub.db`). Production deployments target **PostgreSQL**. Database schema updates are managed dynamically via **Alembic**.
* **Pre-Commit Infrastructure**: Managed via **Lefthook**. Commits are blocked if formatting issues (Ruff/Biome) or TypeScript compilation errors are detected.

---

## 🚀 Quick Start (Local Development)

Ensure you have [Bun](https://bun.sh/) and [uv](https://github.com/astral-sh/uv) installed on your local machine.

### 1. Run the Backend API

Navigate to the `backend/` directory, set up your virtual environment, run database migrations, and spin up the development server:

```bash
cd backend
# Synchronize environment and dependencies
uv sync

# Apply existing Alembic database migrations
uv run alembic upgrade head

# Start the FastAPI server with hot-reload enabled
uv run uvicorn app.main:app --reload
```

The backend server runs locally at: `http://127.0.0.1:8000` (API documentation is available at `http://127.0.0.1:8000/docs`).

### 2. Run the Frontend SPA

Navigate to the `frontend/` directory, install packages, and start the hot-reloading Bun development server:

```bash
cd frontend
# Install dependencies
bun install

# Start the dev server
bun dev
```

The frontend portal runs locally at: `http://localhost:3000`.

---

## 🛡️ Git pre-commit Verification

Before submitting any code changes, Lefthook automatically validates your staged files:

```bash
# Manually run pre-commit validations
npx lefthook run pre-commit
```

This enforces:
* **Frontend**: `bun biome check --write` & TypeScript compilation checks (`tsc --noEmit`).
* **Backend**: `uv run ruff check --fix` & `uv run ruff format`.

For detailed architecture and styling specifications, please refer directly to the markdown files in the **[.docs/](file:///Users/juan/Documents/hub/.docs/)** folder.