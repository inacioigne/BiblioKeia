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
  FileCopy
} from "@mui/icons-material/";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import LanguageIcon from "@mui/icons-material/Language";


// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import Type from "src/components/bibframe/instance/type";
import Title from "src/components/bibframe/instance/title";
import Extent from "src/components/bibframe/instance/extent";
import ProvisionActivity from "src/components/bibframe/instance/provisionActivity";
import ResponsibilityStatement from "src/components/bibframe/instance/responsibilityStatement";
import Edition from "src/components/bibframe/instance/editionStatement";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Styles
import { menuStyle } from "src/styles/mui";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";


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
  { label: "Publicação", icon: LocationCity },
  { label: "Série", icon: Class },
];

export default function Instance() {

    const [visible, setVisible] = useState(0);
    const { instance } = useBf();

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
        </Grid>
        <Grid item xs={12}>
            <Button variant="outlined" onClick={() => console.log("INSTANCE: ", instance)}>
              Salvar e Adicionar exemplar
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
