from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, DATETIME, ForeignKey, true
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from sqlalchemy.dialects.mysql import JSON

Base = declarative_base()

#Users
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    addressCep = Column(String(100))
    addressCity = Column(String(100))
    addressDistrict = Column(String(100))
    addressNumber = Column(String(100))
    addressStreet = Column(String(100))
    birth = Column(String(100))
    cellphone = Column(String(100))
    sex = Column(String(100))
    surname = Column(String(100))
    vinculo = Column(String(100))
    img = Column(String(100))
    hash_password = Column(String(255))
    created_at = Column(Date, default=datetime.now())

    #relationship
    loan_active = relationship("LoanActive", back_populates="user")
    loan_historic = relationship("LoanHistoric", back_populates="user")

    def json(self):
        return {'id': self.id, 'name': self.name, "email": self.email}

    def __repr__(self):
        return f"id:{self.id!r}, name:{self.name!r}, email:{self.email!r}"
    
class Item(Base):
    __tablename__ = 'item'
    id = Column(Integer, primary_key=True)
    itemnumber = Column(String(8))
    title = Column(String(200))
    barcode = Column(String(8))

    #relationship
    loan_active = relationship("LoanActive", back_populates="item")
    loan_historic = relationship("LoanHistoric", back_populates="item")

class LoanActive(Base):
    __tablename__ = 'loan_active'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    item_id = Column(Integer, ForeignKey('item.id'))
    loan_at = Column(DATETIME, default=datetime.now())
    due = Column(DATETIME, default=datetime.now()+timedelta(days = 7))
    return_at = Column(DATETIME)
    log = Column(JSON)

    user = relationship("User", back_populates="loan_active")
    item = relationship("Item", back_populates="loan_active")

class LoanHistoric(Base):
    __tablename__ = 'loan_historic'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    item_id = Column(Integer, ForeignKey('item.id'))
    loan_at = Column(DATETIME, default=datetime.now())
    due = Column(DATETIME, default=datetime.now()+timedelta(days = 7))
    return_at = Column(DATETIME)
    log = Column(JSON)

    user = relationship("User", back_populates="loan_historic")
    item = relationship("Item", back_populates="loan_historic")

class Authority(Base):
    __tablename__ = 'authority'
    id = Column(Integer, primary_key=True)
    type = Column(String(20))
    uri = Column(String(200))


    