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
} from "@mui/material/";
import { Home, Person3, Delete, EditRoad } from "@mui/icons-material/";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Hooks
import { useEffect, useState } from "react";

// BiblioKeia Services
import QueryWork from "src/services/acervo/work";

// Nextjs Hooks
import Image from "next/image";
import Link from "next/link";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <Home fontSize="small" />,
  },
];

export default function Work({ params }) {
  const [work, setWork] = useState(null);
  const { setWorkEdit } = useBf();

  useEffect(() => {
    let id = params.id;
    QueryWork(id, setWork);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="Obra" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Obra
            </Typography>
            <Box>
            <Link href={`/admin/acervo/work/${params.id}/edit`}>
              <Button
                sx={{ mr: "1rem" }}
                variant="outlined"
                startIcon={<EditRoad />}
                onClick={() => setWorkEdit(work)}
              >
                Editar
              </Button>
              </Link>
              <Button variant="outlined" color="error" startIcon={<Delete />}>
                Excluir
              </Button>
            </Box>
          </Box>

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
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Assuntos
              </Typography>
              <List>
                {work?.subjects?.map((subject, index) => (
                  <ListItem key={index}>
                    <Button
                      variant="outlined"
                      onClick={() => console.log(subject.uri)}
                      size={"small"}
                      sx={{ textTransform: "none" }}
                    >
                      {subject.label}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Série
              </Typography>
              <Button>{work.serie?.title}</Button>
            </Box>
          </Grid>
        )}
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Instâncias
          </Typography>
          <Divider />
          {work?.instanceID && (
            <Link href={`/admin/acervo/instance/${work?.instanceID}`}>
              <Paper
                sx={{
                  mt: "1rem",
                  width: 180,
                  height: 230,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`/cover/${work?.instanceID}.jpeg`}
                  width={180}
                  height={230}
                  alt="cover"
                />
              </Paper>
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
