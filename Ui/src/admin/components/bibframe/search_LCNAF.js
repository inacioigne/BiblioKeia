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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Search } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { api } from "src/services/lcnfa";
import ParserJsonLd from "src/services/parser_jsonld";
import { useState } from "react";
import CardLCNAF from 'src/admin/components/bibframe/cardLCNAF'

export default function SearchLCNAF({
  open,
  setOpen,
  search,
  control,
  handleSearch,
  handleSubmit,
  hits,
}) {

  const [authorityDetails, setAuthorityDetails] = useState(null)

  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = (token) => {
    //console.log("Dateais", token);
    ParserJsonLd(token, setAuthorityDetails);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose}>
      <DialogTitle>Search LCNAF: {search?.authority}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid xs={5} sx={{ borderRight: "solid" }}>
            <form onSubmit={handleSubmit(handleSearch)}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="type">Tipo</InputLabel>
                    <Select {...field} label="Tipo">
                      <MenuItem value={"person"}>Person</MenuItem>
                      <MenuItem value={"family"}>Family</MenuItem>
                      <MenuItem value={"corporate"}>Corporate</MenuItem>
                      <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
                      <MenuItem value={"conference"}>Conference</MenuItem>
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
                    defaultValue={search?.authority}
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
            </form>
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
          <Grid xs={7}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              LC Name Authority File (LCNAF)
            </Typography>
            <CardLCNAF authorityDetails={authorityDetails}/>
         
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
