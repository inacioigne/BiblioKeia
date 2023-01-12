import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material/";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Field() {
  const { instance, setInstances } = useBf();

  const handleOnChangePlace = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      place: e.target.value,
    }));
  };

  const handleOnChangePublication = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      publication: e.target.value,
    }));
  };

  const handleOnChangeData = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };

  return (
    <FormControl fullWidth sx={{ display: "flex", gap: "1rem"}}>
      <TextField
        onChange={handleOnChangePlace}
        value={instance.place}
        label="Local"
        name="place"
      />
      <TextField
        onChange={handleOnChangePublication}
        value={instance.publication}
        label="Editora"
        name="publication"
      />
      <TextField
        onChange={handleOnChangeData}
        value={instance.date}
        label="Ano"
        name="date"
      />
      
    </FormControl>
  );
}
