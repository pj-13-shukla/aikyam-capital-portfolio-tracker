from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sector = Column(String, nullable=False)
    ticker = Column(String, nullable=False)
    investment_date = Column(String, nullable=False)
    invested_price = Column(Float, nullable=False)
    num_shares = Column(Integer, nullable=False)
    status = Column(String, default="Active")

    # Auto-calculated fields (stored for reference)
    invested_amount = Column(Float, nullable=True)
    current_valuation = Column(Float, nullable=True)
    moic = Column(Float, nullable=True)
    profit_loss = Column(Float, nullable=True)
    profit_loss_pct = Column(Float, nullable=True)
    current_price = Column(Float, nullable=True)