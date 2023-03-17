import { apiSolr } from "src/services/solr/api";

const SearchAuthority = (name = "*", type = "*", setResponse) => {
    apiSolr
      .get("authorities/select", {
        params: {
          q: `general_search:${name}*`,
          fq: `type:${type}`,
          "q.op": "AND",
          wt: "json",
        },
      })
      .then((response) => {
        setResponse(response.data.response.docs);
      });
  };
  
  export default SearchAuthority;