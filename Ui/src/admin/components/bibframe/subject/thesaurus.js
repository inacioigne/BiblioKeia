import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  // FormControl,
  // Select,
  // MenuItem,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Type from "./type";
import SearchSubject from "./searchSubject";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";
import CardSubject from "./cardSubject";
//import { Search, Close } from "@mui/icons-material";

export default function Thesaurus({
  open,
  setOpen,
  handleSearch,
  hits,
  setDisabled,
  setName,
  setType,
  type,
  setSubject,
  subject,
  disabled,
}) {
  const [subjectDetails, setSubjectDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = (token) => {
    //ParserJsonLd(token, setAuthorityDetails);
    ParserLCSH(token, setSubjectDetails);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Thesaurus LCSH</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid
            item
            xs={5} sx={{ borderRight: "solid 1px" }}
          >
            <form onSubmit={handleSearch}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  p: '1rem'
                }}
              >
                <Type setType={setType} type={type} />
                <SearchSubject
                  setSubject={setSubject}
                  subject={subject}
                  disabled={disabled}
                  handleSearch={handleSearch}
                />
              </Box>
            </form>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                mt: "0.5rem",
              }}
            >
              <i>Resultados:</i>
            </Typography>
            <List>
              {hits?.map((hit, index) => (
                <ListItem key={index} disablePadding>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      let token = hit.uri.split("/")[5];

                      getDetails(token);
                    }}
                  >
                    {" "}
                    {hit.aLabel}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              LC Subject Headings (LCSH)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CardSubject
                subjectDetails={subjectDetails}
                setSubjectDetails={setSubjectDetails}
                setDisabled={setDisabled}
                setOpen={setOpen}
                subject={subject}
                setSubject={setSubject}
                setName={setName}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
