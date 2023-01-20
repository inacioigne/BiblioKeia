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
import { useAlertBK } from "src/providers/alerts";

// React Hook
import { useEffect, useState } from "react";

export default function Item({ open, setOpen }) {
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();
  const { work, instance, setInstances } = useBf();
  const [identifier, setIdentifier] = useState(null);

  const [inputs, setInput] = useState([]);

  function generateID(identifier, index) {
    let ex = identifier[index];

    let id = ex.item.split("-");
    let count = parseInt(id[2]);
    let next = count + 1;
    let newId = {
      library: "Biblioteca do INPA",
      call: "542.6 F452a",
      shelf: "E1.P1",
      item: `bk-${id[1]}-${next}`,
    };
    setIdentifier((prevState) => [...prevState, newId]);
    console.log(next);
  }
  function handleRemove(identifier, index) {
    let newItems = identifier.filter((_, i) => {
      return i !== index;
    });
    setIdentifier(newItems);
    //console.log(newItems);
  }

  useEffect(() => {
    api.get("/items/next_id").then((response) => {
      console.log(response);
      setIdentifier([
        {
          library: "Biblioteca do INPA",
          call: "542.6 F452a",
          shelf: "E1.P1",
          item: response.data.id,
        },
      ]);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalve = () => {
    const data = {
      itemOf: instance.instanceOf,
      items: identifier,
    };

    api.post("/cataloguing/items", data).then((response) => {
      //console.log(response);
      if (response.status == 201) {
        setTypeAlert("success");
        setMessage("Itens salvo com sucesso!");
        setOpenSnack(true);
      } else {
        setTypeAlert("error");
        setMessage("Algo deu errado!");
        setOpenSnack(true);
      }
      setOpen(false);
    });
  };

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="div">Items</Typography>

        <IconButton color="primary" component="label" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form //onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          {identifier?.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", rowGap: "1rem", pb: "1rem" }}
            >
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <TextField
                  sx={{ width: 180 }}
                  required
                  label="Biblioteca"
                  defaultValue={item.library}
                />

                <TextField
                  sx={{ width: 150 }}
                  required
                  label="Chamada"
                  defaultValue={item.call}
                />

                <TextField
                  sx={{ width: 150 }}
                  required
                  label="Localização"
                  defaultValue={item.shelf}
                />

                <TextField
                  sx={{ width: 150 }}
                  required
                  label="Registro"
                  defaultValue={item.item}
                />
              </Box>

              <IconButton
                color="primary"
                onClick={() => {
                  handleRemove(identifier, index);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  generateID(identifier, index);
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSalve}>Salvar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
