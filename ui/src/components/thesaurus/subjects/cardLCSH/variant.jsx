// MUI
import {
    TextField,
    Box,
    IconButton,
    InputAdornment,
    Dialog,
    DialogTitle,
    Typography,
    Divider,
    DialogContent,
    Grid,
    List,
    ListItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Tooltip,
    ListItemText,
  } from "@mui/material/";
  
  export default function Variants({ authoritys }) {
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            p: "0.5rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Typography variant="subtitle2">Variantes:</Typography>
          <List dense={true}>
            {authoritys.map((variant, index) => (
              <ListItem key={index}>
                <ListItemText primary={variant.label} />
              </ListItem> 
            ))}
          </List>
        </Box>
      </Box>
    );
  }
  