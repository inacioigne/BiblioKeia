import { Stack, Box, Container, Pagination } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { grey, blueGrey } from "@mui/material/colors";

import CardItem from "src/components/CardItem";
import Filters from "src/components/Filters";
import { api } from "src/services/solr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar/navbar_search";
import AdvancedSearch from "src/components/SearchBox/advanced_search"

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState({ field: "*", term: "*" });

  const [items, setItems] = useState(null);
  const [facetSuject, setfacetSuject] = useState(null);
  const [facetAuthor, setfacetAuthor] = useState(null);
  const [facetYear, setfacetYear] = useState(null);
  const [facetType, setfacetType] = useState(null);
  const [page, setPage] = useState(0);

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
          start: page,
          "q.op": "AND",
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

  const handlePagination = (e, p) => {
    console.log('P:', e, p)
    setPage(p)
    getData(query.field, query.term)
  }

  useEffect(() => {
    if (!q) {
      return;
    }

    if (q == "all") {
      getData(query.field, query.term);
    } else {
      setQuery({ field: "general_search", term: q });

      getData("general_search", q);
    }
    setPage(1)
  }, [q]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Navbar />
      <Container maxWidth="xl">
      <AdvancedSearch getData={getData} />
        
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
                  id={item.id}
                  title={item.title}
                  responsibilities={item.responsibilities}
                  publisher={item.publisher}
                  subjects={item.subject}
                  chamada={item.call}
                  shelf={item.shelf}
                />
              ))}
            </Stack>
            {/* Pagination */}
            <Box my={2}>
            <Pagination count={10} color="primary" 
            onChange={handlePagination}
            />
            </Box>
           
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
