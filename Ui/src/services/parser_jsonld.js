import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";

async function ParserJsonLd(token, setAuthorityDetails) {
  //console.log(token);
  const AuthorityDetails = {}
  const jsonld = `https://id.loc.gov/authorities/names/${token}.madsrdf_raw.jsonld`;
  const dataset = await fetch(jsonld).then((response) => response.dataset());

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

  const authority = tbbt.namedNode(
    `http://id.loc.gov/authorities/names/${token}`
  );
  //PersonalName
  const [personalName] = authority.out(ns.madsrdf.authoritativeLabel).values;
  //fullerName
  const [fullerName] = authority.out(ns.madsrdf.fullerName).map((name) => {
    const label = name.out(ns.rdfs.label).values;
    return label;
  });
  AuthorityDetails['personalName'] = personalName

  //identifiesRWO
  const identifiesRWO = authority.out(ns.madsrdf.identifiesRWO).value;
  const RWO = cf({ dataset }).namedNode(identifiesRWO);

  //birthDate
  const birthD = RWO.out(ns.madsrdf.birthDate).out(ns.rdfs.label).value;
  if (birthD) {
    let birthDate = birthD.split(") ")[1];
    AuthorityDetails['birthDate'] = birthDate
  } else {
    AuthorityDetails['birthDate'] = false
  }
  
  //birthPlace
  const birthP = RWO.out(ns.madsrdf.birthPlace).out(ns.rdfs.label).value;
  if (birthP) {
    let birthPlace = birthP.split(") ")[1];
    AuthorityDetails['birthPlace'] = birthPlace
  } else {
    //let birthPlace = false;
    AuthorityDetails['birthPlace'] = false
  }

  //Death Date
  const deathD = RWO.out(ns.madsrdf.deathDate).out(ns.rdfs.label).value;
  if (deathD) {
    let deathDate = deathD.split(") ")[1];
    AuthorityDetails['deathDate'] = deathDate
  } else {
    AuthorityDetails['deathDate'] = false
  }
  //Death Place
  const deathP = RWO.out(ns.madsrdf.deathPlace).out(ns.rdfs.label).value;
  if (deathP) {
    let deathPlace = deathP.split(") ")[1];
    AuthorityDetails['deathPlace'] = deathPlace
  } else {
    AuthorityDetails['deathPlace'] = false
  }

  //associatedLocale
  const associatedLocales = RWO.out(ns.madsrdf.associatedLocale).map(
    (associatedLocale) => {
      let label = associatedLocale.out(ns.rdfs.label).value;
      return label.split(") ")[1];
    }
  );
  AuthorityDetails['associatedLocales'] = associatedLocales
  //Variants
  const variants = authority.out(ns.madsrdf.hasVariant).map((variant) => {
    let label = variant.out(ns.madsrdf.variantLabel);
    return label.value;
  });
  AuthorityDetails['variants'] = variants


  //Field of Activity
  const fieldOfActivity = RWO.out(ns.madsrdf.fieldOfActivity).map(
    (activity) => {
      let label = activity.out(ns.rdfs.label).value;
      return label.split(")")[1];
    }
  );
  AuthorityDetails['fieldOfActivity'] = fieldOfActivity

  //Occupation
  const occupations = RWO.out(ns.madsrdf.occupation).map((occupation) => {
    let label = occupation.out(ns.rdfs.label).value;
    return label.split(")")[1];
  });
  AuthorityDetails['occupations'] = occupations
  console.log(AuthorityDetails)
  setAuthorityDetails(AuthorityDetails)

  // setAuthorityDetails({
  //   personalName: personalName,
  //   fullerName: fullerName,
  //   birthDate: birthDate.split(")")[1],
  //   birthPlace: birthPlace,
  //   deathDate: deathDate,
  //   deathPlace: deathPlace.split(") ")[1],
  //   associatedLocales: associatedLocales,
  //   variants: variants,
  //   fieldOfActivity: fieldOfActivity,
  //   occupations: occupations,
  // });

}

export default ParserJsonLd;
