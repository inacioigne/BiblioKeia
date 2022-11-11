import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
  //Divider,
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState, useEffect } from "react";
import Content from "src/admin/components/bibframe/content";
import CreateWork from "src/admin/components/bibframe/CreateWork";
import Title from "src/admin/components/bibframe/title";
import Subject from "src/admin/components/bibframe/subject";
import Preview from "src/admin/components/preview";
import Language from "src/admin/components/bibframe/language";
import Classification from "src/admin/components/bibframe/classification";
import { CataloguingApi } from "src/services/cataloguing/create";
import { api } from "src/services/api";

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

const metadado_instance = [
  "Título",
  
];

export default function Monograph() {
  const [visible, setVisible] = useState(0);
  const [listSubject, SetListSubject] = useState([]);
  const [id, setId] = useState(null)

  const { bf, setBf } = useBf();
  

  useEffect(() => {

    api.get("/items/next_id")
      .then((response) => {
        console.log("Api", response.data.id);
        setId(response.data.id)
      })
      .catch(function (error) {
        console.log("ER", error);
      });

    setBf((prevState) => ({
      ...prevState,
      work_id: id,
      subjects: listSubject,
    }));
  }, [listSubject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", bf);
    setVisible(6)

    // CataloguingApi.post("work", bf)
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
        <Typography variant="h5" gutterBottom>
          Instância
        </Typography>
        <MenuList>
          {metadado_instance.map((metadata, index) => (
            <MenuItem
              key={index}
              sx={
                visible == index+6
                  ? {
                      ...styleItemMenunActive,
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(index+6);
              }}
            >
              <ListItemText>{metadata}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
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
            {visible === 0 && (
              <Content
              //values={bf} setValues={setBf}
              />
            )}
            {/* Title */}
            {visible === 1 && (
              <Title />
            )}
            {/* Creator of Work */}
            {visible === 2 && <CreateWork />}
            {/* Subject */}
            {visible === 3 && (
              <Subject
                listSubject={listSubject}
                SetListSubject={SetListSubject}
              />
            )}
            {/* Idioma */}
            {visible === 4 && <Language />}
            {/* Classification */}
            {visible === 5 && <Classification />}
            {/* Instance */}
            {visible === 6 && <Title /> }
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
