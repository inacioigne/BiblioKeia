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
import ParserLCSH from "src/services/thesaurus/subjects/parserLCSH";
import ParserBK from "src/services/thesaurus/subjects/parserBK";



export default function Authorities({ label, authorities, setSubjectDetails }) {

  const getThesarus = (uri) => {
    //console.log(uri)
    let uris = uri.split("/");
    let thesarus = uris[2];
    let token = uris[5];
    if (thesarus == "bibliokeia.com") {
      //console.log(thesarus, uri);
      ParserBK(uri, setSubjectDetails);
    } else {
      //console.log(thesarus, token);
      ParserLCSH(token, setSubjectDetails);
    }
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle2">{label}:</Typography>
      <List dense={true}>
        {authorities.map((authority, index) => (
          <ListItem key={index} sx={{ pb: "1rem" }}>
            <Badge
              badgeContent={authority.collection}
              color={authority.collection == "LCSH" ? "secondary" : "success"}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}
                onClick={() => {
                  //let token = authority.uri.split("/")[5];
                  //console.log("N", authority.uri);
                  getThesarus(authority.uri)
                  //ParserLCSH(token, setSubjectDetails);
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
