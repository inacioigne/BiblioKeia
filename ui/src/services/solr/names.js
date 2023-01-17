import axios from "axios";

function search() {
  const api = axios.create({
    baseURL: "http://localhost:8983/solr/authorities/",
  });

  return api;
}

export const getAthorities = search();

const searchAuthority = (name = "*", type = "*", setResponse) => {
  getAthorities
    .get("select", {
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

export default searchAuthority;