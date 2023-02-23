import fetch from "@rdfjs/fetch";
import cf from "clownface";
import namespace from "@rdfjs/namespace";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

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

  let uri = `https://bibliokeia.com/resources/work/${id}`;
  let graph = `http://localhost:3030/acervo?graph=${uri}`;

  let dataset = await fetch(graph).then((response) => response.dataset());

  let tbbt = cf({ dataset });
  let work = tbbt.namedNode(uri);

  // Title
  const title = work.out(ns.bf.title).out(ns.bf.mainTitle).value;

  // Type
  const types = work.out(ns.rdf.type);

  const type = types.filter((type) => {
    return type.value.split("/")[5] != "Work";
  });
  let typeLabel = type.value.split("/")[5];

  // Contribution
  let contribution = work.out(ns.bf.contribution).out(ns.rdfs.label).value;
  let contributionRoleUri = work.out(ns.bf.contribution).out(ns.bf.agent).value;
  let contributionID = contributionRoleUri.split("/")[5];

  // Subject
  const urisSubjects = work.out(ns.bf.subject).map((subject) => {
    return subject.term.value;
  });

  // Instance
  const hasInstance = work.out(ns.bf.hasInstance).value;
  let instanceID = hasInstance.split("/")[5];
  if (hasInstance) {
    let instanceID = hasInstance.split("/")[5];

  } else {
    console.log("Sem instanceia", hasInstance)
    let instanceID = null
  }
  
  //let instanceID = hasInstance.split("/")[5];

  // Subject
  async function Subject(uri) {
    let graphSubjects = `http://localhost:3030/authorities?graph=${uri}`;
    let dataset = await fetch(graphSubjects).then((response) =>
      response.dataset()
    );
    let tbbt = cf({ dataset });
    let subject = tbbt.namedNode(uri);
    let label = subject.out(ns.madsrdf.authoritativeLabel).value;
    return { uri: uri, label: label };
  }

  const promises = urisSubjects.map((uri) => Subject(uri));
  let response = await Promise.all(promises).then((response) => {
    return response;
  });

  // CDD
  const cdd = work
    .out(ns.bf.classification)
    .out(ns.bf.classificationPortion).value;
  const cutter = work.out(ns.bf.classification).out(ns.bf.itemPortion).value;
 

  const wk = {
    title: title,
    typeLabel: typeLabel,
    contribution: contribution,
    serie: null,
    hasInstance: hasInstance,
    instanceID: instanceID,
    contentType: typeLabel,
    mainTitle: title,
    subtitle: "",
    contributionAgent: contribution,
    contributionRole: "Autor",
    contributionRoleUri: contributionRoleUri,
    contributionID: contributionID,
    subjects: response,
    language: "",
    languageCode: "",
    cdd: cdd,
    cutter: cutter,
    serie: "",
    serieURI: "",
  };

  // Serie
  async function GetSerie(uri) {
    let graph = `http://localhost:3030/acervo?graph=${uri}`;
    dataset = await fetch(graph).then((response) => response.dataset());
    let tbbt = cf({ dataset });
    let serie = tbbt.namedNode(uri);
    let title = serie.out(ns.bf.title).out(ns.bf.mainTitle).value;

    return { title: title, uri: uri };
  }
  const hasSeries = work.out(ns.bf.hasSeries);

  if (hasSeries._context.length > 0) {
    let [serie] = await Promise.all([GetSerie(hasSeries.value)]).then(
      (response) => {
        return response;
      }
    );
    wk["serie"] = serie.title;
    wk["serieURI"] = serie.uri;
  }

  setWork(wk);
  return wk
}

export default QueryWork;
