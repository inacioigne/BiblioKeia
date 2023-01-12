import axios from "axios";
import fetch from "@rdfjs/fetch";
import cf from "clownface";
import namespace from "@rdfjs/namespace";

async function QueryNamesBK(token, setNameDetails, setImg) {
  const details = { token: token };

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

  let uri = `https://bibliokeia.com/authorities/names/${token}`;
  let rwo_uri = `http://id.loc.gov/rwo/agents/${token}`;

  let graph = `http://localhost:3030/authority?graph=${uri}`;
  let dataset = await fetch(graph).then((response) => response.dataset());

  let tbbt = cf({ dataset });
  let authority = tbbt.namedNode(uri);

  //  Label
  const name = authority.out(ns.madsrdf.authoritativeLabel).value;
  details["name"] = name;

  //fullerName

  let fullerName = authority.out(ns.madsrdf.fullerName);
  if (fullerName._context.length > 0) {
    let fullerNameLabel = fullerName.out(ns.rdfs.label).value;
    details["fullerName"] = fullerNameLabel;
  }

  //variant
  let hasVariant = authority.out(ns.madsrdf.hasVariant);
  if (hasVariant._context.length > 0) {
    let variants = hasVariant.map((variant) => {
      let label = variant.out(ns.madsrdf.variantLabel).value;
      return label;
    });
    details["variant"] = variants;
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

  // identifiesRWO

  let rwo = tbbt.namedNode(rwo_uri);

  // birth
  let birth = {};

  // birthDate

  let birthDate = rwo.out(ns.madsrdf.birthDate);
  birthDate.forEach((birthNode) => {
    let label = birthNode.out(ns.rdfs.label);
    if (label._context.length > 0) {
      birth["date"] = label.value.replace("(edtf) ", "");
      details["birth"] = birth;
    } else {
      let label = birthPlace.out(ns.madsrdf.authoritativeLabel).value;
      birth["date"] = label;
      details["birth"] = birth;
    }
  });

  let birthPlace = rwo.out(ns.madsrdf.birthPlace);
  birthPlace.forEach((birthNode) => {
    let label = birthNode.out(ns.rdfs.label);
    if (label._context.length > 0) {
      birth["place"] = label.value;
      details["birth"] = birth;
    } else {
      let label = birthPlace.out(ns.madsrdf.authoritativeLabel).value;
      birth["place"] = label;
      details["birth"] = birth;
    }
  });

  let death = {};
  let deathPlace = rwo.out(ns.madsrdf.deathPlace);
  if (deathPlace._context.length > 0) {
    let deathPlacelabel = birthPlace.out(ns.madsrdf.authoritativeLabel).value;
    death["place"] = deathPlacelabel;
    details["death"] = death;
  }
  let deathDate = rwo.out(ns.madsrdf.deathDate);
  if (deathDate._context.length > 0) {
    let date = deathDate.out(ns.rdfs.label).value;
    death["date"] = date.replace("(edtf) ", "");
    details["death"] = death;
  }

  setNameDetails(details);
}

export default QueryNamesBK;