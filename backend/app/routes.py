from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import yfinance as yf
from . import models, schemas
from .database import get_db

router = APIRouter()

def fetch_live_price(ticker: str):
    try:
        stock = yf.Ticker(ticker)
        price = stock.fast_info['last_price']
        return round(price, 2)
    except:
        return None

def calculate_metrics(company, live_price):
    if live_price:
        company.current_price = live_price
        company.invested_amount = round(company.invested_price * company.num_shares, 2)
        company.current_valuation = round(live_price * company.num_shares, 2)
        company.moic = round(company.current_valuation / company.invested_amount, 2)
        company.profit_loss = round((live_price - company.invested_price) * company.num_shares, 2)
        company.profit_loss_pct = round(((live_price - company.invested_price) / company.invested_price) * 100, 2)
    return company

@router.get("/companies", response_model=List[schemas.CompanyResponse])
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(models.Company).all()
    for company in companies:
        live_price = fetch_live_price(company.ticker)
        calculate_metrics(company, live_price)
    return companies

@router.get("/companies/{company_id}", response_model=schemas.CompanyResponse)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    live_price = fetch_live_price(company.ticker)
    calculate_metrics(company, live_price)
    return company

@router.post("/companies", response_model=schemas.CompanyResponse)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    db_company = models.Company(**company.dict())
    live_price = fetch_live_price(db_company.ticker)
    calculate_metrics(db_company, live_price)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

@router.put("/companies/{company_id}", response_model=schemas.CompanyResponse)
def update_company(company_id: int, company: schemas.CompanyUpdate, db: Session = Depends(get_db)):
    db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    for key, value in company.dict(exclude_unset=True).items():
        setattr(db_company, key, value)
    live_price = fetch_live_price(db_company.ticker)
    calculate_metrics(db_company, live_price)
    db.commit()
    db.refresh(db_company)
    return db_company

@router.delete("/companies/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(company)
    db.commit()
    return {"message": "Company deleted successfully"}