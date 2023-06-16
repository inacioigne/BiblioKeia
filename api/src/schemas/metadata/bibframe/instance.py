from pydantic import BaseModel
from typing import Optional
from src.schemas.metadata.bibframe.provisionActivity import ProvisionActivity
from src.schemas.metadata.bibframe.adminMetadata import AdminMetadata
from src.schemas.metadata.bibframe.element import Element
from src.schemas.metadata.bibframe.title import Title

class Value(BaseModel):
    label: str
    type: str

class Instance(BaseModel):
    adminMetadata: AdminMetadata
    type: list[str]
    title: Title
    carrier: list[Element]
    copyrightDate: Optional[str]
    dimensions: Optional[str]
    extent: Optional[Value]
    instanceOf: list[Element]
    issuance: Optional[list[Element]]
    media: Optional[list[Element]]
    provisionActivity: ProvisionActivity
    provisionActivityStatement: Optional[str]
    responsibilityStatement: Optional[str]
    seriesStatement: Optional[str]