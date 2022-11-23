import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

export default async function queryThesaurusBK(data, setResponse) {
  setResponse([]);
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const query = `PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT *
    WHERE { GRAPH  ?G 
      {?s rdf:type madsrdf:Topic .
        ?s madsrdf:authoritativeLabel ?topic
        FILTER regex(?topic, "^${data}") 
       
         }
    }
    LIMIT 10`;

  const stream = await client.query.select(query);
  const dataset = rdf.dataset();
  await dataset.import(stream);
  for (const quad of dataset) {
    setResponse((prevState) => [...prevState, quad.topic.value]);
  }


}
