// Material UI
import { Stack, Box, Container, Typography } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors";

// React Hooks
import { useEffect, useState } from "react";

// Next Components
import { useRouter } from "next/router";

// Libs
import CountUp from "react-countup";


// BiblioKeia Compenents
import CardItem from "src/components/CardItem";
import Filters from "src/components/Filters";
import Navbar from "src/components/Navbar/navbar_search";
import AdvancedSearch from "src/components/Search/advanced_search";
import NavPages  from "src/components/Search/navPages"

// BiblioKeia Hooks
import { useSearch } from "src/providers/search"


export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState({ field: "*", term: "*" });

  //const [items, setItems] = useState(null);
  const [facetSuject, setfacetSuject] = useState(null);
  const [facetAuthor, setfacetAuthor] = useState(null);
  const [facetYear, setfacetYear] = useState(null);
  const [facetType, setfacetType] = useState(null);

  const { getData, numFound, setNumFound, items, setItems, filter, page } = useSearch()


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
              page={page}
            />
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
     
            <NavPages query={query} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
