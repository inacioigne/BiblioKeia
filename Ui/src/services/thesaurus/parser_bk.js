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
  SubjectDetails["thesarus"] = "BKSH";

  //hasVariant
  const hasVariant = subject.out(ns.madsrdf.hasVariant);
  
  if (hasVariant._context.length > 0) {
    const variants = hasVariant.map((variant) => {
      let type = variant.out(ns.rdf.type).values[0].split("#")[1]
      let label = variant.out(ns.madsrdf.variantLabel).value
      
      return {label: label, type: type}

    });
    SubjectDetails["variant"] = variants; 
  }


  // hasReciprocalAuthority
  const hasReciprocalAuthority = subject.out(ns.madsrdf.hasReciprocalAuthority);
  if (hasReciprocalAuthority._context.length > 0) {
    let reciprocalAuthority = hasReciprocalAuthority.map((authority) => {
      let uri = authority.out(ns.madsrdf.isMemberOfMADSCollection).value;
      let ra = {
        label: authority.out(ns.madsrdf.authoritativeLabel).value,
        collection: uri.split("_")[1],
        uri: authority.value,
      };
      return ra;
    });
    SubjectDetails["reciprocalAuthority"] = reciprocalAuthority;
  } else {
    SubjectDetails["reciprocalAuthority"] = false;
  }

  // hasBroaderAuthority
  const hasBroaderAuthority = subject.out(ns.madsrdf.hasBroaderAuthority);

  const broader = hasBroaderAuthority.map((broaderAuthority) => {
    let label = broaderAuthority.out(ns.madsrdf.authoritativeLabel).value;
    let uri = broaderAuthority.value;
    let collection = broaderAuthority.out(
      ns.madsrdf.isMemberOfMADSCollection
    ).value;
    return { label: label, uri: uri, collection: collection.split("_")[1] };
  });

  SubjectDetails["broader"] = broader;

  //NarrowerAuthority
  const hasNarrowerAuthority = subject.out(ns.madsrdf.hasNarrowerAuthority);
  if (hasNarrowerAuthority._context.length > 0) {
    const narrower = hasNarrowerAuthority.map((narrowerAuthorit) => {
      let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
      let uri = narrowerAuthorit.out(ns.madsrdf.isMemberOfMADSCollection).value;
      return {
        label: label,
        uri: narrowerAuthorit.value,
        collection: uri.split("_")[1],
      };
    });
    SubjectDetails["narrower"] = narrower;
  }
  
  const narrower = hasNarrowerAuthority.map((narrowerAuthorit) => {
    let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
    let uri = narrowerAuthorit.out(ns.madsrdf.isMemberOfMADSCollection).value;
    return {
      label: label,
      uri: narrowerAuthorit.value,
      collection: uri.split("_")[1],
    };
  });
  SubjectDetails["narrower"] = narrower;

  setSubjectBK(SubjectDetails);
}

export default ParserBK;
