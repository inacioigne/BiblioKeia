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
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

export default function Field({ id, fields, setFields }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log("data". data)

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="chamada"
          control={control}
          render={({ field }) => <TextField {...field} label="Chamada" />}
        />
      </form>
    </Box>
  );
  
}
