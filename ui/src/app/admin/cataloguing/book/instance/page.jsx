"use client";
// MUI
import {
  Container,
  Paper,
  Grid,
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material/";

// MUI ICONS
import {
  ImportContacts,
  Home,
  Person3,
  Class,
  DashboardCustomize,
  PeopleAlt,
  LocationCity,
  Filter1,
  FileCopy,
} from "@mui/icons-material/";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import LanguageIcon from "@mui/icons-material/Language";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import Type from "src/components/bibframe/instance/type";
import Title from "src/components/bibframe/instance/title";
import Extent from "src/components/bibframe/instance/extent";
import ProvisionActivity from "src/components/bibframe/instance/provisionActivity";
import ResponsibilityStatement from "src/components/bibframe/instance/responsibilityStatement";
import Edition from "src/components/bibframe/instance/editionStatement";
import Item from "src/components/bibframe/item";
import ImagemBK from "src/components/buttons/imagem";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Styles
import { menuStyle } from "src/styles/mui";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { useProgress } from "src/providers/progress";
import { useAlertBK } from "src/providers/alerts";

// BiblioKeia Services
import { api } from "src/services/api/api";

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <Home fontSize="small" />,
  },
  {
    link: "/admin/cataloguing",
    label: "Catalogação",
    icon: <DashboardCustomize fontSize="small" />,
  },
  {
    link: "/admin/cataloguing/book",
    label: "Obra",
    icon: <Class fontSize="small" />,
  },
];

const metadados = [
  { label: "Tipo", icon: ImportContacts },
  { label: "Título", icon: TitleIcon },
  { label: "Responsabilidades", icon: PeopleAlt },
  { label: "Extensão", icon: FileCopy },
  { label: "Edição", icon: Filter1 },
  { label: "Publicação", icon: LocationCity }
];

export default function Instance() {
  const [visible, setVisible] = useState(0);
  const [openItem, setOpenItem] = useState(false);
  const [instance_id, setInstanceID] = useState(null)
  const { instance, setInstances } = useBf();
  const { setProgress } = useProgress();
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();

  function postInstance(instance) {
    console.log(instance)
    setOpenItem(true)
    setProgress(true); 
    api
      .post(`/cataloguing/instance`, instance)
      .then((response) => {
        
        if (response.status == 201) {
          let idResponse = response.data.id
          console.log(response)
          setInstanceID(idResponse)

          setOpenItem(true);
          setTypeAlert("success");
          setMessage("Registro salvo com sucesso!");
          setOpenSnack(true);
          setProgress(false);
        }
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
        setProgress(false);
      });
  }

  useEffect(() => {
    api.get("http://localhost:8000/items/next_id")
    .then((response) => {
      setInstances((prevState) => ({
        ...prevState,
        instance_id: response.data.id,
      }));
      
    })
  }, [])

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="Instância" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Instância
          </Typography>
        </Grid>
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
          <Button
            sx={{ textTransform: "none"}}
            variant="outlined"
            onClick={() => postInstance(instance)}
          >
            Salvar e Adicionar exemplar
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            {visible === 0 && <Type />}
            {visible === 1 && <Title />}
            {visible === 2 && <ResponsibilityStatement />}
            {visible === 3 && <Extent />}
            {visible === 4 && <Edition />}
            {visible === 5 && <ProvisionActivity />}
          </Paper>
          <ImagemBK />
        </Grid>
        {/* <Grid item xs={12}>
          <Button
            sx={{ textTransform: "none"}}
            variant="outlined"
            onClick={() => postInstance(instance)}
          >
            Salvar e Adicionar exemplar
          </Button>
        </Grid> */}
      </Grid>
      <Item open={openItem} setOpen={setOpenItem} instance_id={instance_id} />
    </Container>
  );
}
