// MUI
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  MenuList,
  MenuItem,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material/";

import { blue, red } from "@mui/material/colors";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// BiblioKeia Components
import SearchSerie from "./searchSerie";

// BiblioKeia Services
import {SolrSerie} from "src/services/solr/searchSerie";

export default function Serie() {
  const [openMenu, setOpenMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [series, setSeries] = useState(null);
  const [open, setOpen] = useState(false);
  const [serieDetails, setSerieDetails] = useState(null);
  const [response, setResponse] = useState([]);

  const { work, setWork } = useBf();

  const handleChoose = () => {
    setDisabled(true);
    setOpen(false);
    setValue("");
    let [serie] = serieDetails.mainTitle
    setWork((prevState) => ({
      ...prevState,
      serie: serie,
      serieID: serieDetails.id,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    SolrSerie(value, setResponse);
    setOpen(true);

  };

  const inputPros = {
    disabled: disabled,
    startAdornment: work.serie && (
      <InputAdornment position="start">
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              borderRight: "solid 1px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              px: "5px",
              pt: "2px",
              backgroundColor: blue[200],
            }}
          >
            {work.serie}
          </Box>
          <Close
            sx={{
              fontSize: "25px",
              px: "5px",
              color: blue[800],
              backgroundColor: red[200],
              cursor: "pointer",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            onClick={(e) => {
              setDisabled(false);
              setWork((prevState) => ({
                ...prevState,
                serie: "",
              }));
            }}
          />
        </Typography>
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography variant="subtitle2" sx={{ pb: "1rem" }}>
        Série
      </Typography>
      <Box sx={{ px: "2rem", pb: "2rem" }}>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            //onClick={handleClick}
            onChange={(e) => {
              setValue(e.target.value);
              //GetType(e.target.value, setContentTypes);
            }}
            value={value}
            label="Série"
            InputProps={inputPros}
          />
          <SearchSerie
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            value={value}
            handleChoose={handleChoose}
            serieDetails={serieDetails}
            setSerieDetails={setSerieDetails}
            response={response}
            setResponse={setResponse}
          />
        </form>
      </Box>
    </Box>
  );
}
