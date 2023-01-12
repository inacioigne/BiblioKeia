// MUI
import { Box, List, ListItem, Button, Typography } from "@mui/material/";

// BiblioKeia Services
import ParserLCSH from "src/services/thesaurus/parser_lcsh";

// Styles
const styleIformation = {
  p: "0.5rem",
  display: "flex",
  gap: "0.5rem",
};

export default function Broader({ authoritys, setSubjectDetails }) {
  return (
    <Box sx={{ //...styleIformation, 
    flexDirection: "column" }}>
      <Typography variant="subtitle2">Termos Genéricos:</Typography>
      <List dense={true}>
        {authoritys.map((authority, index) => (
          <ListItem key={index}>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                let token = authority.uri.split("/")[5];
                console.log("N", token);
                ParserLCSH(token, setSubjectDetails);
              }}
            >
              {authority.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
