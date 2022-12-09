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

async function ParserLCSH(token, setSubjectDetails, 
  ) {
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
  const uri =  `http://id.loc.gov/authorities/subjects/${token}`
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
  const hasVariant = subject.out(ns.madsrdf.hasVariant);
  const variants = hasVariant.map((variant) => {
    return variant.out(ns.madsrdf.variantLabel).value;
  });

  SubjectDetails["variant"] = variants;

  //NarrowerAuthority
  const hasNarrowerAuthority = subject.out(ns.madsrdf.hasNarrowerAuthority);

  const narrower = hasNarrowerAuthority.map((narrowerAuthorit) => {
    let label = narrowerAuthorit.out(ns.madsrdf.authoritativeLabel).value;
    let uri = narrowerAuthorit.value;

    return { label: label, uri: uri };
  });

  SubjectDetails["narrower"] = narrower;

  // reciprocalAuthority
  const hasReciprocalAuthority = subject.out(ns.madsrdf.hasReciprocalAuthority);
  
  if (hasReciprocalAuthority._context.length > 0) {

    let reciprocalAuthority = hasReciprocalAuthority.map((authority) => {
      let tokenRA = authority.value.split("/")[5]
      let ra = {
            label: authority.out(ns.madsrdf.authoritativeLabel).value,
            uri: authority.value,
            collection: "LCSH"
          };
      return ra

      //let graph = await GraphExist(tokenRA)
      // if (graph) {
        
      //   let ra = {
      //     label: authority.out(ns.madsrdf.authoritativeLabel).value,
      //     uri: `https://bibliokeia.com/authorities/subjects/${tokenRA}`,
      //     collection: "BKSH"
      //   };
      //   return ra
      // } else {
      //   let ra = {
      //     label: authority.out(ns.madsrdf.authoritativeLabel).value,
      //     uri: authority.value,
      //     collection: "LCSH"
      //   };
      //   return ra
      // }      
      
    });

    SubjectDetails["reciprocalAuthority"] = reciprocalAuthority

    
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

  // (async () => {
  //   SubjectDetails['tokenLSCH'] = token
  //   SubjectDetails["closeExternalAuthority"] = closeExternalAuthority
  //   const sub = await Promise.all(SubjectDetails);
    
  //   setSubjectDetails(sub);
  //   console.log('R', sub )
  // })();

  setSubjectDetails(SubjectDetails)


}

export default ParserLCSH;
