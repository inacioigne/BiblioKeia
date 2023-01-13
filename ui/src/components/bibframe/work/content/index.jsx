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

// BiblioKeia Services
import GetType from "src/services/thesaurus/types";

export default function Content({ defaultType }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [contentTypes, setContentTypes] = useState(null);

  const { work, setWork } = useBf();

  useEffect(() => {
    setDisabled(true);
    setValue("");
    setWork((prevState) => ({
      ...prevState,
      contentType: defaultType,
    }));
  }, []);

  const inputPros = {
    disabled: disabled,
    startAdornment:
      work.contentType !== "" ? (
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
              {work.contentType}
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
                  contentType: "",
                }));
                let rect = e.currentTarget.getBoundingClientRect();
                setOpenMenu(rect.top + rect.height + 19);
              }}
            />
          </Typography>
        </InputAdornment>
      ) : null,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton color="primary" aria-label="search" component="button">
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  const handleClick = (e) => {
    if (disabled == false) {
      let rect = e.currentTarget.getBoundingClientRect();
      setOpenMenu(rect.top + rect.height);
      GetType("", setContentTypes);
    }
  };

  const handleCloseMenu = (relator) => {
    setOpenMenu(false);
    setDisabled(true);
    setValue("");
    setWork((prevState) => ({
      ...prevState,
      contentType: relator.target.innerText,
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Tipo
      </Typography>
      <Box sx={{ px: "2rem", pb: "2rem" }}>
        <TextField
          name="contentType"
          fullWidth
          onClick={handleClick}
          onChange={(e) => {
            setValue(e.target.value);
            GetType(e.target.value, setContentTypes);
          }}
          value={value}
          label="Conteúdo"
          InputProps={inputPros}
        />
        <Paper
          sx={
            openMenu
              ? {
                  display: "block",
                  position: "absolute",
                  zIndex: "100",
                  top: openMenu,
                }
              : { display: "none", position: "absolute", zIndex: "100" }
          }
        >
          <MenuList>
            {contentTypes &&
              contentTypes.map((type, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseMenu}
                  sx={{
                    borderRadius: "6px",
                    mx: "0.5rem",
                    pl: "0.5rem",
                    ":hover": { backgroundColor: blue[100] },
                  }}
                >
                  {type}
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      </Box>
    </Box>
  );
}
