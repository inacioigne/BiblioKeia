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
import { useProgress } from "src/providers/progress";

// React Hook
import { useEffect, useState } from "react";

// Next Hooks
import { useRouter } from "next/navigation";

export default function Item({ open, setOpen, instance_id }) {

  const router = useRouter();

  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();
  const { work, instance, setInstances } = useBf();
  const { setProgress } = useProgress();

  const [identifier, setIdentifier] = useState(null);

  // const [inputs, setInput] = useState([]);

  function generateID(identifier, index) {
    let ex = identifier[index];

    let id = ex.item.split("-");
    let count = parseInt(id[1]);
    let next = count + 1;
    let newId = {
      library: "Biblioteca do INPA",
      call: "542.6 F452a",
      shelf: "E1.P1",
      item: `bk-${next}`,
    };
    setIdentifier((prevState) => [...prevState, newId]);
    //console.log(next);
  }
  function handleRemove(identifier, index) {
    let newItems = identifier.filter((_, i) => {
      return i !== index;
    });
    setIdentifier(newItems);
  }

  useEffect(() => {
    if (instance.instance_id) {
      //let count = instance_id.split("-")[1];
      let count = instance.instance_id.split("-")[1];
      let id = parseInt(count) + 1;
      setIdentifier([
        {
          library: "Biblioteca do INPA",
          call: "542.6 F452a",
          shelf: "E1.P1",
          item: `bk-${id}`,
        },
      ]);
    }
  }, [instance.instance_id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalve = () => {
    console.log(work)
    setProgress(true);
    const data = {
      itemOf: instance.instance_id,
      items: identifier,
    };

    api.post("/cataloguing/items", data).then((response) => {
      
      if (response.status == 201) {
        setTypeAlert("success");
        setMessage("Itens salvo com sucesso!");
        setOpenSnack(true);

        router.push(`/admin/acervo/work/${instance.instanceOf}`); 
        
      } else {
        setTypeAlert("error");
        setMessage("Algo deu errado!");
        setOpenSnack(true);
      }
      setProgress(false);
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
      <form 
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
