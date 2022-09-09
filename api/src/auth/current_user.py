from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from security import SECRET_KEY, JWT_ALGORITHM
from src.schemas.token import TokenData
from src.db.init_db import session
from src.db.models import User
from src.schemas.users.user_schema import Simple_User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(username: str):
    user = session.query(User).filter_by(name = username).first()
    if user:   
        return Simple_User(**user.json())

async def get_current_user(token: str = Depends(oauth2_scheme)):
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="NÃO DEU: Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        
        username: str = payload.get("sub")
        
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
        
    except JWTError:
        #print('TOKEN: ', payload)
        raise credentials_exception
    user = get_user(username=token_data.username)
    
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: Simple_User = Depends(get_current_user)):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user