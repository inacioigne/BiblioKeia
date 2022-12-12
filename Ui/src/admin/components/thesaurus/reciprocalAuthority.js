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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  ListItemText,
  Pagination,
} from "@mui/material/";

// BiblioKeia Services
import ParserBK from "src/services/thesaurus/parser_bk";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";

export default function ReciprocalAuthority({ authoritys, setSubjectDetails}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          p: "0.5rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <Typography variant="subtitle2">Termo Relacionado:</Typography>
        <List dense={true}>
          {authoritys.map((reciprocalAuthority, index) => (
            <ListItem key={index}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  let token = reciprocalAuthority.uri.split("/")[5];

                  ParserLCSH(token, setSubjectDetails);
                }}
              >
                {reciprocalAuthority.label}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
