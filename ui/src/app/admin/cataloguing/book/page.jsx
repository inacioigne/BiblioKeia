"use client";
// MUI
import {
  Container,
  Paper,
  Grid,
  Box,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material/";
import {
  ImportContacts,
  Home,
  Person3,
  Class,
  DashboardCustomize,
} from "@mui/icons-material/";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import LanguageIcon from "@mui/icons-material/Language";

import { blue } from "@mui/material/colors";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// BiblioKeia Components
import Content from "src/components/bibframe/content";
import Title from "src/components/bibframe/title";
import Contribution from "src/components/bibframe/contribution";
import Subject from "src/components/bibframe/subject";
import Language from "src/components/bibframe/language";
import Classification from "src/components/bibframe/classification";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// BiblioKeia Services
import { api } from "src/services/api/api";

// Next Components
import Link from "next/link";

const menuStyle = {
  borderRadius: "6px",
  mx: "0.5rem",
  mb: "0.5rem",
  pl: "0.5rem",
  color: "text.secondary",
  ":hover": {
    backgroundColor: blue[100],
    color: "text.primary",
  },
};

const previousPaths = [
  {
    link: "admin",
    label: "Início",
    icon: <Home fontSize="small" />,
  },
  {
    link: "cataloguing",
    label: "Catalogação",
    icon: <DashboardCustomize fontSize="small" />,
  },
];

// React Hooks
import { useState, useEffect } from "react";

const metadados = [
  { label: "Tipo", icon: ImportContacts },
  { label: "Título", icon: TitleIcon },
  { label: "Autor", icon: Person3 },
  { label: "Assunto", icon: SubjectIcon },
  { label: "Idioma", icon: LanguageIcon },
  { label: "Classificação", icon: Class },
];

export default function Book() {
  const [visible, setVisible] = useState(0);
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

    // setWork((prevState) => ({
    //   ...prevState,
    //   subjects: listSubject,
    // }));
  }, []);
  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="Livros" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Obra
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
                          backgroundColor: blue[100],
                          color: "text.primary",
                        }
                      : { ...menuStyle }
                  }
                  onClick={() => {
                    setVisible(index);
                  }}
                >
                  <ListItemIcon>
                    {/* <ImportContacts
                      sx={{ ":hover": { color: "text.primary" } }}
                    /> */}
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
            {visible === 0 && <Content defaultType="Texto" />}
            {visible === 1 && <Title />}
            {visible === 2 && <Contribution />}
            <Box
              sx={visible === 3 ? { display: "block" } : { display: "none" }}
            >
              <Subject />
            </Box>
            {visible === 4 && <Language />}
            {visible === 5 && <Classification />}
          </Paper>
        </Grid>
        <Button variant="outlined" onClick={() => console.log(work)}>
          Salvar e Adicionar Instancia
        </Button>
      </Grid>
    </Container>
  );
}
