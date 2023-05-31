from pydantic import BaseModel, validator
from typing import Optional, Union

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
    

class Element(BaseModel):
    elementType: str
    value: str

class Variant(BaseModel):
    variantType: str
    name: Element
    date: Optional[Element]
    
    
class VariantEdit(BaseModel):
    oldVariant: Variant
    newVariant: Variant
    
class Uri(BaseModel):
    id: str
    uri: str
    label: str
    mads: str
    collection: str
    base: str

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
    
    _types = ["topic", "name"]

    @validator('base')
    def type_permitido(cls, v):
        if v not in cls._types:
            raise ValueError(f"Type deve ser um dos seguintes valores: {', '.join(cls._types)}")
        return v