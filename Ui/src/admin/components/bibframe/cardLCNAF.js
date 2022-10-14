import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import {LocalHospital, ChildFriendly} from '@mui/icons-material';


export default function CardLCNAF({ authorityDetails }) {
  const styleIformation = {
    p: "0.5rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      {/* <CardHeader>
        <Typography variant="h5">"a"{authorityDetails?.personalName}</Typography>
      </CardHeader> */}
      <CardContent>
        <Typography variant="h6">{authorityDetails?.personalName}</Typography>
        <Divider />
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2">Nome Completo:</Typography>
          <Typography variant="body1">
            {authorityDetails?.fullerName}
          </Typography>
        </Box>
        <Box sx={{display: 'flex'}}>
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2"><ChildFriendly /></Typography>
          <Typography variant="body2">{authorityDetails?.birthDate}</Typography>
        </Box>
        <Divider />
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2"><LocalHospital/></Typography>
          <Typography variant="body2">{authorityDetails?.deathDate}</Typography>
        </Box>

        </Box>
      
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2">Locais:</Typography>
          <Stack direction="row">
            {authorityDetails?.associatedLocales?.map((local, index) => (
              <Typography key={index} variant="body2">
                {local}
              </Typography>
            ))}
          </Stack>
        </Box>
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2">Área:</Typography>
          <Stack>
            {authorityDetails?.fieldOfActivity?.map((field, index) => (
              <Typography key={index} variant="body2">
                {field}
              </Typography>
            ))}
          </Stack>
        </Box>
        <Box sx={{ ...styleIformation }}>
          <Typography variant="subtitle2">Atuação:</Typography>
          <Stack>
            {authorityDetails?.occupations?.map((occupation, index) => (
              <Typography key={index} variant="body2">
                {occupation}
              </Typography>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
