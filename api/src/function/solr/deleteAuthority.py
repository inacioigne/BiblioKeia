from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()

solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

def DeleteAuthoritySolr(id): 

    r = solr.search(q=f'id:{id}', **{'fl': '*,[child]'})

    nMeta = ["id", "type", "creationDate", "authority", "affiliation", "occupation", "isMemberOfMADSCollection", "note", "variant",
              "imagem", "fullerName", "birthDate", "birthPlace","deathDate",  "_version_"]
    ids = [id]
    [doc] = r.docs
    for k, v in doc.items():
        if k not in nMeta:
            if type(v) == list:
                for i in v:
                    ids.append(i['id']) 
            else:
                ids.append(v['id'])
    responseSolr = solr.delete(id=ids, commit=True)

    return responseSolr

