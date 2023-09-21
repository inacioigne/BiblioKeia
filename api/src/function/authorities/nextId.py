from src.db.init_db import session
from src.db.models import Authority

def GenerateId():

    authority = session.query(Authority).order_by(Authority.id.desc()).first()   
    if  authority:
        id = authority.id + 1 
        return {'id': id}
    else:
        return {'id': 1}