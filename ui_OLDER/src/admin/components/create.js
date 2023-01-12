import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  IconButton,
} from "@mui/material/";
import { AutoStories } from "@mui/icons-material/";
import { grey } from "@mui/material/colors/";
// Next Components
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();
  return (
    <Box p={"1rem"} bgcolor={grey[100]}>
      <Typography variant="h4">Adicionar um novo registro</Typography>
      <Divider />
      <Box mt={"1rem"}>
        <Typography variant="h6">Templates</Typography>
        <Card sx={{ maxWidth: 200, mt: "0.5rem" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Momografia</Typography>
            <IconButton
              color="primary"
              aria-label="book"
              onClick={() => {
                router.replace("/admin/templates/monograph");
              }}
            >
              <AutoStories
                sx={{
                  fontSize: "3rem",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
