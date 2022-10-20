import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  LocalHospital,
  ChildFriendly,
  FileDownloadDone,
} from "@mui/icons-material";

export default function CardSubject({
  subjectDetails,
  setOpen,
  setValue,
  setDisabled,
  //setName,
  subject,
  setSubject
}) {
  const styleIformation = {
    p: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  };

  const handleChoose = () => {
    //console.log("ok", authorityDetails?.personalName);
    setDisabled(true);
    setOpen(false);
    setSubject(subjectDetails?.label);
    //setValue(subjectDetails?.label);
  };

  if (subjectDetails) {
    return (
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{subjectDetails?.label}</Typography>
              <Tooltip title="Escolher">
                <IconButton
                  color="primary"
                  component="label"
                  onClick={handleChoose}
                >
                  <FileDownloadDone />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />
            <Box sx={{ ...styleIformation }}>
              <Typography variant="subtitle2">Variantes:</Typography>
              <Typography variant="body1">{subjectDetails?.variant}</Typography>
            </Box>
            {/* narrowerAuthorit */}
            {subjectDetails?.narrowerAuthority?.length !== 0 && (
              <Box sx={{ ...styleIformation, flexDirection: "column" }}>
                <Typography variant="subtitle2">Termos Restritos:</Typography>
                <List dense={true}>
                  {subjectDetails?.narrowerAuthority.map(
                    (narrowerAuthorit, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={narrowerAuthorit} />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>
      );

  } else {
    null;
  }

}
