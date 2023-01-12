<Card sx={{ minWidth: 350, width: "100%" }}>
<CardContent>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="h6">
      {subjectBK.authority}
    
    </Typography>
    {subjectBK.thesarus == "BKSH" ? (
      <Tooltip title="Escolher">
        <IconButton
          color="primary"
          component="label"
          onClick={handleChoose}
        >
          <FileDownloadDone />
        </IconButton>
      </Tooltip>
    ) : autorityBK ? (
    
         <Button
          onClick={() => {
            getThesarus(autorityBK);
          }}
        >
          BKSH
        </Button>

     
     
    ) : (
      <Tooltip title="Traduzir">
        <IconButton
          color="primary"
          component="label"
          onClick={() => {
            setOpenTranslate(true);
          }}
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
    )}
  </Box>
  <Divider />
  {/* variant */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {subjectBK.variant.length > 0 && (
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
          {subjectBK.variant.map((variant, index) => (
            <ListItem key={index}>
              <ListItemText primary={variant} />
            </ListItem>
          ))}
        </List>
      </Box>
    )}
    {/* reciprocalAuthority */}
    {subjectBK?.reciprocalAuthority && (
      <Box
        sx={{
          ...styleIformation,
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle2">
          Termo Relacionado:
        </Typography>
        <List dense={true}>
          {subjectBK?.reciprocalAuthority?.map(
            (reciprocalAuthority, index) => (
              <ListItem key={index}>
                <Badge
                  badgeContent={
                    reciprocalAuthority.collection
                  }
                  color="secondary"
                >
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      getThesarus(reciprocalAuthority.uri);
                      // let token =
                      //   reciprocalAuthority.uri.split(
                      //     "/"
                      //   )[5];
                      // ParserLCSH(token, setSubjectBK);
                    }}
                  >
                    {reciprocalAuthority.label}
                  </Button>
                </Badge>
              </ListItem>
            )
          )}
        </List>
      </Box>
    )}
  </Box>
  {/* narrower */}
  

  
  {subjectBK?.narrower && (
    <Box
      sx={{ ...styleIformation, flexDirection: "column" }}
    >
      <Typography variant="subtitle2">
        Termos Restritos:
      </Typography>
      <List dense={true}>
        {subjectBK.narrower.map((narrower, index) => (
          <ListItem key={index} >
            {/* <ListItemButton> */}
            <Badge
              badgeContent={narrower.collection}
              color="secondary"
            >
              <Button
                sx={{
                  textTransform: "none", //pb: "0.5rem"
                }}
                variant="outlined"
                onClick={() => {
                  let token = narrower.uri.split("/")[5];
                  //console.log(token);
                  ParserLCSH(token, setSubjectBK);
                }}
              >
                {narrower.label}
              </Button>
            </Badge>
            {/* </ListItemButton> */}
          </ListItem>
        ))}
      </List>
    </Box>
  )}
</CardContent>
</Card>