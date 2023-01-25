// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Identifiers() {

  const { serie, setSerie } = useBf();

  const handleOnChangeCdd = (str) => {
    setSerie((prevState) => ({
      ...prevState,
      cdd: str,
    }));
  };

  const handleOnChangeISSN = (str) => {
    setSerie((prevState) => ({
      ...prevState,
      issn: str,
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        CDD, ISSN
      </Typography>

      <Box
        sx={{
          px: "2rem",
          pb: "2rem",
          display: "flex",
          //flexDirection: "column",
          gap: "1rem",
        }}
      >

         <TextField
          name="cdd"
          fullWidth
          onChange={(e) => {
            handleOnChangeCdd(e.target.value);
          }}
          value={serie.cdd}
          label="CDD"
        />
         <TextField
          //name="ISSN"
          fullWidth
          onChange={(e) => {
            handleOnChangeISSN(e.target.value);
          }}
          value={serie.issn}
          label="ISSN"
        />
      </Box>
    </Box>
  );
}
