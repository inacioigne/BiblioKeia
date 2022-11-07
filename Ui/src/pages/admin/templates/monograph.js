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
import Preview from "src/admin/components/preview"
import { CataloguingApi } from "src/services/cataloguing/create";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe"

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

const metadadas = [
  "Tipo",
  "Título",
  "Autor",
  "Assunto",
  "Date of Work",
  "Place of Origin of the Work",
  "(Geographic) Coverage of the Content",
  "(Time) Coverage of the Content",
  "Intended Audience",
  "Other contributors",
];

export default function Monograph() {
  const [visible, setVisible] = useState(0);
  const [listSubject, SetListSubject] = useState([])

  const { bf, setBf } = useBf()

  useEffect(() => {
    setBf((prevState) => ({
        ...prevState,
        subjects: listSubject
       
      }));
  }, [listSubject])



  const handleSubmit = (e) => {
    e.preventDefault();
    // setBf((prevState) => ({
    //   ...prevState,
    //   subjects: listSubject
     
    // }));
    console.log("Submit", bf, listSubject);
    
    CataloguingApi.post("work", bf)
    .then((response) => {
      console.log('Api', response)
    })
    .catch( function (error) {
      console.log('ER', error)
    })

  };

  return (
    <Grid container>
      <Grid item xs={3} bgcolor={grey[900]} sx={{ color: "white", p: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          Obra
        </Typography>
        <MenuList>
          {metadadas.map((metadata, index) => (
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
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Content Type*/}
            {visible === 0 && <Content 
            //values={bf} setValues={setBf} 
            />}
            {/* Title */}
            {visible === 1 && <Title 
            //values={bf} setValues={setBf} 
            />}
            {/* Creator of Work */}
            {visible === 2 && <CreateWork />}
            {/* Subject */}
            {visible === 3 && <Subject listSubject={listSubject} SetListSubject={SetListSubject} />}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mr: "2rem",
            }}
          >
            <Button variant="outlined" type="submit">
              Salvar
            </Button>
          </Box>
        </form>
      </Grid>
      <Preview 
      //values={bf} 
      />

      {/* <Grid xs={4} bgcolor={grey[200]}>
        <Typography variant="h4" sx={{ p: "1rem" }}>
          Work
        </Typography>
        <Divider />
        <Box sx={{ p: "1rem" }}>
          <Typography variant="subtitle2" gutterBottom>
            Tipo de conteúdo
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {values?.contentType}
          </Typography>
        </Box>
      </Grid> */}
    </Grid>
  );
}
