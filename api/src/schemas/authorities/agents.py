from pydantic import BaseModel
from typing import Optional
from src.schemas.authorities.authority import Variant, AdminMetadata, Element

class Uri(BaseModel):
    value: str
    label: str
    base: Optional[str]

class Affiliation(BaseModel):
    organization: Uri
    affiliationStart: Optional[str]
    affiliationEnd: Optional[str]
    
class Agents(BaseModel):
    type: str 
    adminMetadata: AdminMetadata 
    elementList: list[Element]
    fullerName: Optional[Element] = None
    birthDate: Optional[str] = None
    birthPlace: Optional[str] = None
    deathDate: Optional[str] = None
    hasAffiliation: Optional[list[Affiliation]] = None
    occupation: Optional[list[Uri]] = None
    fieldOfActivity: Optional[list[Uri]] = None
    hasCloseExternalAuthority: Optional[list[Uri]] = None
    hasExactExternalAuthority: Optional[list[Uri]] = None
    hasVariant: Optional[list[Variant]] = None
    subjectOf: Optional[list[Uri]] = None
    contributorOf: Optional[list[Uri]] = None
    isMemberOfMADSCollection: str

