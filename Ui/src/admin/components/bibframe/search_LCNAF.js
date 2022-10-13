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
//import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";

export default function SearchLCNAF({
  open,
  setOpen,
  search,
  control,
  handleSearch,
  handleSubmit,
  hits,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const getDetails = (token) => {
    api
      .get(`${token}.madsrdf_raw.jsonld`)
      .then((response) => {
        console.log("getDetails: ", response);
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  };

  //const fetcher = new SparqlEndpointFetcher();

  // async function getData() {
  //   const bindingsStream = await fetcher.fetchBindings(
  //     "http://localhost:3030/bibframe",
  //     "SELECT * WHERE{ GRAPH ?g {?s ?p ?name } } LIMIT 10"
  //   );
  //   bindingsStream.on("data", (bindings) => console.log(bindings));
  // }



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
                <ListItem disablePadding>
                  <Button
                    key={index}
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      let token = hit.uri.split("/")[5];
                      console.log("Dateais", token);
                      getData()
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
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
