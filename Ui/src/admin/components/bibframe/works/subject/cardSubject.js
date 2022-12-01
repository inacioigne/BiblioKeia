import {
    TextField,
    Box,
    IconButton,
    InputAdornment,
    Dialog,
    DialogTitle,
    Typography,
    Divider,
    DialogContent,
    Grid,
    List,
    ListItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Tooltip,
    ListItemText,
    Pagination,
  } from "@mui/material/";

export default function CardSubject({subjectDetails}) {
    return (
        <Card sx={{ minWidth: 350, width: 450 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">
                            {subjectDetails?.authority}
                          </Typography>

                          <Tooltip title="Traduzir">
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={handleTranslate}
                            >
                              <TranslateIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Divider />
                        <Typography
                          pt={"10px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {subjectDetails?.note}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Variantes */}
                          {subjectDetails?.variant.length > 0 && (
                            <Box
                              sx={{
                                ...styleIformation,
                                flexDirection: "column",
                              }}
                            >
                              <Typography variant="subtitle2">
                                Variantes:
                              </Typography>
                              <List dense={true}>
                                {subjectDetails.variant.map(
                                  (variant, index) => (
                                    <ListItem key={index}>
                                      <ListItemText primary={variant} />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </Box>
                          )}
                          {/* Termo Relacionado */}
                          {subjectDetails?.reciprocalAuthority && (
                            <Box
                              sx={{
                                ...styleIformation,
                                flexDirection: "column",
                              }}
                            >
                              <Typography variant="subtitle2">
                                Termo Relacionado:
                              </Typography>
                              <Typography variant="body1">
                                <Button
                                  sx={{ textTransform: "none" }}
                                  onClick={() => {
                                    let token =
                                      uris.reciprocalAuthority.split("/")[5];
                                    //console.log(token);
                                    getDetails(token);
                                  }}
                                >
                                  {subjectDetails.reciprocalAuthority.label}
                                </Button>
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        {/* narrowerAuthorit */}
                        {subjectDetails?.narrower && (
                          <Box
                            sx={{ ...styleIformation, flexDirection: "column" }}
                          >
                            <Typography variant="subtitle2">
                              Termos Restritos:
                            </Typography>
                            <List dense={true}>
                              {subjectDetails.narrower.map(
                                (narrower, index) => (
                                  <ListItem key={index}>
                                    <Typography variant="body1">
                                      <Button
                                        sx={{ textTransform: "none" }}
                                        onClick={() => {
                                          let token =
                                            narrower.uri.split("/")[5];
                                          getDetails(token);
                                        }}
                                      >
                                        {narrower.label}
                                      </Button>
                                    </Typography>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        )}
                        {/* <code>{subjectDetails?.variant}</code> */}
                      </CardContent>
                    </Card>
    )
}