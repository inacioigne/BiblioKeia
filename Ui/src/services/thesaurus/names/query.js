import SparqlClient from "sparql-http-client";
import axios from "axios"; 
import fetch from "@rdfjs/fetch";
import cf from "clownface";
import namespace from "@rdfjs/namespace";


async function QueryNamesBK(token, setNameDetails) {

    const details = {};
    let uri = `https://bibliokeia.com/authorities/names/${token}`

    let graph = `http://localhost:3030/authority?graph=${uri}`
    const dataset = await fetch(graph).then((response) => response.dataset());

    const tbbt = cf({ dataset });
    const athority = tbbt.namedNode(uri);
    const ns = {
        rdf: namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#"),
        rdfs: namespace("http://www.w3.org/2000/01/rdf-schema#"),
        bf: namespace("http://id.loc.gov/ontologies/bibframe/"),
        bflc: namespace("http://id.loc.gov/ontologies/bflc/"),
        owl: namespace("http://www.w3.org/2002/07/owl#"),
        skos: namespace("http://www.w3.org/2004/02/skos/core#"),
        dcterms: namespace("http://purl.org/dc/terms/"),
        cc: namespace("http://creativecommons.org/ns#"),
        foaf: namespace("http://xmlns.com/foaf/0.1/"),
        madsrdf: namespace("http://www.loc.gov/mads/rdf/v1#"),
      };
    //  Label
    const name = athority.out(ns.madsrdf.authoritativeLabel).value;
    details["name"] = name;
    //SubjectDetails["thesarus"] = "BKSH";

    //fullerName
    let fullerName = athority.out(ns.madsrdf.fullerName);
    let label = fullerName.out(ns.rdfs.label).value
    details["fullerName"] = label;

    //variant
    let hasVariant = athority.out(ns.madsrdf.hasVariant)
    if (hasVariant._context.length > 0) {
        let variants = hasVariant.map((variant) => {
            let label = variant.out(ns.madsrdf.variantLabel).value
            return label
        })
        details["variant"] = variants;

    }



    console.log("QBK", details)
    setNameDetails(details)
}

export default QueryNamesBK;