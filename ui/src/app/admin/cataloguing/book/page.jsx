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

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import Content from "src/components/bibframe/work/content";
import Title from "src/components/bibframe/work/title";
import Contribution from "src/components/bibframe/work/contribution";
import Subject from "src/components/bibframe/work/subject";
import Language from "src/components/bibframe/work/language";
import Classification from "src/components/bibframe/work/classification";
import Serie from "src/components/bibframe/work/serie";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { useProgress } from "src/providers/progress";
import { useAlertBK } from "src/providers/alerts";

// BiblioKeia Services
import { api } from "src/services/api/api";

// Next Components
import Link from "next/link";

// BiblioKeia Styles
import { menuStyle } from "src/styles/mui";

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

// React Hooks
import { useState, useEffect } from "react";

// Next Hooks
import { useRouter } from "next/navigation";

const metadados = [
  { label: "Tipo", icon: ImportContacts },
  { label: "Título", icon: TitleIcon },
  { label: "Autor", icon: Person3 },
  { label: "Assunto", icon: SubjectIcon },
  { label: "Idioma", icon: LanguageIcon },
  { label: "Classificação", icon: Class },
  { label: "Série", icon: Class },
];

export default function Book() {
  const { setProgress } = useProgress();
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();
  const [visible, setVisible] = useState(0);
  const { work, setInstances } = useBf();

  const router = useRouter();

  function postWork(work) {
    setProgress(true);
    //console.log(work)
    api
      .post(`/cataloguing/work`, work)
      .then((response) => {
        setProgress(false);
        if (response.status == 201) {
          setInstances((prevState) => ({
            ...prevState,
            instanceOf: response.data.id,
          }));
          console.log(response.data);
          setTypeAlert("success");
          setMessage("Registro salvo com sucesso!");
          setOpenSnack(true);

          router.push("/admin/cataloguing/book/instance");
        }
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

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
            {visible === 6 && <Serie />}
        
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ textTransform: "none" }}
            variant="outlined"
            onClick={() => postWork(work)}
          >
            Salvar e Adicionar Instancia
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
