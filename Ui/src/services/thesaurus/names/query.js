import SparqlClient from "sparql-http-client";

async function QueryNamesBK(name, setResponse) {
    setResponse([]);

    const client = new SparqlClient({
        endpointUrl: "http://localhost:3030/authority/sparql",
      });

    console.log("QBK", name)
}

export default QueryNamesBK;