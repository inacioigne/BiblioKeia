import { Stack, Box, Container, Typography } from "@mui/material/";
import NavItems from "src/components/Navbar/NavItems";
import { grey, blueGrey } from "@mui/material/colors";

// React Hooks
import { createContext, useEffect, useState } from "react";

import Link from "next/link";

export default function Navbar({ mode }) {
  //console.log('Mode: ', mode)

  function setMode(mode) {
    if (mode == "dark") {
      return {
        backgroundColor: "black",
        color: "white",
      };
    } else if (mode == "light") {
      return {
        backgroundColor: "white",
      };
    }
  }

  const styleMode = setMode(mode);

  const styleModeItems = {
    cursor: "pointer"

  }


  // useEffect(() => {
  //   const styleMode = setMode(mode)
  //   console.log('SM', styleMode)

  // }, [])

  return (
    <Box
      sx={{
        ...styleMode,
        height: "5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "2rem",
      }}
    >
      <Box lineHeight={1} py={0.75} pl={1}>
        <Link href={`/`}>
          <Typography
            variant="button"
            fontWeight="bold"
            fontSize={15}
            color={"white"}
            sx={{...styleModeItems}}
          >
            Biblioteca do INPA
          </Typography>
        </Link>
      </Box>

      <Box sx={{ display: "flex", gap: "2rem", mr: "2rem" }}>
        <NavItems mode={"dark"} item={"Serviços"} />
        <NavItems mode={"dark"} item={"Cursos"} />
      </Box>
    </Box>
  );
}
