// Material UI
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
  Button,
  List,
  ListItem,
  Box,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Fields from "src/admin/components/thesaurus/names/fields";

export default function SearchBK({
  open,
  setOpen,
  type,
  setType,
  name,
  setName,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="div">Nomes BK</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid xs={6} sx={{ borderRight: "solid 1px" }}>
            <Fields
              setOpen={setOpen}
              type={type}
              setType={setType}
              name={name}
              setName={setName}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
