// MUI
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogContent,
  TextField,
  Box,
  DialogActions,
  ListItem,
  Button,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { api } from "src/services/api/api";

// react-hook-form
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// React Hook
import { useEffect, useState } from "react";

export default function Item({ open, setOpen }) {
  const { work, setInstances } = useBf();
  const [identifier, setIdentifier] = useState("");

  const myFunction = async () => {
    let register = await api.get("/items/next_id").then((response) => {
      setIdentifier(response.data.id);
      return response.data.id;
    });
    console.log(register);
  };

  useEffect(() => {
    myFunction();
  });

  const handleClose = () => {
    setOpen(false);
  };

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      item: [
        {
          library: "Biblioteca do INPA",
          call: `${work.cdd} ${work.cutter}`,
          identifier: identifier,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const onSubmit = (data) => console.log("data", data);

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="div">Items</Typography>
        {identifier}
        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {fields.map((field, index) => (
            <ListItem key={field.id}>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Controller
                  name={`item.${index}.library`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Biblioteca" {...field} />
                  )}
                />
                <Controller
                  name={`item.${index}.call`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Chamada" {...field} />
                  )}
                />

                <Controller
                  name={`item.${index}.identifier`}
                  control={control}
                  defaultValue={identifier}
                  render={({ field }) => (
                    <TextField label="Registro" {...field} />
                  )}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue={() => {return "res"}}
                />
              </Box>
              <IconButton
                color="primary"
                onClick={() => {
                  remove(index);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  append({
                    library: "Biblioteca do INPA",
                    call: "",
                    identifier: "",
                  });
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItem>
          ))}
        </DialogContent>
        <DialogActions>
          <Button type="submit">Salvar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
