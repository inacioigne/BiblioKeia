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
  Divider

} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Search } from "@mui/icons-material";

export default function SearchLCNAF({ open, setOpen, search }) {
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "person",
      authority: "",
      relationship: "",
    },
  });

  const handleSearch = (data) => {
    console.log("SEARCH: ", data);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose}>
      <DialogTitle>Search LCNAF: {search?.authority}</DialogTitle>
      <Divider />
      <DialogContent>
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
                value={search?.authority}
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
      </DialogContent>
    </Dialog>
  );
}
