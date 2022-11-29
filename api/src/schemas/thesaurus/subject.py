from pydantic import BaseModel
from typing import Optional

class Authority(BaseModel):
    value: str
    lang: str

class AuthorityExternal(BaseModel):
    value: str
    lang: str
    uri: str


class Subject_Schema(BaseModel):
    authority: Authority
    tokenLSCH: str
    variant: list[Authority]
    narrower: list[AuthorityExternal]
    reciprocalAuthority: Optional[AuthorityExternal]
    exactExternalAuthority: Optional[list]
    closeExternalAuthority: Optional[list]

{
    "authority": {
        "value": "Metodologia",
        "lang": "pt"
    },
    "reciprocalAuthority": {
        "value": "Pesquisar",
        "lang": "pt",
        "uri": "http://id.loc.gov/authorities/subjects/sh85113021"
    },
    "narrower": [
        {
            "value": "experimentos mentais",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh00002301"
        },
        {
            "value": "Performativo (Filosofia)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85099817"
        },
        {
            "value": "Genealogia (Filosofia)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh94000124"
        },
        {
            "value": "Formalização (Filosofia)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85050813"
        },
        {
            "value": "Análise (Filosofia)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85004780"
        },
        {
            "value": "Classificação das ciências",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85026813"
        },
        {
            "value": "método longitudinal",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85078296"
        },
        {
            "value": "Heurística",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85060556"
        },
        {
            "value": "Abordagem interdisciplinar do conhecimento",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85067232"
        },
        {
            "value": "Solução de problemas",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85107109"
        }
    ],
    "variant": [
        {
            "value": "Filosofia - Metodologia",
            "lang": "pt"
        }
    ],
    "exactExternalAuthority": [
        "http://id.loc.gov/authorities/subjects/sh85084414",
        "http://lod.nal.usda.gov/nalt/5079",
        "http://aims.fao.org/aos/agrovoc/c_12522"
    ],
    "closeExternalAuthority": [
        "http://data.bnf.fr/ark:/12148/cb11932499z",
        "http://d-nb.info/gnd/4139716-2",
        "http://data.bnf.fr/ark:/12148/cb131942840",
        "http://www.wikidata.org/entity/Q185698",
        "http://id.worldcat.org/fast/1018722",
        "http://www.yso.fi/onto/yso/p7509"
    ],
    "tokenLSCH": "sh85084414"
}