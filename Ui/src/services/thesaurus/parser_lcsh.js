import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";

async function ParserLCSH(token, setSubjectDetails, setUris) {
  // const rdf = 'http://id.loc.gov/authorities/subjects/sh85084414.rdf'
  // const dataset = await fetch(rdf).then((response) => response.dataset());
  // console.log("ParserLCSH", dataset);

  const SubjectDetails = {};
  const Uris = {}
  const jsonld = `https://id.loc.gov/authorities/subjects/${token}.madsrdf_raw.jsonld`;
  const rdf = `http://id.loc.gov/authorities/subjects/${token}.rdf`;
  const dataset = await fetch(rdf).then((response) => response.dataset());

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

  const tbbt = cf({ dataset });
  const subject = tbbt.namedNode(
    `http://id.loc.gov/authorities/subjects/${token}`
  );

  //   //Label
  const label = subject.out(ns.madsrdf.authoritativeLabel).value;
  SubjectDetails["authority"] = label;

  //hasVariant
  const hasVariant = subject.out(ns.madsrdf.hasVariant);
  if (hasVariant._context.length > 0) {
    SubjectDetails["variant"] = hasVariant.out(ns.madsrdf.variantLabel).value;
  }

  const hasNarrowerAuthority = subject.out(ns.madsrdf.hasNarrowerAuthority);
  const narrowerUris = hasNarrowerAuthority.map((narrowerAuthorit) => {
    return narrowerAuthorit.value
  })
  Uris['narrowerUris'] = narrowerUris
  const narrowerLabels = hasNarrowerAuthority.map((narrowerAuthorit) => {
    console.log("ParserLCSH", narrowerAuthorit.value)
    let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
    return label;
  });
  SubjectDetails["narrowerAuthority"] = narrowerLabels;

  //hasReciprocalAuthority
  const hasReciprocalAuthority = subject.out(ns.madsrdf.hasReciprocalAuthority);
  if (hasReciprocalAuthority._context.length > 0) {
    Uris["reciprocalAuthority"] = hasReciprocalAuthority.value
    SubjectDetails["reciprocalAuthority"] = hasReciprocalAuthority.out(ns.madsrdf.authoritativeLabel).value;
  }

  //console.log("ParserLCSH", hasReciprocalAuthority.out(ns.madsrdf.authoritativeLabel));
  //console.log("ParserLCSH", SubjectDetails)
  setSubjectDetails(SubjectDetails);
  setUris(Uris)

}

export default ParserLCSH;
