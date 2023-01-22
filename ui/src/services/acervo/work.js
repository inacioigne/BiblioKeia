import axios from "axios";
import fetch from "@rdfjs/fetch";
import cf from "clownface";
import namespace from "@rdfjs/namespace";

async function QueryWork(id, setWork) {
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

  let uri = `https://bibliokeia.com/bibframe/work/bk-${id}`;
  let graph = `http://localhost:3030/acervo?graph=${uri}`;

  let dataset = await fetch(graph).then((response) => response.dataset());

  let tbbt = cf({ dataset });
  let work = tbbt.namedNode(uri);

  // Title
  const title = work.out(ns.bf.title).out(ns.bf.mainTitle).value;

  // Type
  const type = work.out(ns.rdf.type)._context[0].term.value
  const typeLabel = type.split("/")[5]
  

  // Type
  const contribution = work.out(ns.bf.contribution).out(ns.rdfs.label).value

  // Subject
  const subjects = work.out(ns.bf.subject).map((subject) => {
    return subject.term.value
  })
  console.log(subjects);


  const wk = {
    title: title, 
    typeUri: type,
    typeLabel: typeLabel,
    contribution: contribution,
    subjects: subjects
}

  setWork(wk)
  
}

export default QueryWork;
