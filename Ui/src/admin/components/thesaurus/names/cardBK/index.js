// MUI
import {
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material/";
import {
  LocalHospital,
  ChildFriendly,
  FileDownloadDone,
  BorderAll,
} from "@mui/icons-material";

import Image from "next/image";

export default function CardNamesBK({ nameDetails, img }) {
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
              //onClick={handleChoose}
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
                <Button size="small"> {nameDetails?.birth.place}</Button>
                <Button size="small" startIcon={<ChildFriendly />}>
                  {nameDetails?.birth.date}
                </Button>
              </Box>
            </Grid>
          )}

          {/* death */}
          {nameDetails?.death && (
            <Grid item xs={6}>
              <Box pt="0.5rem">
                <Typography variant="subtitle2">Falecimento:</Typography>
                <Button size="small"> {nameDetails?.death.place}</Button>
                <Button size="small" startIcon={<LocalHospital />}>
                  {nameDetails?.death.date}
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
                    <Image src={img} layout="fill" />
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
