from pydantic import BaseModel
from typing import Optional
from src.schemas.authorities.authority import Variant, AdminMetadata, Element

class Uri(BaseModel):
    value: str
    label: str
    base: Optional[str]

class Affiliation(BaseModel):
    organization: Uri
    affiliationStart: str
    affiliationEnd: Optional[str]
    
class Agents(BaseModel):
    type: str 
    adminMetadata: AdminMetadata 
    elementList: list[Element]
    fullerName: Optional[Element]
    birthDate: Optional[str]
    birthPlace: Optional[str]
    deathDate: Optional[str]
    hasAffiliation: Optional[list[Affiliation]]
    occupation: Optional[list[Uri]]
    hasCloseExternalAuthority: Optional[list[Uri]]
    hasExactExternalAuthority: Optional[list[Uri]]
    hasVariant: Optional[list[Variant]]
    subjectOf: Optional[list[Uri]]
    contributorOf: Optional[list[Uri]]
    isMemberOfMADSCollection: str