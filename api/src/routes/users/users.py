from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from src.schemas.users.user_schema import User_Response, User_Request, UserCreateRequest
from src.auth.current_user import get_current_active_user, get_current_user
from src.db.init_db import session
from src.db.models import User
import shutil
from fastapi.responses import FileResponse

router = APIRouter()

@router.get('/current_user')
async def currrent_user(current_user: User_Response = Depends(get_current_user)):
    return current_user

@router.get('/{user_id}', response_model= User_Response)
async def get_user(user_id: int ):
    user = session.query(User).filter_by(id = user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_response = user.__dict__
    if user_response['img'] is not None:
        user_response['img'] = f'http://localhost:8000/user/{user_id}/imagem'
   

    return User_Response(**user_response) 


@router.post("/register",status_code=201)# response_model=User_Response, )
async def register(request_user: UserCreateRequest):
    user = session.query(User).filter_by(email = request_user.email).first()
    if user:
        raise HTTPException(status_code=409,
                            detail="Email ja cadastrado"
                           )
                           
    atributos = request_user.dict(exclude_unset=True)
    user = User(**atributos)
    session.add(user)
    session.commit()

    return  {'id':user.id,'name':user.name,'email':user.email}

@router.post("/{user_id}/imagem", status_code=201)
async def create_upload_file(user_id: int, file: UploadFile):
    user = session.query(User).filter_by(id = user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    format = file.content_type.split('/')[1]
    path_img = f'./storage/user_profile/{user_id}.{format}'

    with open(path_img, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    user.img = path_img
    session.add(user)
    session.commit()

    return {"filename": path_img }

@router.get("/{user_id}/imagem")
async def get_imagem(user_id: int):
    user = session.query(User).filter_by(id = user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    elif user.img is None:
        raise HTTPException(status_code=404, detail="User without imagem")

    return FileResponse(user.img)

    