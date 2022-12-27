import MuiAlert from "@mui/material/Alert";
// MUI
import { Snackbar } from "@mui/material";

import { useEffect, forwardRef } from "react";

// BiblioKeia Hooks
import { useAlertBK } from "src/providers/alerts";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBK({ open, setOpen, message, typeAlert }) {
  const handleSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleSnack}>
      <Alert onClose={handleSnack} severity={typeAlert} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
