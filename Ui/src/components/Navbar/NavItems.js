import { grey, blueGrey } from "@mui/material/colors";
import { Popper, Fade, Toolbar, Typography, Box } from "@mui/material/";

import {
  LocalLibrary,
  KeyboardArrowDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material/";
import { useState } from "react";

// const NavItemsStyles = {
//   color: blueGrey[900],
//   //color: "white",
//   //fontSize: "1.5rem"
// };

const NavLinks = {
  py: 1,
  px: 2,
  borderRadius: 2,
  "&:hover": {
    backgroundColor: grey[300],
    cursor: "pointer",
  },

}

export default function NavItems({mode, item}) {

  function setMode(mode) {
    if (mode == "dark") {
      return {
        //backgroundColor: "black",
        color: "white",
      };
    } else if (mode == "light") {
      return {
        //backgroundColor: "white",
        color: blueGrey[900],
      };
    }
  }

  const styleMode = setMode(mode);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  return (
    <>
      <Box
        sx={{ alignItems: "center" }}
        display={"flex"}
        onMouseEnter={({ currentTarget }) => {
          setAnchorEl(currentTarget);
          setOpen((previousOpen) => !previousOpen);
        }}
        onMouseLeave={({ currentTarget }) => {
          setOpen((previousOpen) => !previousOpen);
        }}
      >
        <LocalLibrary
          sx={{
            ...styleMode,
            //fontSize: "1rem",
          }}
        />
        <Typography variant="subtitle2" sx={{ ...styleMode }}>
          {item}
        </Typography>
        <KeyboardArrowDownOutlined
          sx={{
            ...styleMode,
            //fontSize: "1rem",
          }}
        />
      </Box>
      <Popper
        onMouseEnter={({ currentTarget }) => {
          //setAnchorEl(currentTarget);
          setOpen((previousOpen) => !previousOpen);
        }}
        onMouseLeave={({ currentTarget }) => {
          setOpen((previousOpen) => !previousOpen);
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
            <Box 
            sx={{display: 'flex', justifyContent: 'center'}}
            >
              <ArrowDropUpOutlined
                sx={{
                  fontSize: "3rem",
                  color: "background.paper",
                  //ml: 5,
                }}
              />
              </Box>
              <Box
                mt={-3}
                p={3}
                sx={{
                  //bgcolor: "background.paper",
                  bgcolor: grey[100],
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{...NavLinks}}
                >
                  <Typography
                    variant="button"
                    fontWeight="bold"
                    fontSize={12}
                    color={blueGrey[900]}
                  >
                    Treinamentos
                  </Typography>
                </Box>
                <Box
                  sx={{...NavLinks}}
                >
                  <Typography
                    variant="button"
                    fontWeight="bold"
                    fontSize={12}
                    color={blueGrey[900]}
                  >
                    Ficha Catalogr??fica
                  </Typography>
                </Box>
                <Box
                   sx={{...NavLinks}}
                >
                  <Typography
                    variant="button"
                    fontWeight="bold"
                    fontSize={12}
                    color={blueGrey[900]}
                  >
                    Nada Consta
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
