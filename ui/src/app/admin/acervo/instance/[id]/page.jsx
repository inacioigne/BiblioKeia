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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material/";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Home,
  Class,
  DashboardCustomize,
  CorporateFare,
} from "@mui/icons-material/";
import { styled } from "@mui/material/styles";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Hooks
import { useEffect, useState } from "react";

// Nextjs Hooks
import Image from "next/image";

// BiblioKeia Services
import ParserInstance from "src/services/acervo/instance";

export default function Instance({ params }) {
  const [instance, setInstance] = useState(null);

  const previousPaths = [
    {
      link: "/admin",
      label: "Início",
      icon: <Home fontSize="small" />,
    },
    {
      link: `/admin/acervo/work/${instance?.instanceOf}`,
      label: "Obra",
      icon: <Class fontSize="small" />,
    },
  ];

  useEffect(() => {
    let id = params.id;
    ParserInstance(id, setInstance);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
          <Divider />
        </Grid>
        {instance && (
          <Grid item xs={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Título
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {instance.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Tipo
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {instance.typeLabel}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Extensão
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {instance.extent}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Publicação
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {instance.place}: {instance.editora}, {instance.date}
              </Typography>

              {/* <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    Local
                  </Typography>
                  <SouthAmerica />
                  <Typography variant="subtitle2" gutterBottom>
                    {instance.place}
                  </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Editora
                  </Typography>
                  <CorporateFare />
                  <Typography variant="subtitle2" gutterBottom>
                    {instance.editora}
                  </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Editora
                  </Typography>
                  <CorporateFare />
                  <Typography variant="subtitle2" gutterBottom>
                    {instance.editora}
                  </Typography>
                </Box>
              </Box> */}
            </Box>
          </Grid>
        )}
        <Grid item xs={6}>
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
                  src={`/cover/${params?.id}.jpeg`}
                  width={180}
                  height={230}
                  alt="cover"
                />
              </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Items
          </Typography>
          <Divider />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Chamada</StyledTableCell>
                  <StyledTableCell align="right">Localização</StyledTableCell>
                  <StyledTableCell align="right">Registro</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instance?.items?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.sublocation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.register}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
