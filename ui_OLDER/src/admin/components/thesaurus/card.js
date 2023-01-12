<Card
sx={{
  width: "100%", //minWidth: 350,
}}
>
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
  <Box px={"1rem"}>
    <Typography
      pt={"10px"}
      variant="caption"
      display="block"
      gutterBottom
    >
      {subjectDetails?.note}
    </Typography>
    <Grid container spacing={2}>
      {/* variant */}
      {subjectDetails?.variant.length > 0 && (
        <Grid item xs={6}>
          <Box
            sx={{
              //...styleIformation,
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
        </Grid>
      )}

      {/* reciprocalAuthority */}
      {subjectDetails.reciprocalAuthority && (
        <Grid item xs={6}>
          <Box
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle2">
              Termo Relacionado:
            </Typography>
            <List dense={true}>
              {subjectDetails.reciprocalAuthority.map(
                (reciprocalAuthority, index) => (
                  <ListItem key={index}>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        let token =
                          reciprocalAuthority.uri.split(
                            "/"
                          )[5];

                        ParserLCSH(
                          token,
                          setSubjectDetails
                        );
                      }}
                    >
                      {reciprocalAuthority.label}
                    </Button>
                  </ListItem>
                )
              )}
            </List>
            <Typography variant="body1">
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => {
                  let token =
                    subjectDetails.reciprocalAuthority.uri.split(
                      "/"
                    )[5];
                  getDetails(token);
                }}
              >
                {subjectDetails.reciprocalAuthority.label}
              </Button>
            </Typography>
          </Box>
        </Grid>
      )}

      {/* broader Term */}
      {subjectDetails?.broader.length > 0 && (
        <Grid item xs={6}>
          <Broader
            setSubjectDetails={setSubjectDetails}
            authoritys={subjectDetails.broader}
          />
        </Grid>
      )}

      {/* narrower */}
      {subjectDetails?.narrower.length > 0 && (
        <Grid item xs={6}>
          <Narrower
            setSubjectDetails={setSubjectDetails}
            authoritys={subjectDetails.narrower}
          />
        </Grid>
      )}
    </Grid>
  </Box>
</CardContent>
</Card>