// MUI
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Grid,
  Button,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import {
  LocalHospital,
  ChildFriendly,
  FileDownloadDone,
  CloudDownload,
} from "@mui/icons-material";

// BiblioKeia Services
import { api } from "src/services/api/api";

// Next Components
import Image from "next/image";

// BiblioKeia Hooks
import { useAlertBK } from "src/providers/alerts";
import { useProgress } from "src/providers/progress";

// BiblioKeia Services
import QueryNamesBK from "src/services/thesaurus/names/queryBK";

export default function CardLCNAF({
  LCNAFDetails,
  img,
  setOpen,
  setNameDetails,
  setImgBK,
}) {
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();
  const { setProgress, initProgress } = useProgress();

  const handleImport = () => {
    setProgress(true);
    api
      .post(`/thesaurus/name/import/lcnaf/${LCNAFDetails.token}`)
      .then((response) => {
        if (response.status == 201) {
          setProgress(false)
          setTypeAlert("success");
          setMessage("Registro importado com sucesso!");
          setOpenSnack(true);
          QueryNamesBK(LCNAFDetails.token, setNameDetails, setImgBK);
          setOpen(false);
        }
      })
      .catch(function (error) {
        setProgress(false)
        if (error.response.status == 409) {
          setMessage("Registro já existe no thesarus");
          setTypeAlert("warning");
          setOpenSnack(true);
          QueryNamesBK(LCNAFDetails.token, setNameDetails, setImgBK);
          setOpen(false);
        }
      });
  };
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{LCNAFDetails?.name}</Typography>
          <Tooltip title="Importar">
            <IconButton
              color="primary"
              component="label"
              onClick={handleImport}
            >
              <CloudDownload />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <Grid container spacing={2}>
          {/* birth */}
          {LCNAFDetails?.birth && (
            <Grid item xs={6}>
              <Box pt="0.5rem">
                <Typography variant="subtitle2">Nascimento:</Typography>
                {LCNAFDetails.birth?.place && (
                  <Button sx={{ textTransform: "none" }} size="small">
                    <Typography variant="body2" gutterBottom>
                      {LCNAFDetails?.birth.place}
                    </Typography>
                  </Button>
                )}
                <Button
                  sx={{ textTransform: "none" }}
                  size="small"
                  startIcon={<ChildFriendly />}
                >
                  <Typography variant="body2" gutterBottom>
                    {LCNAFDetails?.birth.date}
                  </Typography>
                </Button>
              </Box>
            </Grid>
          )}

          {/* death */}
          {LCNAFDetails?.death && (
            <Grid item xs={6}>
              <Box pt="0.5rem">
                <Typography variant="subtitle2">Falecimento:</Typography>
                {LCNAFDetails.death?.place && (
                  <Button sx={{ textTransform: "none" }} size="small">
                    {LCNAFDetails.death.place}
                  </Button>
                )}

                <Button size="small" startIcon={<LocalHospital />}>
                  {LCNAFDetails?.death.date}
                </Button>
              </Box>
            </Grid>
          )}

          <Grid item xs={6}>
            <Box pt="0.5rem">
              {/* fullerName */}
              {LCNAFDetails?.fullerName && (
                <>
                  <Typography variant="subtitle2">Nome completo:</Typography>
                  <Typography variant="body2">
                    {LCNAFDetails?.fullerName}
                  </Typography>
                </>
              )}

              {/* Imagem */}

              {img && (
                <Paper
                  elevation={6}
                  sx={{
                    mt: "0.5rem",
                    width: 180,
                    height: 200,
                    position: "relative",
                    objectFit: "cover",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <Image
                    src={img}
                    fill={true}
                    sizes="(max-width: 180px, max-height: 200px)"
                    alt="author"
                  />
                  <Box
                    sx={{
                      height: 180,
                      width: 200,
                      background: "transparent",
                      borderRadius: "10px",
                      transition: "border 1s",
                      position: "relative",
                      "&:hover": {
                        border: "1px solid white",
                      },
                    }}
                  ></Box>
                </Paper>
              )}
            </Box>
          </Grid>
          {/* variant */}
          {LCNAFDetails?.variant && (
            <Grid item xs={6}>
              <Box
                sx={{
                  flexDirection: "column",
                  p: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="subtitle2">Variantes do nome:</Typography>
                <List dense={true}>
                  {LCNAFDetails?.variant.map((variant, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={variant} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
