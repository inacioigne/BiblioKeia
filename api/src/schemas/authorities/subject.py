from pydantic import BaseModel, validator, Field
from typing import Optional, Union
from datetime import datetime
from src.schemas.authorities.mads import Authority
from src.schemas.authorities.authority import Uri, Variant, AdminMetadata, Element

class UriEdit(BaseModel):
    authority: str
    uri: str
    value: str
    lang: str
    type: str

class Value(BaseModel):
    authority: str
    value: str
    lang: Optional[str]

class VariantEdit(BaseModel):
    authority: str
    oldValue: str
    oldLang: Optional[str]
    newValue: str
    newLang: Optional[str]

class VariantPost(BaseModel):
    authority: str
    type: str
    value: str
    lang: Optional[str]

class Subject(BaseModel):
    type: str 
    adminMetadata: AdminMetadata 
    elementList: list[Element]
    note: Optional[str]
    hasReciprocalAuthority: Optional[list[Uri]]
    hasReciprocalExternalAuthority: Optional[list[Uri]]
    hasBroaderAuthority: Optional[list[Uri]]
    hasBroaderExternalAuthority: Optional[list[Uri]]
    hasNarrowerAuthority: Optional[list[Uri]]
    hasNarrowerExternalAuthority: Optional[list[Uri]]
    hasCloseExternalAuthority: Optional[list[Uri]]
    hasExactExternalAuthority: Optional[list[Uri]]
    hasVariant: Optional[list[Variant]]
    subjectOf: Optional[list[Uri]]
    isMemberOfMADSCollection: str