from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import router
from . import models, database

app = FastAPI(title="Aikyam Capital Portfolio Tracker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router, prefix="/api")

@app.on_event("startup")
def seed_data():
    db = database.SessionLocal()
    if db.query(models.Company).count() == 0:
        companies = [
            models.Company(name="Zomato", sector="Food Tech", ticker="ZOMATO.NS", investment_date="2022-02-15", invested_price=125, num_shares=10000, status="Active"),
            models.Company(name="Paytm", sector="Fintech", ticker="PAYTM.NS", investment_date="2021-11-18", invested_price=950, num_shares=5000, status="Active"),
            models.Company(name="Nykaa", sector="E-commerce", ticker="NYKAA.NS", investment_date="2021-11-10", invested_price=1125, num_shares=8000, status="Active"),
            models.Company(name="PB Fintech", sector="Insurtech", ticker="POLICYBZR.NS", investment_date="2021-11-01", invested_price=980, num_shares=6500, status="Active"),
            models.Company(name="Nazara Tech", sector="Gaming", ticker="NAZARA.NS", investment_date="2021-03-30", invested_price=1800, num_shares=3000, status="Exited"),
        ]
        db.add_all(companies)
        db.commit()
    db.close()