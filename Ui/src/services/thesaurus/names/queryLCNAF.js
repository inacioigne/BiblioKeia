import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";
import axios from "axios";

async function QueryLCNAF(uri, setLCNAFDetails, setImg) {
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

  let token = uri.split("/")[5];
  let rwo_uri = `http://id.loc.gov/rwo/agents/${token}`;
  const details = { token: token };

  //const jsonld = `${uri}.madsrdf_raw.jsonld`;
  let madsrdf = `${uri}.madsrdf.nt`;
  const dataset = await fetch(
    `http://id.loc.gov/authorities/names/${token}.madsrdf.rdf`
  ).then((response) => response.dataset());

  const tbbt = cf({ dataset });

  const authority = tbbt.namedNode(uri);
  //PersonalName
  let personalName = authority.out(ns.madsrdf.authoritativeLabel).value;
  details["name"] = personalName;

  //fullerName
  const fullerName = authority.out(ns.madsrdf.fullerName).map((name) => {
    const label = name.out(ns.rdfs.label).value;
    return label;
  });
  details["fullerName"] = fullerName;

  //variant
  let hasVariant = authority.out(ns.madsrdf.hasVariant);
  if (hasVariant._context.length > 0) {
    let variants = hasVariant.map((variant) => {
      let label = variant.out(ns.madsrdf.variantLabel).value;
      return label;
    });
    details["variant"] = variants;
  }

  //identifiesRWO
  let rwo = tbbt.namedNode(rwo_uri);

  // birth
  let birthPlace = rwo.out(ns.madsrdf.birthPlace);
  let birthPlacelabel = birthPlace.out(ns.madsrdf.authoritativeLabel).value;
  let birthDate = rwo.out(ns.madsrdf.birthDate).out(ns.rdfs.label).value;
  let birth = {
    place: birthPlacelabel,
    date: birthDate.replace("(edtf) ", ""),
  };
  details["birth"] = birth;

  // death
  let deathPlace = rwo.out(ns.madsrdf.deathPlace);

  if (deathPlace._context.length > 0) {
    let deathPlacelabel = birthPlace.out(ns.madsrdf.authoritativeLabel).value;
    let deathDate = rwo.out(ns.madsrdf.deathDate).out(ns.rdfs.label).value;
    let death = {
      place: deathPlacelabel,
      date: deathDate.replace("(edtf) ", ""),
    };
    details["death"] = death;
  }

  // Imagem
  let hasCloseExternalAuthority = authority.out(
    ns.madsrdf.hasCloseExternalAuthority
  );
  hasCloseExternalAuthority.forEach(async (authority) => {
    let base = authority.value.split(".")[1];
    if (base == "wikidata") {
      let id = authority.value.split("/")[4];
      let data = await axios
        .get(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)
        .then((response) => {
          return response.data.entities[`${id}`].claims.P18;
        })
        .then((files) => {
          let file = files[0];
          return file.mainsnak.datavalue.value;
        });
      let img = `http://commons.wikimedia.org/wiki/Special:FilePath/${data}`;
      setImg(img);
    }
  });

  //   //associatedLocale
  //   const associatedLocales = RWO.out(ns.madsrdf.associatedLocale).map(
  //     (associatedLocale) => {
  //       let label = associatedLocale.out(ns.rdfs.label).value;
  //       return label.split(") ")[1];
  //     }
  //   );
  //   AuthorityDetails['associatedLocales'] = associatedLocales
  //   //Variants
  //   const variants = authority.out(ns.madsrdf.hasVariant).map((variant) => {
  //     let label = variant.out(ns.madsrdf.variantLabel);
  //     return label.value;
  //   });
  //   AuthorityDetails['variants'] = variants

  //   //Field of Activity
  //   const fieldOfActivity = RWO.out(ns.madsrdf.fieldOfActivity).map(
  //     (activity) => {
  //       let label = activity.out(ns.rdfs.label).value;
  //       return label.split(")")[1];
  //     }
  //   );
  //   AuthorityDetails['fieldOfActivity'] = fieldOfActivity

  //   //Occupation
  //   const occupations = RWO.out(ns.madsrdf.occupation).map((occupation) => {
  //     let label = occupation.out(ns.rdfs.label).value;
  //     return label.split(")")[1];
  //   });
  //   AuthorityDetails['occupations'] = occupations

  setLCNAFDetails(details);
}

export default QueryLCNAF;
