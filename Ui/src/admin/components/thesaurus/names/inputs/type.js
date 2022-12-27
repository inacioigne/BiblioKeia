// Material UI
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";

export default function Type({type, setType}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="type">Tipo</InputLabel>
      <Select
        label="Tipo"
        onChange={(event) => {
          setType(event.target.value);
        }}
        value={type}
      >
        <MenuItem value={"PersonalName"}>Nome Pessoal</MenuItem>
        <MenuItem value={"family"}>Family</MenuItem>
        <MenuItem value={"CorporateName"}>Corporate</MenuItem>
        <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
        <MenuItem value={"conference"}>Conference</MenuItem>
        <MenuItem value={"NameTitle"}>Name Title</MenuItem>
      </Select>
    </FormControl>
  );
}
