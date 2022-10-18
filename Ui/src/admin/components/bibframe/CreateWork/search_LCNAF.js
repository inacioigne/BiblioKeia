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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Search } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "src/services/lcnfa";
import ParserJsonLd from "src/services/parser_jsonld";
import { useState } from "react";
import CardLCNAF from "src/admin/components/bibframe/CreateWork/cardLCNAF";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchLCNAF({
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
  type
}) {
  const [authorityDetails, setAuthorityDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = (token) => {
    ParserJsonLd(token, setAuthorityDetails);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Search LCNAF: {search?.authority}</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid xs={6} sx={{ borderRight: "solid 1px" }}>
            <form onSubmit={handleSearch}>
              <FormControl >
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                  label="Tipo"
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  value={type}
                >
                  <MenuItem value={"PersonalName"}>Person</MenuItem>
                  <MenuItem value={"family"}>Family</MenuItem>
                  <MenuItem value={"CorporateName"}>Corporate</MenuItem>
                  <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
                  <MenuItem value={"conference"}>Conference</MenuItem>
                  <MenuItem value={"NameTitle"}>Name Title</MenuItem>
                </Select>
              </FormControl>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                label="Search LCNAF"
                InputProps={{
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
                }}
              />
            </form>
            {/* <form onSubmit={handleSubmit(handleSearch)}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="type">Tipo</InputLabel>
                    <Select {...field} label="Tipo">
                      <MenuItem value={"PersonalName"}>Person</MenuItem>
                      <MenuItem value={"family"}>Family</MenuItem>
                      <MenuItem value={"CorporateName"}>Corporate</MenuItem>
                      <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
                      <MenuItem value={"conference"}>Conference</MenuItem>
                      <MenuItem value={"NameTitle"}>Name Title</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="authority"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    //value={search?.authority}
                    //defaultValue={search?.authority}
                    label="Search LCNAF"
                    InputProps={{
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
                    }}
                  />
                )}
              />
            </form> */}
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                //textAlign: "center",
                mt: "0.5rem",
              }}
            >
              Resultados:
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
          {/* <Divider orientation="vertical"/> */}
          <Grid xs={6}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              LC Name Authority File (LCNAF)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CardLCNAF
                authorityDetails={authorityDetails}
                setOpen={setOpen}
                setValue={setValue}
                setDisabled={setDisabled}
                setName={setName}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
