from pydantic import BaseModel, Field, validator
from src.auth.authenticate import get_password_hash
from typing import Optional

class User_Response(BaseModel):
    id: int
    name: str
    email: str
    addressCep: Optional[str]
    addressCity: Optional[str]
    addressDistrict: Optional[str]
    addressNumber: Optional[str]
    addressStreet: Optional[str]
    birth: Optional[str]
    cellphone: Optional[str]
    sex: Optional[str]
    surname: Optional[str]
    vinculo: Optional[str]
    img: Optional[str]

class Simple_User(BaseModel):
    id: int
    name: str


class User_Request(BaseModel):
    name: str
    email: str
    password: str

class UserCreateRequest(BaseModel):
    name: str
    email: str
    addressCep: Optional[str]
    addressCity: Optional[str]
    addressDistrict: Optional[str]
    addressNumber: Optional[str]
    addressStreet: Optional[str]
    birth: Optional[str]
    cellphone: Optional[str]
    sex: Optional[str]
    surname: Optional[str]
    vinculo: Optional[str]
    hash_password: str = Field(alias='password')

    @validator('hash_password', pre=True)
    def hash_the_password(cls, v):
        return get_password_hash(v)    