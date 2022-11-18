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
import { useState, useEffect } from "react";
import Content from "src/admin/components/bibframe/content";
import CreateWork from "src/admin/components/bibframe/CreateWork";
import Title from "src/admin/components/bibframe/title";
import Subject from "src/admin/components/bibframe/subject";
import Preview from "src/admin/components/work_preview";
import Language from "src/admin/components/bibframe/language";
import Classification from "src/admin/components/bibframe/classification";
import { CataloguingApi } from "src/services/cataloguing/create";
import { api } from "src/services/api";
import { useRouter } from "next/router";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

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
        //console.log("Api", response.data.id);

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
    //setVisible(6)
    api
      .post('/cataloguing/work', work)
      .then((response) => {
            console.log("Api", response);
          })
          .catch(function (error) {
            console.log("ER", error);
          });

    router.push(`/admin/templates/instances?workid=${work.work_id}`);
    

    // CataloguingApi.post("work", work)
    //   .then((response) => {
    //     console.log("Api", response);
    //   })
    //   .catch(function (error) {
    //     console.log("ER", error);
    //   });
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
        {/* <Typography variant="h5" gutterBottom>
          Instância
        </Typography>
        <MenuList>
          {metadado_instance.map((metadata, index) => (
            <MenuItem
              key={index}
              sx={
                visible == index + 6
                  ? {
                      ...styleItemMenunActive,
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(index + 6);
              }}
            >
              <ListItemText>{metadata}</ListItemText>
            </MenuItem>
          ))}
        </MenuList> */}
      </Grid>

      <Grid xs={5} bgcolor={grey[100]}>
        <form onSubmit={handleSubmit}>
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
            {visible === 2 && <CreateWork />}
            {/* Subject */}

            <Box
              sx={visible === 3 ? { display: "block" } : { display: "none" }}
            >
              <Subject
                listSubject={listSubject}
                SetListSubject={SetListSubject}
              />
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
            <Button variant="outlined" type="submit">
              Salvar e Adicionar Instância
            </Button>
          </Box>
        </form>
      </Grid>
      <Preview />
    </Grid>
  );
}
