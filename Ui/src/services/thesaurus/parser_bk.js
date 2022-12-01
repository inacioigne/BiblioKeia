import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";

async function ParserBK(uri, setSubjectBK) {
    const SubjectDetails = {};

  let graph = `http://localhost:3030/thesaurus?graph=${uri}`;
  const dataset = await fetch(graph).then((response) => response.dataset());

  const tbbt = cf({ dataset });
  const subject = tbbt.namedNode(uri);
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
  const label = subject.out(ns.madsrdf.authoritativeLabel).value;
  SubjectDetails["authority"] = label;

  //hasVariant
  const hasVariant = subject.out(ns.madsrdf.hasVariant);
  const variants = hasVariant.map((variant) => {
    return variant.out(ns.madsrdf.variantLabel).value;
  });
  SubjectDetails["variant"] = variants;

  setSubjectBK(SubjectDetails)

  console.log("P:", variants);
}

export default ParserBK;
