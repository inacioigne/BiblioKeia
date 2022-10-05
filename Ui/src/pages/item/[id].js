import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
// Material UI
import { Stack, Box, Container, Typography } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

import Navbar from "src/components/Navbar/navbar_search";

// Next Components
import Image from "next/image";

import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = new SparqlEndpointFetcher();

  async function getData() {
    const bindingsStream = await fetcher.fetchBindings(
      "http://localhost:3030/bibframe",
      "SELECT * WHERE{ GRAPH ?g {?s ?p ?name } } LIMIT 10"
    );
    bindingsStream.on("data", (bindings) => console.log(bindings));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={2}
        sx={{
          mt: 2
        }}
        >
          <Grid xs={3} sx={{ 
            //backgroundColor: grey[100] 
            }}>
            <Image
              src={`http://localhost:8000/items/${id}/imagem`}
              width={350}
              height={400}
            />
          </Grid>
          <Typography variant="h4" gutterBottom>
            Título: subtitulo
          </Typography>
        </Grid>
        <p>Post: {id}</p>
      </Container>
    </Box>
  );
};

export default Item;
