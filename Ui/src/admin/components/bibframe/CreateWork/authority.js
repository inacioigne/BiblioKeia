import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
  MenuList,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { useState } from "react";

export default function Authority() {
  const [value, setValue] = useState("");
  const handleSearch = (data) => {
    setOpen(true);
    //setSearch(data)
    console.log("SEARCH: ", data);
    getData(data);
  };

  return (
    <TextField
      label="Search LCNAF"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="search"
              component="button"
              onClick={(e) => {
                console.log(value);
              }}
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
