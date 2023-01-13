"use client";
// MUI Components
import MuiDrawer from "@mui/material/Drawer";
import {
  AppBar,
  Divider,
  Box,
  Toolbar,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  LinearProgress,
} from "@mui/material/";

// MUI Icons
import {
  LocalLibrary,
  DashboardCustomize,
  Home,
} from "@mui/icons-material/";

// MUI Styles
import { styled } from "@mui/material/styles";

// Next Components
import Link from "next/link";

// MUI Colors
import { blue } from "@mui/material/colors";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "60px",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ open }) {
  const { initProgress } = useProgress();
  return (
    <Drawer variant="permanent" open={open}>
      <Box
        sx={{
          minHeight: "60px",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: "16px",
          fontWeight: 600,
        }}
      >
        <LocalLibrary color="primary" sx={{ fontSize: 35 }} />
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 0, mt: "0.5rem", fontWeight: 600 }}
        >
          BiblioKeia
        </Typography>
      </Box>
      <MenuList>
        <Link href="/admin">
          <MenuItem
            sx={{
              borderRadius: "6px",
              mx: "0.5rem",
              pl: "0.5rem",
              ":hover": { backgroundColor: "hover.background" },
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  lineHeight: 1.3,
                  ml: "0.5rem",
                }}
              >
                Inicio
              </Typography>
            </ListItemText>
          </MenuItem>
        </Link>
        <Link href="/admin/cataloguing">
                <MenuItem
                  sx={{
                    borderRadius: "6px",
                    mx: "0.5rem",
                    pl: "0.5rem",
                    ":hover": { backgroundColor: "hover.background" },
                  }}
                  onClick={initProgress}
                >
                  <ListItemIcon>
                    <DashboardCustomize />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 400,
                        fontSize: "0.9rem",
                        lineHeight: 1.3,
                        ml: "0.5rem",
                      }}
                    >
                      Catalogação
                    </Typography>
                  </ListItemText>
                </MenuItem>
              </Link>
      </MenuList>
    </Drawer>
  );
}
