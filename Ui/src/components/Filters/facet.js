import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { indigo } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Facet({
  subject,
  facetSuject,
  control,
  state,
  setState,
}) {
  //const [state, setState] = useState([])
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom sx={{ color: indigo[500] }}>
          {subject}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />

        <Stack spacing={1}>
          {facetSuject?.map((termo, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              {/* <Controller
                //name="checkbox"
                name={`${subject}.${termo}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Checkbox {...field} />}
              /> */}

              <Checkbox
                
                onChange={(event) => {
                  if (event.target.checked) {
                    setState((state) => [...state, event.target.value]);
                  } else {
                    setState(
                      state.filter(function (e) {
                        return e !== event.target.value;
                      })
                    );
                  }
              
                }}
                value={termo.val}
                name="assunto"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {termo.val}
                </Typography>
                <Typography
                  variant="button"
                  //display="block"
                  gutterBottom
                  sx={{
                    backgroundColor: indigo[300],
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    mt: 1,
                    height: "30px",
                    borderRadius: "5px",
                  }}
                >
                  {termo.count}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
