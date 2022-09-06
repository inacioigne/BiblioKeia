import { Paper, Box } from "@mui/material/";
import Image from "next/image";
import Navbar from "../components/Navbar";
import SearchBox from "src/components/SearchBox";
import Counters from "../components/Counters";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: "70vh",
          position: "sticky",
        }}
      >
        <Image src={"/images/library.jpg"} layout="fill" objectFit="cover" />
      </Box>
      {/* NAVBAR */}
      <Navbar />
      {/* SEARCHBOX */}
      <SearchBox />
      <Box
        sx={{
          mx: "3rem",
          //my: "2rem",
          position: "absolute",
          zIndex: 1000,
          top: "60vh",
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              mx: "3rem",
              my: "2rem",
            }}
          >
            <Counters
              counter={30000}
              title={"Livros"}
              description={"Obras de referência em questões amazonicas"}
            />

            <Counters
              counter={3000}
              title={"Teses & Dissertações"}
              description={
                "Teses e dissertações defendidas por alunos dos cursos de pós-graduação do INPA"
              }
            />
            <Counters
              counter={"5.000"}
              title={"Revistas científicas"}
              description={
                "Títulos de revistas científicas na area de ciências biologicas"
              }
            />
          </Box>
        </Paper>
        <Footer />
      </Box>
    </Box>
  );
}
