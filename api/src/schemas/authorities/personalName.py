from pydantic import BaseModel
from typing import Optional
from src.schemas.authorities.authority import Variant, AdminMetadata, Element

class Uri(BaseModel):
    value: str
    label: str
    base: Optional[str] = None

class Affiliation(BaseModel):
    organization: Uri
    affiliationStart: Optional[str] = None
    affiliationEnd: Optional[str] = None
    
class PersonalName(BaseModel):
    type: str 
    identifiersLccn: Optional[str] = None
    identifiersLocal: int
    adminMetadata: AdminMetadata 
    authoritativeLabel: str
    elementList: list[Element]
    fullerName: Optional[Element] = None
    birthDayDate: Optional[str] = None
    birthMonthDate: Optional[str] = None
    birthYearDate: Optional[str] = None
    birthDate: Optional[str] = None 
    birthPlace: Optional[str] = None
    deathPlace: Optional[str] = None
    deathDayDate: Optional[str] = None
    deathMonthDate: Optional[str] = None
    deathYearDate: Optional[str] = None
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

