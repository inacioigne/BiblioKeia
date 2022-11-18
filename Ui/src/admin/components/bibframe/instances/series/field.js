import {
    TextField,
  } from "@mui/material/";
  // BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
  
  
export default function Field() {
      const { instance, setInstances } = useBf();
  
    const handleOnChangeSeries = (e) => {
      setInstances((prevState) => ({
        ...prevState,
        series: e.target.value,
      }));
    };
    return (
      <TextField
        onChange={handleOnChangeSeries}
        value={instance.series}
        fullWidth
        label="Série"
      />
    );
  }