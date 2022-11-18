import { Box, Typography, Paper, IconButton, Button } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import SubjectField from "./subject";
import { useState } from "react";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

export default function Subject({ listSubject, SetListSubject }) {
  const [fields, setFields] = useState(1);
  return (
    <Box bgcolor={grey[100]}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Assunto
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", 
              rowGap: "1rem",
            }}
          >
            {[...Array(fields).keys()].map((field) => (
              <Box key={field} sx={{ display: "flex" }}>
                <SubjectField
                  listSubject={listSubject}  
                  SetListSubject={SetListSubject}
                />
               
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                setFields(fields+1)
              }
            >
              Mais Assuntos
            </Button>
            
          </Box>
        </Paper>
        
      </Box>
    </Box>
  );
}
