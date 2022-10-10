// Next Components
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// React Hooks
import { createContext, useEffect, useState } from "react";

// Material UI
import {
  Stack,
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Drawer,
} from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import {
  LocationCity,
  CalendarMonth,
  SouthAmerica,
  AutoStories,
  EmojiTransportation,
  LibraryBooks
} from "@mui/icons-material";

// Bibliokeia Components
import Navbar from "src/components/Navbar/navbar_search";
import Details from "src/components/CardItem/details";
import Carousel from "src/components/ObrasSimilares";
import Notes from "src/components/metadata/notes";
import Serie from "src/components/metadata/serie";
import Footer from "src/components/Footer";

// Sparql
//import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";
import { api } from "src/services/solr";

// Style
const styleText = {
  //fontFamily: "Alkalami"
  fontFamily: "Sarabun",
};

// Object Language
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

        setItem(doc);
      });
  };

  //const fetcher = new SparqlEndpointFetcher();

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

  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Navbar mode={"dark"} />
      <Container maxWidth="md" sx={{ height: '90vh'}}>
        <Grid
          container
          spacing={4}
          sx={{
            mt: 2,
          }}
        >
          <Grid
            xs={3}
            sx={
              {
                //backgroundColor: grey[100]
              }
            }
          >
            <Box sx={{ boxShadow: 10 }}>
              <Image
                src={`http://localhost:8000/items/${id}/imagem`}
                width={250}
                height={350}
              />
            </Box>
            <Button sx={{ mt: 3 }} variant="text" onClick={toggleDrawer(open)}>
              Obras similares
            </Button>
            <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer(open)}>
              <Carousel setOpen={setOpen} subjects={item?.subject.toString()} />
            </Drawer>
          </Grid>

          <Grid xs={9}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                ...styleText,
                fontWeight: "bold",
              }}
            >
              {item?.title}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                ...styleText,
              }}
            >
              {item?.responsibilities}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Assuntos:
            </Typography>
            <Divider />
            <Stack mt={2} spacing={2} direction="row">
              {item?.subject.map((subject, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => {
                    router.push(`/search?q=subject:${subject}`);
                  }}
                >
                  {subject}
                </Button>
              ))}
            </Stack>
            <Typography mt={3} variant="subtitle2" gutterBottom>
              Autoria principal:
            </Typography>
            <Divider />
            <Button
              onClick={() => {
                router.push(`/search?q=author:${item.author}&op=OR`);
              }}
              sx={{ textTransform: "none" }}
            >
              {item?.author}
            </Button>
            <Typography mt={3} variant="subtitle2" gutterBottom>
              Publicação:
            </Typography>
            <Divider />
            <Stack mt={2} spacing={3} direction="row">
              {/* Local */}
              <Details
                label={"Local"}
                icon={<EmojiTransportation />}
                value={item?.place}
              />
              {/* Editora */}
              <Details
                label={"Editora"}
                icon={<LocationCity />}
                value={item?.publisher}
              />
              {/* Ano */}
              <Details
                label={"Ano de Publicação"}
                icon={<CalendarMonth />}
                value={item?.year}
              />
            </Stack>
            {/* Série */}
            <Serie
              serie={item?.serie}
              numSerie={item?.numSerie}
              styleText={styleText}
            />

            {/* Notas */}
            <Notes notes={item?.notes} styleText={styleText} />

            {/* Detalhes */}
            <Typography mt={3} variant="subtitle2" gutterBottom>
              Detalhes:
            </Typography>
            <Divider />
            <Stack mt={2} spacing={5} direction="row">
              {/* Paginas */}
              <Details
                label={"Páginas"}
                icon={<AutoStories />}
                value={item?.pages}
              />

              {/* Idioma */}
              <Details
                label={"Idioma"}
                icon={<SouthAmerica />}
                value={lang[item?.language]}
              />
              {/* Localização */}
              <Details
                label={"Localização"}
                icon={<LibraryBooks />}
                value={item?.shelf}
              />
              {/* Classificação */}
              <Details
                label={"Classificação"}
                icon={<SouthAmerica />}
                value={item?.call}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Item;
