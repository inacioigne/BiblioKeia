// MUI
import {
    Box,
    IconButton,
    Typography,
    Divider,
    Grid,
    Button,
    Paper,
    Card,
    CardContent,
    Tooltip,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material/";
  import {
    LocalHospital,
    ChildFriendly,
    FileDownloadDone,
  } from "@mui/icons-material";
  
  // Next Components
  import Image from "next/image";
  
  // BiblioKeia Hooks
  import { useBf } from "src/providers/bibframe";
  
  export default function CardNamesBK({
    nameDetails,
    img,
    setOpen,
    setName,
    setDisabled,
  }) {
    const { setWork } = useBf();
  
    const handleChoose = () => {
      setDisabled(true);
      setOpen(false);
      setName("");
      setWork((prevState) => ({
        ...prevState,
        contributionAgent: nameDetails.name,
        contributionID: nameDetails.token,
      }));
    };
  
    return (
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{nameDetails?.name}</Typography>
            <Tooltip title="Escolher">
              <IconButton
                color="primary"
                component="label"
                onClick={handleChoose}
              >
                <FileDownloadDone />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            {/* birth */}
            {nameDetails?.birth && (
              <Grid item xs={6}>
                <Box pt="0.5rem">
                  <Typography variant="subtitle2">Nascimento:</Typography>
                  {nameDetails.birth?.place && (
                    <Button sx={{ textTransform: "none" }} size="small">
                      <Typography variant="body2" gutterBottom>
                        {nameDetails?.birth.place}
                      </Typography>
                    </Button>
                  )}
                  <Button
                    sx={{ textTransform: "none" }}
                    size="small"
                    startIcon={<ChildFriendly />}
                  >
                    <Typography variant="body2" gutterBottom>
                      {nameDetails?.birth.date}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            )}
            {/* death */}
            {nameDetails?.death && (
              <Grid item xs={6}>
                <Box pt="0.5rem">
                  <Typography variant="subtitle2">Falecimento:</Typography>
                  {nameDetails.death?.place && (
                    <Button sx={{ textTransform: "none" }} size="small">
                      {nameDetails.death.place}
                    </Button>
                  )}
                  <Button size="small" startIcon={<LocalHospital />}>
                    <Typography variant="body2" gutterBottom>
                      {nameDetails?.death.date}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            )}
  
            {/* fullerName */}
            <Grid item xs={6}>
              <Box pt="0.5rem">
                {nameDetails?.fullerName && (
                  <>
                    <Typography variant="subtitle2">Nome completo:</Typography>
                    <Typography variant="body2">
                      {nameDetails?.fullerName}
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
                        width: 180,
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
            {nameDetails?.variant && (
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
                    {nameDetails?.variant.map((variant, index) => (
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