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
} from "@mui/icons-material/";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import LanguageIcon from "@mui/icons-material/Language";

// MUI Colors
import { blue } from "@mui/material/colors";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Hooks
import { useState, useEffect } from "react";

const previousPaths = [
  {
    link: "admin",
    label: "Início",
    icon: <Home fontSize="small" />,
  },
  {
    link: "admin/cataloguing",
    label: "Catalogação",
    icon: <DashboardCustomize fontSize="small" />,
  },
  {
    link: "admin/cataloguing/book",
    label: "Obra",
    icon: <Class fontSize="small" />,
  },
];

const metadados = [
  { label: "Tipo", icon: ImportContacts },
  { label: "Título", icon: TitleIcon },
  { label: "Extensão", icon: Person3 },
  { label: "Edição", icon: SubjectIcon },
  { label: "Responsabilidades", icon: LanguageIcon },
  { label: "Série", icon: Class },
];

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

export default function Instance() {

    const [visible, setVisible] = useState(0);

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
                    <metadado.icon />
                  </ListItemIcon>
                  <ListItemText>{metadado.label}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
