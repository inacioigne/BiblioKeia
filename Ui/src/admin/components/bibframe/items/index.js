import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  DialogActions,
  TextField,
  FormControl,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Field from "src/admin/components/bibframe/items/field"

export default function Items({ open, setOpen }) {
    const [fields, setFields] = useState([1]);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Items</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem"}}>
        {fields.map((field) => (
             <Field key={field} id={field} fields={fields} setFields={setFields} />
            ))}

        </Box>
        
        
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button 
        // onClick={() =>
        //         setFields(fields+1)
        //       }
        onClick={() => {setFields(prevState => [...prevState, fields.length+1])}}
              >Adicionar Item</Button>
        <Button onClick={handleClose}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
