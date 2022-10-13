import {
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Button
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import SearchLCNAF from "src/admin/components/bibframe/search_LCNAF"

export default function CreateWork() {
  const [type, setType] = useState("person");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "person",
      authority: "",
      relationship: ""
    },
  });

  const handleSearch = (data) => {
    setOpen(true)
    setSearch(data)
    console.log("SEARCH: ", data);
  };

  return (
    <Box bgcolor={grey[100]}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Creator of Work
        </Typography>
        <Stack spacing={1} sx={{ width: "20rem" }}>
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

            <Controller
              control={control}
              name="relationship"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Relationship Designator"
                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

           
          </form>
        </Stack>
        <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
        <SearchLCNAF open={open} setOpen={setOpen} search={search}/>
      </Box>
    </Box>
  );
}
