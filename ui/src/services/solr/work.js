import { apiSolr } from "src/services/solr/api";

export const SolrWorkByID = (id, setWork) => {
    apiSolr
      .get("acervo/select", {
        params: {
          q: `id:${id}*`,
          "fl":"*,[child]",
          "q.op": "AND",
          wt: "json",
        },
      })
      .then((response) => {
        let [details] = response.data.response.docs
        console.log("TESTE: ", details)
        setWork(details)
      });
  };