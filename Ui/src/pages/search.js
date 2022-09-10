import { Stack, Box, Container, Pagination, Typography } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { grey, blueGrey } from "@mui/material/colors";

import CardItem from "src/components/CardItem";
import Filters from "src/components/Filters";
import { api } from "src/services/solr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/Navbar/navbar_search";
import AdvancedSearch from "src/components/SearchBox/advanced_search";
import CountUp from "react-countup";

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
  const [numFound, setNumFound] = useState(1);

  const getData = (field, assunto, start) => {
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
          start: start,
          "q.op": "AND",
          wt: "json",
          facet: true,
          "json.facet": JSON.stringify(facet),
        },
      })
      .then((response) => {
        console.log("FT: ", response.data);
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

  const handlePagination = (e, p) => {
    if (p == 1) {
      setPage(0);
      getData(query.field, query.term, 0);
    } else {
      let c = p * 10 - 9;
      setPage(c);
      getData(query.field, query.term, c);
      console.log("P:", c);
    }

    //getData(query.field, query.term)
    console.log("P:", query.field, query.term);
  };

  useEffect(() => {
    if (!q) {
      return;
    }

    if (q == "all") {
      getData(query.field, query.term, page);
    } else {
      setQuery({ field: "general_search", term: q });

      getData("general_search", q, page);
    }
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
              setNumFound={setNumFound}
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
          <Box sx={{ display: 'flex', gap: "0.5rem"}}>
          <Typography variant="h6" gutterBottom>
              <CountUp separator="." end={numFound} duration={1} /> 
            </Typography>
            <Typography variant="h6" gutterBottom>
               item encontrados
            </Typography>

          </Box>
            
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
              <Pagination
                count={Math.ceil(numFound / 10)}
                color="primary"
                onChange={handlePagination}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
