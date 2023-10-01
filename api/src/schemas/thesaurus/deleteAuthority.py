from pydantic import BaseModel
from enum import Enum

class TypesAuthority(str, Enum):
    PersonalName = "PersonalName"
    inactive = "inactive"
    pending = "pending"

class SchemaDeleteAuthority(BaseModel):
    id: str
    type: TypesAuthority = TypesAuthority.PersonalName