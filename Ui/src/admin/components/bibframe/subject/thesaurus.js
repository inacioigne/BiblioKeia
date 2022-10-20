import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  Stack,
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

export default function Thesaurus({
  open,
  setOpen,
  search,
  name,
  handleSearch,
  hits,
  setValue,
  setDisabled,
  setName,
  setType,
  type,
  setSubject,
  subject,
  disabled,
}) {
  const [authorityDetails, setAuthorityDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = (token) => {
    //ParserJsonLd(token, setAuthorityDetails);
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
          <Grid item xs={6} //sx={{ borderRight: "solid 1px" }}
          >
            <form onSubmit={handleSearch}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
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
                      console.log(token)
                      //getDetails(token);
                    }}
                  >
                    {" "}
                    {hit.aLabel}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              LC Name Authority File (LCNAF)
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
