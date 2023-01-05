import { Box, Button } from "@mui/material";
import { useColorMode } from "src/providers/mode"

export default function Mode() {
    const { toggleColorMode } = useColorMode()
 
    
  return (
    <Box sx={{ border: "solid", height: 500, width: 500, bgcolor: "background.sideBar" }}>
      MODE
      <Button onClick={() => toggleColorMode()}>TEMA</Button>
    </Box>
  );
}
