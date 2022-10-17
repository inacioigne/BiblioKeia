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
  ListSubheader,
} from "@mui/material";
import {
  LocalHospital,
  ChildFriendly,
  FileDownloadDone,
} from "@mui/icons-material";

export default function CardLCNAF({ authorityDetails }) {
  const styleIformation = {
    p: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  };
  if (authorityDetails) {
    console.log(authorityDetails.associatedLocales.length);
    return (
      <Card sx={{ minWidth: 350 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              {authorityDetails?.personalName}
            </Typography>
            <IconButton color="primary" component="label">
              <FileDownloadDone />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ ...styleIformation }}>
            <Typography variant="subtitle2">Nome Completo:</Typography>
            <Typography variant="body1">
              {authorityDetails?.fullerName}
            </Typography>
          </Box>
          {/** Nascimento */}
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ ...styleIformation }}>
              <Typography variant="subtitle2">
                <ChildFriendly />
              </Typography>
              <Typography variant="body2">
                {authorityDetails?.birthPlace &&
                  `${authorityDetails.birthPlace}, `}{" "}
                {authorityDetails?.birthDate}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ ...styleIformation }}>
              <Typography variant="subtitle2">
                <LocalHospital />
              </Typography>
              <Typography variant="body2">
                {authorityDetails?.deathPlace &&
                  `${authorityDetails.deathPlace}, `}
                {authorityDetails?.deathDate}
              </Typography>
            </Box>
          </Box>
          {/* Locais */}
          {authorityDetails.associatedLocales.length !== 0 && (
            <Box sx={{ ...styleIformation }}>
              <Typography variant="subtitle2">Locais:</Typography>
              <Stack direction="row" spacing={1}>
                {authorityDetails?.associatedLocales?.map((local, index) => (
                  <Typography key={index} variant="body2">
                    {local}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}
          {/* Variants */}
          {authorityDetails.variants.length !== 0 && (
            <Box sx={{ ...styleIformation, flexDirection: "column" }}>
              <Typography variant="subtitle2">Variações do nome:</Typography>
              <List dense={true}>
                {authorityDetails.variants.map((variant, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={variant} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ display: "flex" }}>
            {/* Área */}
            {authorityDetails.fieldOfActivity.length !== 0 && (
              <Box sx={{ ...styleIformation, flexDirection: "column" }}>
                <Typography variant="subtitle2">Área:</Typography>
                <Stack>
                  {authorityDetails?.fieldOfActivity?.map((field, index) => (
                    <Typography key={index} variant="body2">
                      {field}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
            {/* Atuação */}
            {authorityDetails.occupations.length !== 0 && (
              <Box sx={{ ...styleIformation, flexDirection: "column" }}>
                <Typography variant="subtitle2">Atuação:</Typography>
                <List dense={true}>
                  {authorityDetails.occupations.map((occupation, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={occupation} />
                    </ListItem>
                  ))}
                </List>
                {/* <Stack>
                {authorityDetails?.occupations?.map((occupation, index) => (
                  <Typography key={index} variant="body2">
                    {occupation}
                  </Typography>
                ))}
              </Stack> */}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    null;
  }
}
