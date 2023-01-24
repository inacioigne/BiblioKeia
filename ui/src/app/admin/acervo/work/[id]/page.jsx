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
  Divider,
  List,
} from "@mui/material/";
import {
  ImportContacts,
  Home,
  Person3,
  Class,
  DashboardCustomize,
} from "@mui/icons-material/";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Hooks
import { useEffect, useState } from "react";

// BiblioKeia Services
import QueryWork from "src/services/acervo/work";

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
];

export default function Work({ params }) {
  const [work, setWork] = useState(null);

  useEffect(() => {
    let id = params.id;
    QueryWork(id, setWork);
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
          <Divider />
        </Grid>
        {work && (
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Título
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {work?.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Tipo
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {work?.typeLabel}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Autor
              </Typography>
              <Button variant="outlined" startIcon={<Person3 />}>
                {work?.contribution}
              </Button>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Assuntos
              </Typography>
              <List>
                {work?.subjects?.map((subject, index) => (
                  <Button
                    variant="outlined"
                    key={index}
                    onClick={() => console.log(subject.uri)}
                    size={"small"}
                    sx={{ textTransform: "none" }}
                  >
                    {/* <Typography variant="subtitle1"  >
                  {subject.label}
                </Typography> */}
                    {subject.label}
                  </Button>
                ))}
              </List>
            </Box>
          </Grid>
        )}
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Instâncias
          </Typography>
          <Divider />
        </Grid>
      </Grid>
    </Container>
  );
}
