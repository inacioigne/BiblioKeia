// MUI
import {
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material/";
import { FileDownloadDone } from "@mui/icons-material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function CardSerie({ serieDetails, handleChoose }) {
  const { work, setWork } = useBf();

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
          <Typography variant="h6">{serieDetails.mainTitle}</Typography>
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
          <Grid item sm={12}>
            {serieDetails.variantTitle && (
              <Box
                sx={{
                  flexDirection: "column",
                  p: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="subtitle2">Título alternativo:</Typography>
                <Typography variant="subtitle1">
                  {serieDetails.variantTitle}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item sm={12}>
            <Box
              sx={{
                flexDirection: "column",
                p: "0.5rem",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <Typography variant="subtitle2">Autoria:</Typography>
              <Typography variant="subtitle1">
                {serieDetails.contribution}
              </Typography>
            </Box>
          </Grid>
          {serieDetails.issn && (
            <Grid item sm={6}>
              <Box
                sx={{
                  flexDirection: "column",
                  p: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="subtitle2">ISSN:</Typography>
                <Typography variant="subtitle1">{serieDetails.issn}</Typography>
              </Box>
            </Grid>
          )}

          <Grid item sm={6}>
          <Box
                sx={{
                  flexDirection: "column",
                  p: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="subtitle2">CDD:</Typography>
                <Typography variant="subtitle1">{serieDetails.cdd}</Typography>
              </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
