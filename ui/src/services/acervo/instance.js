import fetch from "@rdfjs/fetch";
import cf from "clownface";
import namespace from "@rdfjs/namespace";

async function ParserInstance(id, setInstance) {
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

  let uri = `https://bibliokeia.com/resources/instance/${id}`;
  let graph = `http://localhost:3030/acervo?graph=${uri}`;

  let dataset = await fetch(graph).then((response) => response.dataset());

  let tbbt = cf({ dataset });
  let resources = tbbt.namedNode(uri);

  // Title
  const title = resources.out(ns.bf.title).out(ns.bf.mainTitle).value;

  // Type
  const types = resources.out(ns.rdf.type);
  const type = types.filter((type) => {
    return type.value.split("/")[5] != "Instance";
  });
  let typeLabel = type.value.split("/")[5];

  //Extent
  let extent = resources.out(ns.bf.extent).out(ns.rdfs.label).value;

  // ProvisionActivity
  let provisionActivity = resources.out(ns.bf.provisionActivity);
  let editora = provisionActivity.out(ns.bf.agent).out(ns.rdfs.label).value;
  let date = provisionActivity.out(ns.bf.date).value;
  let place = provisionActivity.out(ns.bf.place).out(ns.rdfs.label).value;

  // Items
  let hasItem = resources.out(ns.bf.hasItem).values

  let instanceOf = resources.out(ns.bf.instanceOf).value
  let work = instanceOf.split("/")[5]



  async function GetItems(uri) {
    let graphItems = `http://localhost:3030/acervo?graph=${uri}`;

    let dataset = await fetch(graphItems).then((response) =>
      response.dataset()
    );
    let tbbt = cf({ dataset });
    let item = tbbt.namedNode(uri);
    let label = item.out(ns.bf.shelfMark).out(ns.rdfs.label).value;
    let sublocation = item.out(ns.bf.sublocation).out(ns.rdfs.label).value;
    let register = item.out(ns.bf.adminMetadata).out(ns.bf.identifiedBy).out(ns.rdf.value).value
    
    return { uri: uri, label: label, sublocation: sublocation, register: register };
  }

  const promises = hasItem.map((uri) => GetItems(uri));
  let items = await Promise.all(promises).then((response) => {
    return response;
  });


  const instance = {
    title: title,
    typeLabel: typeLabel,
    extent: extent,
    editora: editora,
    place: place,
    date: date,
    instanceOf: work,
    items: items
  };

  setInstance(instance);
}

export default ParserInstance;
