# SOLARA Backend API

FastAPI service for the SOLARA solar CRM platform. It provides authentication, dashboard reporting, leads, customers, projects, site surveys, blogs, FAQs, calculators, and settings APIs.

## Setup

From this directory, create and activate a virtual environment, then install the pinned dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Configure `DATABASE_URL`, `SECRET_KEY`, and `CORS_ORIGINS` in `.env`. PostgreSQL is the default database for local development and production.

## Database

Apply all Alembic migrations before starting the API:

```powershell
alembic upgrade head
```

Seed the local database with the admin account and sample CRM records:

```powershell
python seed.py
```

The seed account is `admin@solara.com` / `admin123`. Change it before using a non-local environment.

## Run

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

API base URL: `http://localhost:8001/api/v1`  
Swagger UI: `http://localhost:8001/docs`

## Tests

```powershell
pytest tests/test_api.py -q
pytest --cov=app --cov-report=term-missing
```

The site survey API includes filtered listing, create/update/delete operations, and CSV export at `GET /api/v1/site-surveys/export`.
