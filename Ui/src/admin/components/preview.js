import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors/";

const styles = { px: "1rem" };

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Preview({ values }) {
  const { bf } = useBf();
  return (
    <Grid xs={4} bgcolor={grey[200]}>
      <Typography variant="h4" sx={{ p: "1rem" }}>
        Work
      </Typography>
      <Divider sx={{ mb: "0.5rem" }} />
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Tipo de conteúdo:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.contentType}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Título:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.mainTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.subtitle}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Auhtor:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.contributionAgent}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.contributionRole}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Idioma:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.language}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Classificação:
        </Typography>
        <Typography variant="subtitle1" >
          {bf?.cdd} {bf?.cutter}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ p: "1rem" }}>
        Instância
      </Typography>
      <Divider sx={{ mb: "0.5rem" }} />
      <Box sx={{ ...styles }}>
      <Typography variant="subtitle2" gutterBottom>
          Instance de:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.work_id}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Título:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.mainTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {bf?.subtitle}
        </Typography>
      </Box>
    </Grid>
  );
}
