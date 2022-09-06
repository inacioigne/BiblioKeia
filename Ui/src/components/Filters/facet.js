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

export default function Facet({ subject, facetSuject, control }) {
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
          {facetSuject?.map((suject, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              <Controller
                name="checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Checkbox {...field} />}
              />
              {/* 

             <Checkbox /> */}
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
                  {suject.val}
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
                  {suject.count}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
