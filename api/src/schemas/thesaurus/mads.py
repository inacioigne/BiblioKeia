from pydantic import BaseModel
from typing import Optional

class Label(BaseModel):
    value: str
    lang: Optional[str] = None

class Element(BaseModel):
    type: str
    elementValue: Label 

class Uri(BaseModel):
    value: str
    label: str
    base: Optional[str] = None

class Affiliation(BaseModel):
    organization: Uri
    affiliationStart: Optional[str] = None
    affiliationEnd: Optional[str] = None


class Authority(BaseModel):
    type: str 
    identifiersLccn: Optional[str] = None
    identifiersLocal: Optional[str] = None
    # adminMetadata: AdminMetadata 
    authoritativeLabel: str
    elementList: list[Element]
    fullerName: Optional[Element] = None
    identifiesRWO: Optional[list[str]] = None
    birthPlace: Optional[str] = None
    birthDate: Optional[str] = None 
    hasAffiliation: Optional[list[Affiliation]] = None
    # birthDayDate: Optional[str] = None
    # birthMonthDate: Optional[str] = None
    # birthYearDate: Optional[str] = None
    # 
    # 
    # deathPlace: Optional[str] = None
    # deathDayDate: Optional[str] = None
    # deathMonthDate: Optional[str] = None
    # deathYearDate: Optional[str] = None
    # deathDate: Optional[str] = None
    # 
    # occupation: Optional[list[Uri]] = None
    # fieldOfActivity: Optional[list[Uri]] = None
    # hasCloseExternalAuthority: Optional[list[Uri]] = None
    # hasExactExternalAuthority: Optional[list[Uri]] = None
    # hasVariant: Optional[list[Variant]] = None
    # subjectOf: Optional[list[Uri]] = None
    # contributorOf: Optional[list[Uri]] = None
    # isMemberOfMADSCollection: str
    # imagem: Optional[str] = None