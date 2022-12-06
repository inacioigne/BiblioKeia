import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

export default async function queryThesaurusBK(data, setResponse) {
  setResponse([]);
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const query = `PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT ?uri ?topic
    WHERE { GRAPH  ?G 
      {?uri rdf:type madsrdf:Topic .
        ?uri madsrdf:authoritativeLabel ?topic
        FILTER regex(?topic, "^${data}", "i")        
         }
    }
    LIMIT 10`;

  const stream = await client.query.select(query);
  stream.on('data', row => {
   
    setResponse((prevState) => [
          ...prevState,
          { value: row.topic.value, 
            uri: row.uri.value },
        ]);
  
  })
 
  // const dataset = rdf.dataset();
  // await dataset.import(stream);
  
  // for (const quad of dataset) {
     
  //   setResponse((prevState) => [
  //     ...prevState,
  //     { value: quad.topic.value, uri: quad.s.value },
  //   ]);
  // }

  // stream.on('data', row => {
  //   Object.entries(row).forEach(([key, value]) => {
  //     console.log("on", value)
  //   })
  // })
}
