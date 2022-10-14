import { api } from "src/services/lcnfa";
import { Button, Box } from "@mui/material/";
import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";

export default function Sparql() {
  async function getData() {
    const jsonld =
      "https://id.loc.gov/authorities/names/no97027235.madsrdf_raw.jsonld";
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
      "http://id.loc.gov/authorities/names/no97027235"
    );
    //PersonalName
    const [PersonalName] = authority.out(ns.madsrdf.authoritativeLabel).values;
    //fullerName
    const [fullerName] = authority.out(ns.madsrdf.fullerName).map((name) => {
      const label = name.out(ns.rdfs.label).values;
      return label;
    });

    //identifiesRWO
    const identifiesRWO = authority.out(ns.madsrdf.identifiesRWO).value;
    const RWO = cf({ dataset }).namedNode(identifiesRWO);

    //birthDate
    const birthDate = RWO.out(ns.madsrdf.birthDate).out(ns.rdfs.label).value;

    //Death Date
    const deathDate = RWO.out(ns.madsrdf.deathDate).out(ns.rdfs.label).value;

    //associatedLocale
    const associatedLocales = RWO.out(ns.madsrdf.associatedLocale).map(
      (associatedLocale) => {
        let label = associatedLocale.out(ns.rdfs.label).value;
        return label;
      }
    );

    //Field of Activity
    const fieldOfActivity = RWO.out(ns.madsrdf.fieldOfActivity).map(
      (activity) => {
        let label = activity.out(ns.rdfs.label).value;
        return label;
      }
    );

    //Occupation
    const occupations = RWO.out(ns.madsrdf.occupation).map((occupation) => {
      let label = occupation.out(ns.rdfs.label).value;
      return label;
    });

    console.log("P:", occupations);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
      <Button
        variant="outlined"
        onClick={() => {
          getData();
          //Test()
        }}
      >
        Sparql
      </Button>
    </Box>
  );
}
