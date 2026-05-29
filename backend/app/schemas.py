from pydantic import BaseModel
from typing import Optional

class CompanyBase(BaseModel):
    name: str
    sector: str
    ticker: str
    investment_date: str
    invested_price: float
    num_shares: int
    status: str = "Active"

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    sector: Optional[str] = None
    ticker: Optional[str] = None
    investment_date: Optional[str] = None
    invested_price: Optional[float] = None
    num_shares: Optional[int] = None
    status: Optional[str] = None

class CompanyResponse(CompanyBase):
    id: int
    invested_amount: Optional[float] = None
    current_valuation: Optional[float] = None
    moic: Optional[float] = None
    profit_loss: Optional[float] = None
    profit_loss_pct: Optional[float] = None
    current_price: Optional[float] = None

    class Config:
        from_attributes = True