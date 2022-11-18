import {
    TextField,
  } from "@mui/material/";
  // BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
  
  
export default function Field() {
      const { instance, setInstances } = useBf();
  
    const handleOnChangeResponsibility = (e) => {
      setInstances((prevState) => ({
        ...prevState,
        responsibility: e.target.value,
      }));
    };
    return (
      <TextField
        onChange={handleOnChangeResponsibility}
        value={instance.responsibility}
        fullWidth
        label="Responsabilidades"
      />
    );
  }
  