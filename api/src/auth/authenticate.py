from src.db.init_db import session
from src.db.models import User 
from passlib.context import CryptContext
import os

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

SECRET_KEY = os.getenv('SECRET_KEY', 'sadasddsadsasad')


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(email: str, password: str):

    user = session.query(User).filter_by(email = email).first()
    
    if not user:
        return False
    if not verify_password(password, user.hash_password):
        return False
    return user