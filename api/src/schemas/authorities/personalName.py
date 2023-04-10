from pydantic import BaseModel, validator
from typing import Optional, Union
from datetime import datetime
#from src.schemas.authorities.authority import Authority

class Authority(BaseModel):
    value: Union[list, str]
    lang: Optional[str]
    date: Optional[str]
    type: str

    _types = ["Topic", "ComplexSubject", "PersonalName"]

    @validator('type')
    def type_permitido(cls, v):
        if v not in cls._types:
            raise ValueError(f"Type deve ser um dos seguintes valores: {', '.join(cls._types)}")
        return v
    
class Affiliation(BaseModel):
    organization: str
    affiliationStart: str
    affiliationEnd: Optional[str]
    

class PersonalName(BaseModel):
    type = "PersonalName"
    recordChangeDate: Optional[str]
    id: str
    label: str
    date: Optional[str]
    birthDate: Optional[str]
    birthPlace: Optional[str]
    deathDate: Optional[str]
    fullerName: str
    hasCloseExternalAuthority: Optional[list] 
    hasExactExternalAuthority: Optional[list]
    hasVariant: Optional[list[Authority]]
    hasAffiliation: Optional[list[Affiliation]]
    occupation: Optional[list] 
    contributorTo: Optional[list]
    subjectOf: Optional[list]

    @validator('recordChangeDate', pre=True, always=True)
    def set_date_now(cls, v):
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        
        return now