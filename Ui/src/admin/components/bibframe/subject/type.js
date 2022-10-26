import {
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from "@mui/material/";

export default function Thesaurus({ setType, type }) {

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
        <MenuItem value={"SimpleType"}>Tipo Simples</MenuItem>
        <MenuItem value={"ComplexType"}>Tipo Complexo</MenuItem>
      </Select>
    </FormControl>
  );
}
