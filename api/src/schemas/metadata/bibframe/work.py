from pydantic import BaseModel
from typing import Optional
from src.schemas.metadata.bibframe.adminMetadata import AdminMetadata
from src.schemas.metadata.bibframe.classification import Classification
from src.schemas.metadata.bibframe.contribution import Contribution
from src.schemas.metadata.bibframe.element import Element
from src.schemas.metadata.bibframe.title import Title

class Work(BaseModel):
    adminMetadata: AdminMetadata
    type: list[str]
    content: list[Element]
    language: list[Element]
    title: Title
    classification: Optional[Classification] = None
    contribution: Optional[list[Contribution]] = None
    subject: Optional[list[Element]] = None
    genreForm: Optional[list[Element]] = None
    note: Optional[str] = None
    summary: Optional[str] = None
    tableOfContents: Optional[str] = None
    supplementaryContent: Optional[list[Element]] = None
    illustrativeContent: Optional[list[Element]] = None
    intendedAudience: Optional[list[Element]] = None
    geographicCoverage: Optional[list[Element]] = None
    