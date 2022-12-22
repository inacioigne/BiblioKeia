// MUI
import {
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material/";
import {
  LocalHospital,
  ChildFriendly,
  FileDownloadDone,
} from "@mui/icons-material";

export default function CardNamesBK({ nameDetails }) {
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{nameDetails?.name}</Typography>
          <Tooltip title="Escolher">
            <IconButton
              color="primary"
              component="label"
              //onClick={handleChoose}
            >
              <FileDownloadDone />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <Grid container spacing={2}>
          {/* fullerName */}
          {nameDetails?.fullerName && (
            <Grid item xs={6}>
              <Box pt="0.5rem">
                <Typography variant="subtitle2">Nome completo:</Typography>
                <Typography variant="body2">
                  {nameDetails?.fullerName}
                </Typography>
              </Box>
            </Grid>
          )}
          {/* variant */}
          {nameDetails?.variant && (
            <Grid item xs={6}>
              <Box
                sx={{
                  flexDirection: "column",
                  p: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="subtitle2">Variantes do nome:</Typography>
                <List dense={true}>
                {
                  nameDetails?.variant.map((variant, index) => (
                    <ListItem key={index}>
                    <ListItemText primary={variant} />
                    </ListItem>
                  ))
                }

                </List>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
