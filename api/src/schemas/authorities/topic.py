from pydantic import BaseModel, validator
from typing import Optional, Union
from datetime import datetime
from src.schemas.authorities.mads import Authority

class Uri(BaseModel):
    uri: str
    mads: str
    type: str

    _mads = [
        "hasReciprocalAuthority", 
        "hasBroaderAuthority",
        "hasNarrowerAuthority",
        "hasCloseExternalAuthority",
        "hasExactExternalAuthority",
        "subjectOf"
        ]

    @validator('mads')
    def mads_permitido(cls, v):
        if v not in cls._mads:
            raise ValueError(f"Mads deve ser um dos seguintes valores: {', '.join(cls._mads)}")
        return v


class EditVariant(BaseModel):
    oldVariant: Authority
    newVariant: Authority

class Topic(BaseModel):
    type = "Topic"
    recordChangeDate: Optional[str]
    identifier: str
    label: str
    lang: str
    hasReciprocalAuthority: Optional[list]
    hasBroaderAuthority: Optional[list]
    hasNarrowerAuthority: Optional[list]
    hasCloseExternalAuthority: Optional[list]
    hasExactExternalAuthority: Optional[list]
    hasVariant: Optional[list[Authority]]
    subjectOf: Optional[list]

    @validator('recordChangeDate', pre=True, always=True)
    def set_date_now(cls, v):
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        
        return now