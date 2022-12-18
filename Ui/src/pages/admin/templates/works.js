// Material UI
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material/";
import { grey } from "@mui/material/colors/";

// React Hooks
import { useState, useEffect } from "react";

// Nextjs Hooks
import { useRouter } from "next/router";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// BiblioKeia API
import { api } from "src/services/api";

// BiblioKeia Components
import Content from "src/admin/components/bibframe/works/content";
import Contribution from "src/admin/components/bibframe/works/contribution";
import Title from "src/admin/components/bibframe/works/title";
import Subject from "src/admin/components/bibframe/works/subject";
import Preview from "src/admin/components/work_preview";
import Language from "src/admin/components/bibframe/works/language";
import Classification from "src/admin/components/bibframe/works/classification";

// Styles
const styleItemMenun = {
  borderRadius: "5px",
  mx: "0.5rem",
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

const styleItemMenunActive = {
  borderRadius: "5px",
  mx: "0.5rem",
  backgroundColor: grey[300],
  color: grey[900],
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

// Metadata
const metadado_work = [
  "Tipo",
  "Título",
  "Autor",
  "Assunto",
  "Idioma",
  "Classificação",
];

export default function Works() {
  const router = useRouter();

  const [visible, setVisible] = useState(0);
  const [listSubject, SetListSubject] = useState([]);
  const [id, setId] = useState(null);

  const { work, setWork } = useBf();

  useEffect(() => {
    api
      .get("/items/next_id")
      .then((response) => {
        setWork((prevState) => ({
          ...prevState,
          work_id: response.data.id,
        }));
      })
      .catch(function (error) {
        console.log("ER", error);
      });

    setWork((prevState) => ({
      ...prevState,
      subjects: listSubject,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", work);

    api
      .post("/cataloguing/work", work)
      .then((response) => {
        console.log("Api", response);
      })
      .catch(function (error) {
        console.log("ER", error);
      });

    router.push(`/admin/templates/instances?workid=${work.work_id}`);
  };

  return (
    <Grid container>
      <Grid item xs={3} bgcolor={grey[900]} sx={{ color: "white", p: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          Obra
        </Typography>
        <MenuList>
          {metadado_work.map((metadata, index) => (
            <MenuItem
              key={index}
              sx={
                visible == index
                  ? {
                      ...styleItemMenunActive,
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(index);
              }}
            >
              <ListItemText>{metadata}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Grid>

      <Grid xs={5} bgcolor={grey[100]}>
        {/* <form onSubmit={handleSubmit}> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Content Type*/}
            {visible === 0 && <Content />}
            {/* Title */}
            {visible === 1 && <Title />}
            {/* Creator of Work */}
            {visible === 2 && <Contribution />}
            {/* Subject */}

            <Box
              sx={visible === 3 ? { display: "block" } : { display: "none" }}
            >
              <Subject />
   
            </Box>

            {/* Idioma */}
            {visible === 4 && <Language />}
            {/* Classification */}
            {visible === 5 && <Classification />}
            {/* Instance */}
            {visible === 6 && <Title />}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mr: "2rem",
            }}
          >
            <Button variant="outlined" //type="submit"
            onClick={handleSubmit}
            >
              Salvar e Adicionar Instância
            </Button>
          </Box>
        {/* </form> */}
      </Grid>
      <Preview />
    </Grid>
  );
}
