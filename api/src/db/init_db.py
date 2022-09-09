from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import *

engine = create_engine("mariadb+mariadbconnector://admin:8486@127.0.0.1:3306/keia_db")

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))


def initializeDatabase():
    Base.metadata.create_all(bind=engine)
