import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Translate, FileDownloadDone } from "@mui/icons-material";
import { useState } from "react";
import TranslateSubject from "./translate";

export default function CardSubject({
  subjectDetails, 
  setSubjectDetails,
  setOpen,
  setDisabled,
  setName,
  setSubject,
  tokenLSCH,
  uris
}) {
  
  const [openTranslate, setOpenTranslate] = useState(false);
  const styleIformation = {
    p: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  };

  const handleChoose = () => {
    setDisabled(true);
    setOpen(false);
    setSubject("");
    setName(subjectDetails?.label);
  };

  if (subjectDetails) {
    
    return (
      <>
        <Card sx={{ minWidth: 350, width: 450 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{subjectDetails?.label}</Typography>
              <Box>
                <IconButton
                  color="primary"
                  component="label"
                  onClick={() => setOpenTranslate(true)}
                >
                  <Translate />
                </IconButton>

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
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
              {/* Variantes */}
            <Box sx={{ ...styleIformation, flexDirection: 'column' }}>
              <Typography variant="subtitle2">Variantes:</Typography>
              <Typography variant="body1">{subjectDetails?.variant}</Typography>
            </Box>
            {/* Termo Relacionado */}
            <Box sx={{ ...styleIformation, flexDirection: 'column' }}>
              <Typography variant="subtitle2">Termo Relacionado:</Typography>
              <Typography variant="body1">{subjectDetails?.reciprocalAuthority}</Typography>
            </Box>

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
        <TranslateSubject
          open={openTranslate}
          setOpen={setOpenTranslate}
          subjectDetails={subjectDetails}
          setSubjectDetails={setSubjectDetails} 
          tokenLSCH={tokenLSCH}
          uris={uris}
          
        />
      </>
    );
  } else {
    null;
  }
}
