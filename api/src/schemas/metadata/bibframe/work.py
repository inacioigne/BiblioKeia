from pydantic import BaseModel
from typing import Optional
from src.schemas.metadata.bibframe.adminMetadata import AdminMetadata
from src.schemas.metadata.bibframe.classification import Classification
# from src.schemas.metadata.bibframe.content import Content
from src.schemas.metadata.bibframe.contribution import Contribution
from src.schemas.metadata.bibframe.element import Element
from src.schemas.metadata.bibframe.title import Title

class Work(BaseModel):
    adminMetadata: AdminMetadata
    type: list[str]
    content: list[Element]
    language: list[Element]
    title: Title
    classification: Optional[Classification]
    contribution: Optional[list[Contribution]]
    subject: Optional[list[Element]]   
    genreForm: Optional[list[Element]]
    note: Optional[str]
    summary: Optional[str]
    tableOfContents: Optional[str]
    supplementaryContent: Optional[list[Element]]
    illustrativeContent: Optional[list[Element]]
    intendedAudience: Optional[list[Element]]
    geographicCoverage: Optional[list[Element]]
    