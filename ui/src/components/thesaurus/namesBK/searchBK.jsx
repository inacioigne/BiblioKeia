// MUI
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogContent,
  Grid,
  Box,
  List,
  ListItem,
  Button,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";

// BiblioKeia Components
import Type from "src/components/thesaurus/namesBK/inputs/type";
import AuthoritySearch from "src/components/thesaurus/namesBK/inputs/authoritySearch";
import CardNamesBK from "src/components/thesaurus/namesBK/cardNamesBK";
import SearchLCNAF from "src/components/thesaurus/namesLCNAF/searchLCNAF";

// BiblioKeia Services
import QueryNamesBK from "src/services/thesaurus/names/queryBK";

// React Hooks
import { useState, useEffect } from "react";

export default function SearchBK({
  open,
  setOpen,
  type,
  setType,
  name,
  setName,
  response,
  setResponse,
  disabled,
  setDisabled,
}) {
  const [nameDetails, setNameDetails] = useState(null);
  const [img, setImg] = useState(null);
  const [openLCNAF, setOpenLCNAF] = useState(false);

  useEffect(() => {
    setNameDetails(null);
  }, [response]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="div">Nomes BK</Typography>
          <IconButton color="primary" component="label" onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs={5} sx={{ borderRight: "solid 1px", pr: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Type setType={setType} type={type} />
                <AuthoritySearch
                  name={name}
                  setName={setName}
                  type={type}
                  setResponse={setResponse}
                />
              </Box>
              {response.length > 0 ? (
                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                      mt: "0.5rem",
                    }}
                  >
                    <i>Resultados:</i>
                  </Typography>
                  <List>
                    {response.map((authority, index) => (
                      <ListItem key={index} disablePadding>
                        <Button
                          onClick={() => {
                            QueryNamesBK(authority.id, setNameDetails, setImg);
                          }}
                        >
                          {authority.name}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box pt={"0.5rem"}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                      mt: "0.5rem",
                    }}
                  >
                    <i>Nenhum registro encontrado::</i>
                  </Typography>
                  <Button
                    onClick={() => {
                      setOpenLCNAF(true);
                    }}
                  >
                    Importar registros
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={7} sx={{ pl: "1rem" }}>
              {nameDetails && (
                <CardNamesBK
                  setOpen={setOpen}
                  setName={setName}
                  nameDetails={nameDetails}
                  img={img}
                  setDisabled={setDisabled}
                  disabled={disabled}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {openLCNAF && (
        <SearchLCNAF
          open={openLCNAF}
          setOpen={setOpenLCNAF}
          setNameDetails={setNameDetails}
          setImgBK={setImg}
          name={name}
        />
      )}
    </>
  );
}
