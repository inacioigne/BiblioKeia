import { createContext, useContext, useState } from "react";
import { api } from "src/services/solr";

export const SearchContext = createContext({});

const facet = {
  subject: { 
    field: "subject_str",
  },
  author: {
    field: "author_str",
  },
  year: {
    field: "year",
  },
  type: {
    field: "type",
  },
};

export const SearchProvider = ({ children }) => {
  const [numFound, setNumFound] = useState(1);
  const [items, setItems] = useState(null);
  const [facetSuject, setfacetSuject] = useState(null);
  const [facetAuthor, setfacetAuthor] = useState(null);
  const [facetYear, setfacetYear] = useState(null);
  const [facetType, setfacetType] = useState(null);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState([])


  const getData = (field, term, page = 0, op = 'OR', filter = [] ) => {

    //console.log('PAGE:', page)
    const json_filter = {
      filter: filter,
    };


    api
      .get("select", {
        params: {
          q: `${field}:${term}`,
          start: page,
          "q.op": op,
          json: JSON.stringify(json_filter),
          facet: true,
          "json.facet": JSON.stringify(facet),
          wt: "json",
        },
      })
      .then((response) => {
        console.log("CTX: ", response.data);
        setNumFound(response.data.response.numFound);
        setItems(response.data.response.docs);
        setfacetSuject(response.data.facets.subject.buckets);
        setfacetAuthor(response.data.facets.author.buckets);
        setfacetYear(response.data.facets.year.buckets);
        setfacetType(response.data.facets.type.buckets);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <SearchContext.Provider
      value={{
        getData,
        numFound,
        setNumFound,
        items,
        facetSuject,
        facetAuthor,
        facetYear,
        facetType,
        filter, setFilter,
        page, setPage
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
