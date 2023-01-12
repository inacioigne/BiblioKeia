import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

export default async function GetType(data, setContentTypes) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/contentTypes/sparql",
    });
    const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
      SELECT ?object
      WHERE {
        ?subject madsrdf:authoritativeLabel ?object
        FILTER regex(?object, "^${data}") 
      }
      LIMIT 10`;

    const stream = await client.query.select(query);

    const dataset = rdf.dataset();
    await dataset.import(stream);
    let r = [];
    for (const quad of dataset) {
      r.push(quad.object.value);
    }
    if (r.length != 0) {
      setContentTypes(r);
    } else {
      setContentTypes(null);
    }
  }