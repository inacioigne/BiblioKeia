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

export default function WorkPreview() {
  const { work } = useBf();
  return (
    <Grid xs={4} bgcolor={grey[200]}>
      <Box sx={{ p: "1rem" }}>
        <Typography variant="h4">Work</Typography>
        <Typography variant="subtitle2">{work.work_id}</Typography>
      </Box>

      <Divider sx={{ mb: "0.5rem" }} />
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Tipo de conteúdo:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.contentType}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Título:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.mainTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.subtitle}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Auhtor:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.contributionAgent}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.contributionRole}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Idioma:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.language}
        </Typography>
      </Box>
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Classificação:
        </Typography>
        <Typography variant="subtitle1">
          {work?.cdd} {work?.cutter}
        </Typography>
      </Box>
      {/* <Typography variant="h4" sx={{ p: "1rem" }}>
        Instância
      </Typography>
      <Divider sx={{ mb: "0.5rem" }} />
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Instance de:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.work_id}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Título:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.mainTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {work?.subtitle}
        </Typography>
      </Box> */}
    </Grid>
  );
}
