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
  // return (
  //   <FormControl
  //     sx={{
  //       display: "flex",
  //       flexDirection: "row",
  //       gap: "1rem",
  //       columnGap: "1rem",
  //     }}
  //   >
  //     {id}
  //     <TextField
  //       //onChange={handleOnChangeSeries}
  //       //value={instance.series}
  //       //fullWidth
  //       label="Chamada"
  //     />
  //     <TextField
  //       //onChange={handleOnChangeSeries}
  //       //value={instance.series}
  //       //fullWidth
  //       label="Localização"
  //     />
  //     <TextField
  //       //onChange={handleOnChangeSeries}
  //       //value={instance.series}
  //       //fullWidth
  //       label="Número"
  //     />
  //     <IconButton
  //       id={id}
  //       onClick={() => {
  //         const f = fields.filter((e) => {
  //           return e !== id;
  //         });
  //         setFields(fields.filter((e) => {
  //           return e !== id;
  //         }));

  //         console.log(f);
  //       }}
  //     >
  //       <RemoveIcon />
  //     </IconButton>
  //   </FormControl>
  // );
}
