// Material UI
import {
  Typography,
  Divider,
} from "@mui/material/";

const Notes = ({notes, styleText}) => {

  if (notes) {
    return (
      <>
        <Typography mt={3} variant="subtitle2" gutterBottom>
          Notas:
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            ...styleText,
          }}
        >
          {notes}
        </Typography>
      </>
    );

  } else {
    return null
  }


  
};


export default Notes;