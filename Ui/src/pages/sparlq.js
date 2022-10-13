import { api } from "src/services/lcnfa";
import { Button } from "@mui/material/";
//const ContextParser = require('jsonld-context-parser').ContextParser;
//import {RdfObjectLoader} from "rdf-object";
const jsonld = require('@m-ld/jsonld');
//const jsonld = require('jsonld');


export default function Sparql() {

    const doc = {
        "http://schema.org/name": "Manu Sporny",
        "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
        "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
      };
    
      const context = {
        "name": "http://schema.org/name",
        "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
        "image": {"@id": "http://schema.org/image", "@type": "@id"}
      };


    

    

    async function getData() {
       // compact a document according to a particular context
    const compacted = await jsonld.compact(doc, context);
    console.log(JSON.stringify(compacted, null, 2));
 
  }

    const token = 'no97027235'
    const nt = 'no97027235.nt'
    const jsonld = 'no97027235.madsrdf_raw.jsonld'

    const getDetails = (jsonld) => {
        api
          .get(`${jsonld}`)
          .then((response) => {
            console.log("getDetails: ", response);
            
          })
          .catch(function (error) {
            console.log("ERROOO!!", error);
          });
      };

    

    return (
        <Button variant="outlined" onClick={() => {
            //getDetails(token)
            getData()
        }}>Sparql</Button>
    )
}