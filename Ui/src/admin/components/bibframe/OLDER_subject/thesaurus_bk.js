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
  Grid,
} from "@mui/material";

export default function ThesaurusBK({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      ThesaurusBK
    </Dialog>
  );
}
