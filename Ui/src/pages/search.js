import { Stack, Box } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { grey, blueGrey } from "@mui/material/colors";

import CardItem from "src/components/CardItem";
import Filters from "src/components/Filters";
import { api } from "src/services/solr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState({field: "*", term: "*"});

  const [items, setItems] = useState(null);
  const [facetSuject, setfacetSuject] = useState(null);
  const [facetAuthor, setfacetAuthor] = useState(null);
  const [facetYear, setfacetYear] = useState(null);
  const [facetType, setfacetType] = useState(null);

  const getData = (field, assunto) => {
    
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

    api
      .get("select", {
        params: {
          q: `${field}:${assunto}`,
          "q.op": "AND",
          //fq:"subject:Pesquisa--Amazonas--Congressos",
          wt: "json",
          facet: true,
          "json.facet": JSON.stringify(facet),
        },
      })
      .then((response) => {
        console.log("FT: ", response.data);
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

  useEffect(() => {
    if (!q) {
      return;
    }

    if (q == "all") {
      getData(query.field, query.term);
    } else {
      setQuery({field:"general_search", term: q})

      getData(query.field, query.term)
    }
  }, [q]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={3} sx={{ backgroundColor: grey[100] }}>
          <Filters
          setItems={setItems}
            facetSuject={facetSuject}
            setfacetSuject={setfacetSuject}
            facetAuthor={facetAuthor}
            setfacetAuthor={setfacetAuthor}
            facetYear={facetYear}
            setfacetYear={setfacetYear}
            facetType={facetType}
            setfacetType={setfacetType}
            query={query}
          /> 
          {/* <code>{q}</code> */}
        </Grid>

        <Grid
          xs={9}
          sx={{
            backgroundColor: grey[200],
            p: 3,
          }}
        >
          <Stack spacing={2}>
            {items?.map((item) => (
              <CardItem
                key={item.id}
                title={item.title}
                responsibilities={item.responsibilities}
                publisher={item.publisher}
                subjects={item.subject}
                chamada={item.call}
                shelf={item.shelf}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
