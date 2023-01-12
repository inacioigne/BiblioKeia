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

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

const styles = { px: "1rem" };

export default function InstancePreview() {
  const { work, instance } = useBf();
  return (
    <Grid xs={4} bgcolor={grey[200]}>
      <Box sx={{ p: "1rem" }}>
        <Typography variant="h4">Instance</Typography>
        <Typography variant="subtitle2">
          Instancia de: {instance?.instanceOf}
        </Typography>
      </Box>
      <Divider sx={{ mb: "0.5rem" }} />
      <Box sx={{ ...styles }}>
        <Typography variant="subtitle2" gutterBottom>
          Título:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.mainTitle}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Extensão:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.extent}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Local:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.place}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Editora:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.publication}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Ano:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.date}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Responsabilidades:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.responsibility}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Série:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {instance.series}
        </Typography>
      </Box>
    </Grid>
  );
}
