// Material UI
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    MenuItem,
  } from "@mui/material/";
  import { Search, Close } from "@mui/icons-material";
  
  // React Hooks
  import { useState, useRef } from "react";
  
  // BiblioKeia Hooks
  import { useBf } from "src/providers/bibframe";
  
  export default function AuthoritySearch({ handleSearch, name, setName, searchAuthority }) {
      
    const { work, setWork } = useBf();
  
    const [disabled, setDisabled] = useState(false);
  
    const inputPros = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            color="primary"
            aria-label="search"
            component="button"
            //type="submit"
            //onClick={() => console.log("r")}
          >
            <Search />
          </IconButton>
        </InputAdornment>
      ),
    };
  
    return (
      <TextField
        //onChange={handleSearch}
        onChange={(e) => {
            setName(e.target.value)
            searchAuthority(e.target.value);
            }}
        value={name}
        fullWidth
        label="Autor"
        InputProps={inputPros}
      />
    );
  }