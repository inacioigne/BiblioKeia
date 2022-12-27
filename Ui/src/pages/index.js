// Material UI
import { Paper, Box, Container } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

// Next Components
import Image from "next/image";

// BiblioKeia Compenents
import Navbar from "../components/Navbar";
import SearchBox from "src/components/Search";
import Counters from "../components/Counters";
import Footer from "../components/Footer";

// BiblioKeia Hooks
//import { useSearch } from "src/providers/search"
// BiblioKeia Hooks
import { useAlertBK } from "src/providers/alerts";

import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

const RootStyled = styled("div")(({ theme }) => ({
  //padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    width: 300,
  },
  [theme.breakpoints.up("md")]: {
    //backgroundColor: blue[500],
    width: 400,
  },
  [theme.breakpoints.up("lg")]: {
    //backgroundColor: green[500],
    width: 800,
    //border: "solid"
  },
}));

export default function Home() {
  const {openSnack, setOpenSnack} = useAlertBK()
  //console.log("A", openSnack)
  return (
    <>
      {/* Imagem */}
      <Box
        sx={{
          minHeight: "70vh",
          width: "100%",
          //ml: 0,
          position: "absolute",
          top: 0,
        }}
      >
        <Image src={"/images/library.jpg"} layout="fill" objectFit="cover" />
      </Box>
      {/* NAVBAR */}
      <Navbar />
      <Container
        maxWidth={"xl"}
        sx={{
          //border: "solid",
          position: "relative",
        }}
      >
        {/* SEARCHBOX */}
        <Box mt={"30vh"}>
          <SearchBox />
        </Box>

        {/** CONTENT */}
        <Box mt={"20vh"}>
          <Paper elevation={3}>
            {/* <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "space-between",
                mx: "3rem",
                my: "2rem",
                p: "3rem",
              }}
            > */}
            <Grid container spacing={2}>
              <Grid xs={12} sm={6} md={4} 
              sx={{ display: 'flex', justifyContent: 'center'}}
              >
                <Counters
                  counter={30000}
                  title={"Livros"}
                  description={"Obras de referência em questões amazonicas"}
                />
              </Grid>
              <Grid xs={12} sm={6} md={4}
              sx={{ display: 'flex', justifyContent: 'center'}}
              >
                <Counters
                  counter={3000}
                  title={"Teses & Dissertações"}
                  description={
                    "Teses e dissertações defendidas por alunos dos cursos de pós-graduação do INPA"
                  }
                />
              </Grid>
              <Grid xs={12} sm={6} md={4} 
              sx={{ display: 'flex', justifyContent: 'center'}}
              >
                <Counters
                  counter={500}
                  title={"Revistas científicas"}
                  description={
                    "Títulos de revistas científicas na area de ciências biologicas"
                  }
                />
              </Grid>
            </Grid>
            {/* </Box> */}
          </Paper>
          <Box mt={'5vh'}>

         
          <Footer />
          </Box>
        </Box>
      </Container>
    </>
  );
}
