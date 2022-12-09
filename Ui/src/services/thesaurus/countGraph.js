import SparqlClient from "sparql-http-client";

export default async function CountGraph(data, setThesarusExist) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const query = `PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    SELECT (COUNT(*) AS ?count)
    WHERE { GRAPH  bk:${data}
          {?s ?p ?o . }
        }`;

  const stream = await client.query.select(query);
  //return stream
  stream.on("data", (row) => {
    if (row.count.value > 0) {
      console.log("+",data)
      setThesarusExist(data)
    } else {
      console.log("-",data)
      setThesarusExist(0)
    }
  });
}
