from fastapi import APIRouter, Depends, HTTPException, status
from src.schemas.token import Token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.auth.authenticate import authenticate_user
from datetime import datetime, timedelta
from src.auth.create_token import create_access_token


ACCESS_TOKEN_EXPIRE_HOURS = 24

router = APIRouter()

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = create_access_token(
        #data={"sub": {'username': user.name, 'email': user.email}}, expires_delta=access_token_expires
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
