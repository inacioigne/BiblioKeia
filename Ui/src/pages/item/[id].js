import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
// Material UI
import { Stack, Box, Container, Typography } from "@mui/material/";

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
      'http://localhost:3030/acervo', 'SELECT * WHERE{ GRAPH ?g {?s ?p ?name } } LIMIT 10');
    bindingsStream.on('data', (bindings) => console.log(bindings));
  } 
  

    
  
  
  
  useEffect(() => {
    getData()
   
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Navbar />
      <Container maxWidth="xl">
      <Image
            src={
              `http://localhost:8000/items/${id}/imagem`
            }
            width={150}
            height={200}
          />
      
      <p>Post: {id}</p>
      </Container>
    </Box>
  );
};

export default Item;
