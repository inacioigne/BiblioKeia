"use client";
// MUI
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  MenuList,
  ListItemIcon,
  MenuItem,
  ListItemText,
} from "@mui/material/";
import {
  Home,
  Person3,
  Delete,
  Class,
  ImportContacts,
} from "@mui/icons-material/";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import LanguageIcon from "@mui/icons-material/Language";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { useProgress } from "src/providers/progress";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import Content from "src/components/bibframe/work/content";
import Title from "src/components/bibframe/work/title";
import Contribution from "src/components/bibframe/work/contribution";
//import Subject from "src/components/bibframe/work/subject";
import Subject from "./subject";
import Language from "src/components/bibframe/work/language";
import Classification from "src/components/bibframe/work/classification";
import Serie from "src/components/bibframe/work/serie";

// React Hooks
import { useEffect, useState } from "react";

// BiblioKeia Services
import QueryWork from "src/services/acervo/work";
import { api } from "src/services/api/api";

// BiblioKeia Styles
import { menuStyle } from "src/styles/mui";

const metadados = [
  { label: "Tipo", icon: ImportContacts },
  { label: "Título", icon: TitleIcon },
  { label: "Autor", icon: Person3 },
  { label: "Assunto", icon: SubjectIcon },
  { label: "Idioma", icon: LanguageIcon },
  { label: "Classificação", icon: Class },
  { label: "Série", icon: Class },
];

export default function Edit({ params }) {
  const { workEdit, work, setWork } = useBf();
  const { setProgress } = useProgress();
  const [visible, setVisible] = useState(0);
  const [listSubject, setListSubject] = useState([{ label: "", uri: "" }]);

  const previousPaths = [
    {
      link: "/admin",
      label: "Início",
      icon: <Home fontSize="small" />,
    },
    {
      link: `/admin/acervo/work/${workEdit?.instanceOf}`,
      label: "Obra",
      icon: <Class fontSize="small" />,
    },
  ];

  useEffect(() => {
    let id = params.id;
    QueryWork(id, setWork);
    //const workBefore = work
    
    
    
  }, []);

  

  function putWork(work) {
    api
      .put(`/cataloguing/work?work_id=${work.work_id}`, work)
      .then((response) => {
        //setProgress(false);
        console.log(response)
        // if (response.status == 201) {
        //   setInstances((prevState) => ({
        //     ...prevState,
        //     instanceOf: response.data.id,
        //   }));
        //   console.log(response.data);
        //   setTypeAlert("success");
        //   setMessage("Registro salvo com sucesso!");
        //   setOpenSnack(true);
        //   router.push("/admin/cataloguing/book/instance");
        // }
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="Edição" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Edição - Obra 
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={3}>
          <Paper>
            <Typography variant="subtitle2" sx={{ p: "1rem" }}>
              Metadados
            </Typography>
            <MenuList>
              {metadados.map((metadado, index) => (
                <MenuItem
                  key={index}
                  sx={
                    visible == index
                      ? {
                          ...menuStyle,
                          backgroundColor: "hover.background",
                          color: "text.primary",
                        }
                      : { ...menuStyle }
                  }
                  onClick={() => {
                    setVisible(index);
                  }}
                >
                  <ListItemIcon>
                    <metadado.icon />
                  </ListItemIcon>
                  <ListItemText>{metadado.label}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            {visible === 0 && <Content />}
            {visible === 1 && <Title />}
            {visible === 2 && <Contribution />}
            <Box
              sx={visible === 3 ? { display: "block" } : { display: "none" }}
            >
              <Subject
                listSubject={listSubject}
                setListSubject={setListSubject}
              />
            </Box>
            {visible === 4 && <Language />}
            {visible === 5 && <Classification />}
            {visible === 6 && <Serie />}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ textTransform: "none" }}
            variant="outlined"
            onClick={() => {
             
              putWork(work)
            }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
