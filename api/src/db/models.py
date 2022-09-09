from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, LargeBinary, ForeignKey, true
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
    loan = relationship("Loan", back_populates="user")

    def json(self):
        return {'id': self.id, 'name': self.name, "email": self.email}

    def __repr__(self):
        
        return f"id:{self.id!r}, name:{self.name!r}, email:{self.email!r}"

class Loan(Base):
    __tablename__ = 'loan'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    exemplar = Column(String(100))
    created_at = Column(Date, default=datetime.now())
    due = Column(Date, default=datetime.now()+timedelta(days = 7))
    status = Column(String(100), default="Emprestado")
    log = Column(JSON)


    user = relationship("User", back_populates="loan")
    