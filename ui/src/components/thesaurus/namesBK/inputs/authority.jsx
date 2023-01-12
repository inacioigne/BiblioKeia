// Material UI
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Authority({ value, setValue, disabled, setDisabled }) {
  const { work, setWork } = useBf();

  const inputPros = {
    disabled: disabled,
    startAdornment:
      work.contributionAgent !== "" ? (
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
              {work.contributionAgent}
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
              onClick={() => {
                setDisabled(false);
                setWork((prevState) => ({
                  ...prevState,
                  contributionAgent: "",
                }));
              }}
            />
          </Typography>
        </InputAdornment>
      ) : null,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          type="submit"
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };
  return (
    <TextField
      name="authority"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      fullWidth
      label="Autor"
      InputProps={inputPros}
    />
  );
}
