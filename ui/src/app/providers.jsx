"use client";
// Mui
import { LinearProgress, Snackbar } from "@mui/material/";
import MuiAlert from "@mui/material/Alert";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { usePathname } from "next/navigation";

// React Hooks
import { useEffect, useState, forwardRef } from "react";

// BiblioKeia Hooks
import { useAlertBK } from "src/providers/alerts";

export default function Providers({ children }) {
  const { progress, setProgress } = useProgress();
  const pathname = usePathname();

  const {
    openSnack,
    setOpenSnack,
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlertBK();

  useEffect(() => {
    setProgress(false);
    //console.log("alert", openSnack)
  }, [pathname]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
      {/* {progress && <LinearProgress sx={{ zIndex: 2000 }} />} */}
      <LinearProgress sx={ progress ? { //position: "absolute", 
      zIndex: 2000 } : { display: "none" }  } />
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
        <Alert
          onClose={handleSnack}
          severity={typeAlert}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}