// Material UI
import { TextField, InputAdornment, IconButton } from "@mui/material/";
import { Search } from "@mui/icons-material";

// BiblioKeia Services
import SearchAuthority from "src/services/solr/searchAuthority";

export default function AuthoritySearch({ name, setName, type, setResponse }) {
  const inputPros = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton color="primary" aria-label="search" component="button">
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <TextField
      onChange={(e) => {
        setName(e.target.value);
        SearchAuthority(e.target.value, type, setResponse);
      }}
      value={name}
      fullWidth
      label="Autor"
      InputProps={inputPros}
    />
  );
}
