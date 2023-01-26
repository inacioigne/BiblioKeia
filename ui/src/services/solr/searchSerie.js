import { apiSolr } from "src/services/solr/api";

export const SolrSerie = (value = "", setResponse) => {
  apiSolr
    .get("acervo/select", {
      params: {
        q: `mainTitle:${value}*`,
        fq: `bfType:Series`,
        "q.op": "AND",
        wt: "json",
      },
    })
    .then((response) => {
      //console.log(response)
      setResponse(response.data.response.docs);
    });
};



export const SolrSerieByID = (id, setSerieDetails) => {
  apiSolr
    .get("acervo/select", {
      params: {
        q: `id:${id}*`,
        fq: `bfType:Series`,
        "q.op": "AND",
        wt: "json",
      },
    })
    .then((response) => {
      let [details] = response.data.response.docs
      setSerieDetails(details)
    });
};


