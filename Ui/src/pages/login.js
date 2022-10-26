import { Container, Snackbar, Alert } from "@mui/material/";
import FormLogin from "src/admin/auth/formLogin";
import { useState, useContext } from "react";

export default function Login() {
    const [visible, setVisible] = useState(0);
    const [openSnack, setSnack] = useState({
        visible: false, 
        msg: null,
        severity: null,
        anchorOrigin: { vertical: 'top', horizontal: 'left' }
      })
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FormLogin 
      display={visible} 
      setVisible={setVisible} 
      alert={setSnack}
      />
    </Container>
  );
}
