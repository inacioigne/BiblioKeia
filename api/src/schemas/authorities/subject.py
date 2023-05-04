from pydantic import BaseModel, validator, Field
from typing import Optional, Union
from datetime import datetime
from src.schemas.authorities.mads import Authority
from src.schemas.authorities.authority import Uri, Variant, AdminMetadata, Element

# class Uri(BaseModel):
#     uri: str
#     mads: str
#     type: str

#     _mads = [
#         "hasReciprocalAuthority", 
#         "hasBroaderAuthority",
#         "hasNarrowerAuthority",
#         "hasCloseExternalAuthority",
#         "hasExactExternalAuthority",
#         "subjectOf"
#         ]

#     @validator('mads')
#     def mads_permitido(cls, v):
#         if v not in cls._mads:
#             raise ValueError(f"Mads deve ser um dos seguintes valores: {', '.join(cls._mads)}")
#         return v


# class EditVariant(BaseModel):
#     oldVariant: Authority
#     newVariant: Authority

class Subject(BaseModel):
    type: str 
    adminMetadata: AdminMetadata 
    elementList: list[Element]
    note: Optional[str]
    hasBroaderAuthority: Optional[list[Uri]]
    hasCloseExternalAuthority: Optional[list[Uri]]
    hasExactExternalAuthority: Optional[list[Uri]]
    hasNarrowerAuthority: Optional[list[Uri]]
    hasNarrowerExternalAuthority: Optional[list[Uri]]
    hasVariant: Optional[list[Variant]]
    subjectOf: Optional[list[Uri]]
    isMemberOfMADSCollection: str = Field(default='http://bibliokeia.com/authorities/Topic/')