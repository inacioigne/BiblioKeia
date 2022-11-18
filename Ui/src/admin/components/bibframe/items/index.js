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
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Field from "src/admin/components/bibframe/items/field";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

export default function Items({ open, setOpen }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ callnumber: "", location: "", register: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = (data) => console.log("data", data);

  const handleClose = () => {
    //setOpen(false);
    handleSubmit(onSubmit);
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
         
            {fields.map((item, index) => (
              <Box key={item.id} sx={{ display: "flex", gap: "1rem" }}>
                <Controller
                  name={`items.${index}.callnumber`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Chamada" />
                  )}
                />
                <Controller
                  name={`items.${index}.location`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Localização" />
                  )}
                />

                <Controller
                  name={`items.${index}.register`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Registro" />
                  )}
                />
                <IconButton onClick={() => remove(index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
       
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
    
          onClick={() => {
            append({ callnumber: "", location: "", register: "" });
          }}
        >
          Adicionar Item
        </Button>
        <Button //onClick={handleClose}
          onClick={handleSubmit(onSubmit)}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
