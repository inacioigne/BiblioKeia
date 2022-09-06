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
  const [query, setQuery] = useState(q);

  const [items, setItems] = useState(null);
  const [facetSuject, setfacetSuject] = useState(null);
  const [facetAuthor, setfacetAuthor] = useState(null);
  const [facetYear, setfacetYear] = useState(null);
  const [facetType, setfacetType] = useState(null);

  const getData = (field, assunto) => {
    const data = {
      query: `${field}:${assunto}`,
      //query: `Ciencia`,
      facet: {
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
      },
      limit: 10,
    };

    api
      .post(`query`, data)
      .then((response) => {
        //console.log("FT: ", response.data.facets.subject.buckets);
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
      const field = "*";
      const assunto = "*";
      getData(field, assunto);
    } else {
      
      getData('general_search', q);

    }
    //const field = "*";
    
    setQuery(q);

  
  }, [q]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={3} sx={{ backgroundColor: grey[100] }}>
          <Filters
            facetSuject={facetSuject}
            facetAuthor={facetAuthor}
            facetYear={facetYear}
            facetType={facetType}
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
