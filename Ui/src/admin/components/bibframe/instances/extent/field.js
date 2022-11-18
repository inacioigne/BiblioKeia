import {
  TextField,
} from "@mui/material/";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";


export default function Field() {
    const { instance, setInstances } = useBf();

  const handleOnChangeExtent = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      extent: e.target.value,
    }));
  };
  return (
    <TextField
      onChange={handleOnChangeExtent}
      value={instance.extent}
      fullWidth
      label="Extensão"
    />
  );
}
