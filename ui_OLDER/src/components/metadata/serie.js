// Material UI
import {
    Typography,
    Button,
    Divider,
  } from "@mui/material/";

import { useRouter } from "next/router";
  
  const Serie = ({serie, numSerie, styleText}) => {
    const router = useRouter();
  
    if (serie) {
      return (
        <>
          <Typography mt={3} variant="subtitle2" gutterBottom>
          Série:
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              ...styleText,
            }}
          >
            <Button 
            sx={{textTransform: 'none'}}
            onClick={() => {
              router.push(`/search?q=serie_str:"${serie}"`);
            }}
            > {serie}, </Button>
           {numSerie}
          </Typography>
        </>
      );
  
    } else { 
      return null
    }
  
  
    
  };
  
  
  export default Serie;