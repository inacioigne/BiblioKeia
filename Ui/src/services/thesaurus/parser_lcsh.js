import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";

async function ParserLCSH(token, setSubjectDetails, setUris) {
  const SubjectDetails = {};
  //const Uris = {};
  //const jsonld = `https://id.loc.gov/authorities/subjects/${token}.madsrdf_raw.jsonld`;
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
  const uri =  `http://id.loc.gov/authorities/subjects/${token}`
  const subject = tbbt.namedNode(uri);

  //  Label
  const label = subject.out(ns.madsrdf.authoritativeLabel).value;
  SubjectDetails["authority"] = label;

  // Note
  const note = subject.out(ns.madsrdf.note).value;
  if (note) {
    SubjectDetails["note"] = note;
  }

  //hasVariant
  const hasVariant = subject.out(ns.madsrdf.hasVariant);
  const variants = hasVariant.map((variant) => {
    return variant.out(ns.madsrdf.variantLabel).value;
  });

  SubjectDetails["variant"] = variants;

  const hasNarrowerAuthority = subject.out(ns.madsrdf.hasNarrowerAuthority);
  // const narrowerUris = hasNarrowerAuthority.map((narrowerAuthorit) => {
  //   return narrowerAuthorit.value;
  // });
  // Uris["narrowerUris"] = narrowerUris;

  const narrower = hasNarrowerAuthority.map((narrowerAuthorit) => {
    let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
    let uri = narrowerAuthorit.value;

    return { label: label, uri: uri };
  });

  SubjectDetails["narrower"] = narrower;

  // reciprocalAuthority

  const hasReciprocalAuthority = subject.out(ns.madsrdf.hasReciprocalAuthority);

  if (hasReciprocalAuthority._context.length > 0) {
    let reciprocalAuthority = {
      label: hasReciprocalAuthority.out(ns.madsrdf.authoritativeLabel).value,
      uri: hasReciprocalAuthority.value,
    };

    SubjectDetails["reciprocalAuthority"] = reciprocalAuthority;
  }

  // hasExactExternalAuthority
  const hasExactExternalAuthority = subject.out(ns.madsrdf.hasExactExternalAuthority);
  const exactExternalAuthority = hasExactExternalAuthority.map((authority) => {
    return authority.value
  });
  exactExternalAuthority.unshift(uri)
  SubjectDetails["exactExternalAuthority"] = exactExternalAuthority

  // CloseExternalAuthority
  const hasCloseExternalAuthority = subject.out(ns.madsrdf.hasCloseExternalAuthority);
  const closeExternalAuthority = hasCloseExternalAuthority.map((authority) => {
    return authority.value
  });

  SubjectDetails["closeExternalAuthority"] = closeExternalAuthority
  SubjectDetails['tokenLSCH'] = token


  setSubjectDetails(SubjectDetails);

  //console.log("P:", SubjectDetails)


}

export default ParserLCSH;
