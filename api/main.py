from src.db.init_db import initializeDatabase
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from src.routes.users import login
from src.routes.users import users
from src.routes.cataloguing import images, generateId, work, instances, items, hub
from src.routes.translate import translate
from src.routes.authorities import authority, subjects, agents
from src.routes.importation import loc

import uvicorn

initializeDatabase()


app = FastAPI(
    title="BiblioKeia",
    description="Backend API for BiblioKeia",
    contact={
        "name": "Inácio Oliveira",
        "url": "https://github.com/inacioigne",
        "email": "inacioigne@gmail.com",
    }
)

origins = [
    "http://localhost:3000",
    'http://127.0.0.1:3000',
    "http://172.21.214.56:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allow_headers=["*"],
)

app.include_router(login.router, tags=['Login'])
app.include_router(users.router, prefix='/user', tags=['Users'])
app.include_router(images.router, prefix='/items', tags=['Images'])
app.include_router(generateId.router, prefix='/items', tags=['Cataloguing'])
app.include_router(hub.router, prefix='/cataloguing', tags=['Cataloguing'])
app.include_router(work.router, prefix='/cataloguing', tags=['Cataloguing Work'])
app.include_router(instances.router, prefix='/cataloguing', tags=['Cataloguing'])
app.include_router(items.router, prefix='/cataloguing', tags=['Cataloguing'])
app.include_router(translate.router, prefix='/translate', tags=['Tradutor'])

# Importation
app.include_router(loc.router, prefix='/import/loc', tags=['Import'])

# Authorities
app.include_router(subjects.router, prefix='/authorities', tags=['Authorities'])
app.include_router(agents.router, prefix='/authorities', tags=['Authorities'])
app.include_router(authority.router, prefix='/authorities', tags=['Authorities'])


# Catalog



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
