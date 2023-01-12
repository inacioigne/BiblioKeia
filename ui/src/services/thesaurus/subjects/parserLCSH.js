import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";
import SparqlClient from "sparql-http-client";

async function GraphExist(token) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const ask_query = `PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
  ASK WHERE { GRAPH bk:${token} { ?s ?p ?o } }`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

async function ParserLCSH(token, setSubjectDetails) {
  const SubjectDetails = {};
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
  const uri = `http://id.loc.gov/authorities/subjects/${token}`;
  const subject = tbbt.namedNode(uri);

  //  Label
  const label = subject.out(ns.madsrdf.authoritativeLabel).value;
  SubjectDetails["authority"] = label;
  SubjectDetails["thesarus"] = "LCSH";

  // Note
  const note = subject.out(ns.madsrdf.note).value;
  if (note) {
    SubjectDetails["note"] = note;
  }

  //hasVariant
  // const hasVariant = subject.out(ns.madsrdf.hasVariant);

  // const variants = hasVariant.map((variant) => {
  //   let type = variant.out(ns.rdf.type).values[0].split("#")[1]
  //   let label = variant.out(ns.madsrdf.variantLabel).value

  //   return {label: label, type: type}
  // });
  // //

  // SubjectDetails["variant"] = variants;

  //hasVariant
  const hasVariant = subject.out(ns.madsrdf.hasVariant);

  if (hasVariant._context.length > 0) {
    const variants = hasVariant.map((variant) => {
      let type = variant.out(ns.rdf.type).values[0].split("#")[1];
      let label = variant.out(ns.madsrdf.variantLabel).value;

      return { label: label, type: type };
    });
    SubjectDetails["variant"] = variants;
  }

  // hasBroaderAuthority
  const hasBroaderAuthority = subject.out(ns.madsrdf.hasBroaderAuthority);
  const broader = hasBroaderAuthority.map((broaderAuthority) => {
    let label = broaderAuthority.out(ns.madsrdf.authoritativeLabel).value;
    let uri = broaderAuthority.value;
    return { label: label, uri: uri };
  });

  SubjectDetails["broader"] = broader;

  //NarrowerAuthority
  const hasNarrowerAuthority = subject.out(ns.madsrdf.hasNarrowerAuthority);

  if (hasNarrowerAuthority._context.length > 0) {
    const narrower = hasNarrowerAuthority.map((narrowerAuthorit) => {
      let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
      //let uri = narrowerAuthorit.out(ns.madsrdf.isMemberOfMADSCollection).value;
      return {
        label: label,
        uri: narrowerAuthorit.value,
        //collection: uri.split("_")[1],
      };
    });
    SubjectDetails["narrower"] = narrower;
  } else {
    SubjectDetails["narrower"] = false;
  }

  // reciprocalAuthority
  const hasReciprocalAuthority = subject.out(ns.madsrdf.hasReciprocalAuthority);

  if (hasReciprocalAuthority._context.length > 0) {
    let reciprocalAuthority = hasReciprocalAuthority.map((authority) => {
      let tokenRA = authority.value.split("/")[5];
      let ra = {
        label: authority.out(ns.madsrdf.authoritativeLabel).value,
        uri: authority.value,
        //collection: "LCSH",
      };
      return ra;
    });

    SubjectDetails["reciprocalAuthority"] = reciprocalAuthority;
  }

  // hasExactExternalAuthority
  const hasExactExternalAuthority = subject.out(
    ns.madsrdf.hasExactExternalAuthority
  );
  const exactExternalAuthority = hasExactExternalAuthority.map((authority) => {
    return authority.value;
  });
  exactExternalAuthority.unshift(uri);
  SubjectDetails["exactExternalAuthority"] = exactExternalAuthority;

  // CloseExternalAuthority
  const hasCloseExternalAuthority = subject.out(
    ns.madsrdf.hasCloseExternalAuthority
  );
  const closeExternalAuthority = hasCloseExternalAuthority.map((authority) => {
    return authority.value;
  });

  SubjectDetails["closeExternalAuthority"] = closeExternalAuthority;
  SubjectDetails["tokenLSCH"] = token;

  setSubjectDetails(SubjectDetails);
}

export default ParserLCSH;
