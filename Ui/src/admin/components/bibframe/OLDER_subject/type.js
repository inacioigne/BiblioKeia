import {
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from "@mui/material/";

export default function Type({ setType, type }) {

  return (
    <FormControl sx={{width: "15rem"}}>
      <InputLabel id="type">Tipo</InputLabel>
      <Select
        label="Tipo"
        onChange={(event) => {
          setType(event.target.value);
        }}
        value={type}
      >
        <MenuItem value={"SimpleType"}>Tipo Simples</MenuItem>
        <MenuItem value={"ComplexType"}>Tipo Complexo</MenuItem>
      </Select>
    </FormControl>
  );
}
