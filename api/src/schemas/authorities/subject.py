from pydantic import BaseModel, validator, Field
from typing import Optional
from src.schemas.authorities.authority import Uri, Variant, AdminMetadata, Element


class UriDelete(BaseModel):
    authority: str
    uri: str
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
    note: Optional[str] = None
    hasReciprocalAuthority: Optional[list[Uri]] = None
    hasReciprocalExternalAuthority: Optional[list[Uri]] = None
    hasBroaderAuthority: Optional[list[Uri]] = None
    hasBroaderExternalAuthority: Optional[list[Uri]] = None
    hasNarrowerAuthority: Optional[list[Uri]] = None
    hasNarrowerExternalAuthority: Optional[list[Uri]] = None
    hasCloseExternalAuthority: Optional[list[Uri]] = None
    hasExactExternalAuthority: Optional[list[Uri]] = None
    hasVariant: Optional[list[Variant]] = None
    subjectOf: Optional[list[Uri]] = None
    isMemberOfMADSCollection: str