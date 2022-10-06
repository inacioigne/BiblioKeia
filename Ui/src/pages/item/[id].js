import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
// Material UI
import {
  Stack,
  Box,
  Container,
  Typography,
  Divider,
  Button,
} from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { LocationCity, CalendarMonth, SouthAmerica } from "@mui/icons-material";

import Navbar from "src/components/Navbar/navbar_search";
import Details from "src/components/CardItem/details";

// Next Components
import Image from "next/image";

import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";
import { api } from "src/services/solr";

const styleText = {
  //fontFamily: "Alkalami"
  fontFamily: "Sarabun",
};

const lang = { por: "Português" };

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState(null);

  const getItem = () => {
    api
      .get("select", {
        params: {
          q: `id:${id}`,
          wt: "json",
        },
      })
      .then((response) => {
        let [doc] = response.data.response.docs;
        console.log("ITEM:", doc);
        setItem(doc);
      });
  };

  const fetcher = new SparqlEndpointFetcher();

  // async function getData() {
  //   const bindingsStream = await fetcher.fetchBindings(
  //     "http://localhost:3030/bibframe",
  //     "SELECT * WHERE{ GRAPH ?g {?s ?p ?name } } LIMIT 10"
  //   );
  //   bindingsStream.on("data", (bindings) => console.log(bindings));
  // }

  useEffect(() => {
    if (!id) {
      return;
    }

    getItem();
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Navbar />
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          sx={{
            mt: 2,
          }}
        >
          <Grid
            xs={2}
            sx={
              {
                //backgroundColor: grey[100]
              }
            }
          >
            <Image
              src={`http://localhost:8000/items/${id}/imagem`}
              width={250}
              height={350}
            />
          </Grid>
          {item && (
            <Grid xs={9}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  ...styleText,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  ...styleText,
                }}
              >
                {item.responsibilities}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Assuntos:
              </Typography>
              <Divider />
              <Stack mt={2} spacing={2} direction="row">
                {item.subject.map((subject, index) => (
                  <Button key={index} variant="outlined">
                    {subject}
                  </Button>
                ))}
              </Stack>
              <Typography mt={3} variant="subtitle2" gutterBottom>
                Publicação:
              </Typography>
              <Divider />
              <Stack mt={2} spacing={3} direction="row">
                {/* Local */}
                <Details
                  label={"Local"}
                  icon={<LocationCity />}
                  value={item.place}
                />
                {/* Editora */}
                <Details
                  label={"Editora"}
                  icon={<LocationCity />}
                  value={item.publisher}
                />
                {/* Ano */}
                <Details
                  label={"Ano de Publicação"}
                  icon={<CalendarMonth />}
                  value={item.year}
                />
              </Stack>
              {/* Série */}
              <Typography mt={3} variant="subtitle2" gutterBottom>
                Série:
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  ...styleText,
                }}
              >
                {item.serie}
              </Typography>
              {/* Série */}
              <Typography mt={3} variant="subtitle2" gutterBottom>
                Notas:
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  ...styleText,
                }}
              >
                {item.notes}
              </Typography>
              {/* Série */}
              <Typography mt={3} variant="subtitle2" gutterBottom>
                Detalhes:
              </Typography>
              <Divider />
              <Stack mt={2} spacing={3} direction="row">
                 {/* Idioma */}
                <Details
                  label={"Idioma"}
                  icon={<SouthAmerica />}
                  value={lang[item.language]}
                />
                {/* Localização */}
                <Details
                  label={"Localização"}
                  icon={<SouthAmerica />}
                  value={item.shelf}
                />
                {/* Classificação */}
                <Details
                  label={"Classificação"}
                  icon={<SouthAmerica />}
                  value={item.call}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Item;
