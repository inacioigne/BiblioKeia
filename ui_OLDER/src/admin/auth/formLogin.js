import {
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  Avatar,
  Button,
  Snackbar,
  Alert,
} from "@mui/material/";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { red } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useContext, useState } from "react";
import { AuthContext } from "src/admin/auth/authContext";

export default function FormLogin({ display, setVisible, alert }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signIn } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSignIn(data) {
    setLoading(!loading);
    try {
      await signIn(data);
    } catch (error) {
        console.log('LG:', error)

      setLoading(false);

      if (error.response.status === 401) {
        setOpen(true);
      }
    }
  }
  return (
    <>
      <Card sx={display === 0 ? { minWidth: 400 } : { display: "none" }}>
        <CardHeader
          action={
            <Avatar
              onClick={() => {
                setVisible(1);
              }}
              sx={{ bgcolor: red[500], cursor: "pointer" }}
            >
              <GroupAddIcon />
            </Avatar>
          }
        />
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          borderLeft={5}
          borderColor="secondary.main"
          pl={5}
        >
          BiblioKeia
        </Typography>
        <Box pl={5} pr={5}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Email" variant="standard" />
                )}
              />
              {errors.username?.type === "required" &&
                "Entre com o nome de usuário"}
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Senha" variant="standard" />
                )}
              />
              {errors.password && "Você esqueceu a senha"}
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                mt={3}
                mb={3}
              >
                <LoadingButton
                  onClick={handleSubmit(handleSignIn)}
                  loading={loading}
                  variant="outlined"
                  sx={{ width: "15rem" }}
                >
                  Login
                </LoadingButton>
              </Box>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            mb={5}
          >
            <Typography variant="subtitle1" gutterBottom component="div">
              Esqueceu a senha?
            </Typography>
            <Button
              size="small"
              style={{
                textTransform: "none",
              }}
              onClick={() => {
                setVisible(1);
              }}
            >
              <Typography variant="subtitle1" gutterBottom component="div">
                Cadastre-se
              </Typography>
            </Button>
          </Box>
        </Box>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        //message="Note archived"
        //action={action}
      >
        <Alert severity="error">Usuário ou email incorretos</Alert>
      </Snackbar>
    </>
  );
}
