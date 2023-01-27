from fastapi import APIRouter, Depends, HTTPException, UploadFile
from src.db.init_db import session
#from src.db.models import Item
import shutil
from fastapi.responses import FileResponse


router = APIRouter()

@router.post("/{item_id}/imagem", status_code=201) 
async def upload_imagem(
    item_id: str, file: UploadFile):
    # item = session.query(Item).filter_by(id = item_id).first()
    # if item is None:
    #     raise HTTPException(status_code=404, detail="Item not found")

    format = file.content_type.split('/')[1]
    #path_img = f'./api/storage/cover/{item_id}.{format}'
    path_img = f'./ui/public/cover/{item_id}.{format}'

    with open(path_img, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    # item.img = path_img
    # session.add(item)
    # session.commit()

    return {"filename": path_img }

@router.get("/{item_id}/imagem")
async def get_imagem(item_id: str):
    #item = session.query(Item).filter_by(id = item_id).first()
   
    # if item is None:
    #     raise HTTPException(status_code=404, detail="Item not found")
    # elif item.img is None:
    #     #raise HTTPException(status_code=404, detail="Item without imagem")
    #     return FileResponse("./storage/items/default.png")

    return FileResponse(f"./api/storage/cover/{item_id}.jpeg")