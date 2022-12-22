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
import CardNamesBK from "src/admin/components/thesaurus/names/cardBK"
import QueryNamesBK from "src/services/thesaurus/names/query";

// React Hooks
import { useState } from "react";

export default function SearchBK({
  open,
  setOpen,
  type,
  setType,
  name,
  setName,
  response,
  setResponse
}) {

  const [nameDetails, setNameDetails] = useState(null);
  
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
          <Grid item xs={5} sx={{ borderRight: "solid 1px", pr: "1rem" }}>
            <Fields
              setOpen={setOpen}
              type={type}
              setType={setType}
              name={name}
              setName={setName}
              setResponse={setResponse}
            />
            {response.length > 0 ? (
              <>
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
                  {response.map((authority, index) => (
                    <ListItem key={index} disablePadding>
                      <Button
                        onClick={() => {
                          QueryNamesBK(authority.id, setNameDetails)
                        }}
                      >
                        {authority.name}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Box pt={"0.5rem"}>
                <i>Nenhum registro encontrado:</i>
                <Button
                  onClick={() => {
                    //setOpenLCSH(true);
                  }}
                >
                  Importar registros
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={7} sx={{ pl: "1rem"}}>
          <CardNamesBK nameDetails={nameDetails} />

          </Grid>
          
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
