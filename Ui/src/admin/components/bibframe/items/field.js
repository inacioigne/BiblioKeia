import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  DialogActions,
  TextField,
  FormControl,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Field({ id, fields, setFields }) {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        columnGap: "1rem",
      }}
    >
      {id}
      <TextField
        //onChange={handleOnChangeSeries}
        //value={instance.series}
        //fullWidth
        label="Chamada"
      />
      <TextField
        //onChange={handleOnChangeSeries}
        //value={instance.series}
        //fullWidth
        label="Localização"
      />
      <TextField
        //onChange={handleOnChangeSeries}
        //value={instance.series}
        //fullWidth
        label="Número"
      />
      <IconButton
        id={id}
        onClick={() => {
          const f = fields.filter((e) => {
            return e !== id;
          });
          setFields(fields.filter((e) => {
            return e !== id;
          }));

          console.log(f);
        }}
      >
        <RemoveIcon />
      </IconButton>
    </FormControl>
  );
}
