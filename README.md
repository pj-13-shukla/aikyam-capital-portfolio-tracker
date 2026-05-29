```markdown
# Aikyam Capital — Fund Portfolio Tracker

A production-grade internal tool for fund managers to monitor portfolio companies with real-time NSE/BSE stock prices, auto-calculated financial metrics, and a clean dashboard interface.

---

## Live Demo

> Run locally using the instructions below.
> Backend: `http://localhost:8000` | Frontend: `http://localhost:3000`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Recharts, React Hot Toast |
| Backend | FastAPI (Python) |
| Database | SQLite via SQLAlchemy ORM |
| Stock Data | yfinance (Yahoo Finance API) |
| Auth | Stateless localStorage-based session |

---

## Architecture Overview

```
Client (React) ──► FastAPI REST API ──► SQLite DB
                        │
                        └──► yfinance (Live NSE/BSE Prices)
```

- Frontend fetches data from FastAPI via REST
- Backend fetches live CMP from Yahoo Finance on every request
- All financial metrics (MOIC, P&L, Valuation) computed server-side in real-time
- Database auto-seeds 5 portfolio companies on first run

---

## Features

### Core Features
- **Live Stock Prices** — Real-time CMP fetched via Yahoo Finance for NSE-listed stocks
- **Auto-calculated Metrics** — MOIC, Current Valuation, P&L (INR + %), computed on every API call
- **Portfolio Dashboard** — Summary cards + bar chart (Invested vs Current Valuation)
- **Full CRUD** — Add, Edit, Delete, View portfolio companies
- **Company Detail View** — Deep-dive metrics for individual companies

### Bonus Features
- **Authentication** — Hardcoded login with protected routes
- **CSV Export** — One-click portfolio export
- **Auto Refresh** — Live prices refresh every 60 seconds automatically
- **Filter** — Filter table by Status (Active/Exited/Written Off) and Sector
- **Toast Notifications** — Action feedback for add, edit, delete, export
- **Input Validation** — Form-level validation with inline error messages
- **Color-coded P&L** — Green for profit, red for loss across all views

---

## Financial Formulas

| Metric | Formula |
|--------|---------|
| Invested Amount | Invested Price × No. of Shares |
| Current Valuation | Live CMP × No. of Shares |
| MOIC | Current Valuation / Invested Amount |
| Profit / Loss (INR) | (CMP − Invested Price) × No. of Shares |
| Profit / Loss (%) | ((CMP − Invested Price) / Invested Price) × 100 |

---

## Project Structure

```
Aikyam/
├── backend/
│   ├── app/
│   │   ├── main.py         # FastAPI entry point, CORS, DB init, seed data
│   │   ├── models.py       # SQLAlchemy ORM models
│   │   ├── schemas.py      # Pydantic request/response schemas
│   │   ├── routes.py       # All REST API endpoints + yfinance integration
│   │   └── database.py     # DB engine, session, base config
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js       # Top navigation
│       │   ├── SummaryBar.js   # KPI cards
│       │   ├── CompanyTable.js # Filterable data table + CSV export
│       │   └── CompanyChart.js # Recharts bar chart
│       ├── pages/
│       │   ├── Dashboard.js       # Main portfolio view
│       │   ├── Login.js           # Auth page
│       │   ├── AddEditCompany.js  # Create/update form
│       │   └── CompanyDetail.js   # Single company metrics
│       └── context/
│           └── AuthContext.js  # Global auth state
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 16+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/pj-13-shukla/aikyam-capital-portfolio-tracker.git
cd aikyam-capital-portfolio-tracker
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API runs at: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

- App runs at: `http://localhost:3000`

---

## Login Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `password123` |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies` | List all portfolio companies |
| POST | `/api/companies` | Add a new company |
| GET | `/api/companies/:id` | Get single company details |
| PUT | `/api/companies/:id` | Update company metrics |
| DELETE | `/api/companies/:id` | Remove a company |

---

## Known Issues & Trade-offs

| Issue | Explanation |
|-------|-------------|
| Zomato (ZOMATO.NS) shows N/A | Ticker temporarily unavailable on Yahoo Finance — app handles gracefully without crashing |
| SQLite used instead of PostgreSQL | Chosen for zero-config local setup; production would use PostgreSQL |
| Hardcoded auth | Stateless localStorage session — production would use JWT + bcrypt |
| No rate limiting on API | Acceptable for internal tool; would add in production |

---

## What I Would Improve Given More Time

- Migrate to PostgreSQL for production
- Add JWT-based authentication
- Add price caching (Redis) to reduce yfinance API calls
- Add unit tests for API endpoints (pytest)
- Deploy backend on Render, frontend on Vercel
- Add historical performance charts (line chart over time)

---

## Built By

**Pranjal Shukla** — AI & Automation Engineer  
[GitHub](https://github.com/pj-13-shukla)
```
