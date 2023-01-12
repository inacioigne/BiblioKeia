// MUI
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  Typography,
  Divider,
  DialogContent,
  Grid,
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Tooltip,
  ListItemText,
  Badge,
} from "@mui/material/";

// BiblioKeia Services
import ParserLCSH from "src/services/thesaurus/parser_lcsh";

export default function Narrower({ authoritys, setSubjectDetails }) {
  return (
    <Box
      sx={{
        //...styleIformation,
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle2">Termos Específicos:</Typography>
      <List dense={true}>
        {authoritys.map((authority, index) => (
          <ListItem key={index} sx={{ pb: "1rem" }}>
            <Badge badgeContent={authority.collection} color="secondary">
              <Button
                variant="outlined"
                size="small"
                sx={{ 
                  textTransform: "none", 
                textAlign: "left",
                wordBreak: "break-word"
                 }}
                onClick={() => {
                  let token = authority.uri.split("/")[5];
                  console.log("N", token);
                  ParserLCSH(token, setSubjectDetails);
                }}
              >
                {authority.label}
              </Button>
            </Badge>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
