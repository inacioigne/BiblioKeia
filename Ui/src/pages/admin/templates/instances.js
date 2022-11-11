import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors/";
import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material/";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Title from "src/admin/components/bibframe/instances/title";
import InstancePreview from "src/admin/components/instance_preview";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

const metadados = ["Título"];

const styleItemMenunActive = {
  borderRadius: "5px",
  mx: "0.5rem",
  backgroundColor: grey[300],
  color: grey[900],
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

const styleItemMenun = {
  borderRadius: "5px",
  mx: "0.5rem",
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

export default function Instances() {
  const [visible, setVisible] = useState(0);
  const { work, instance, setInstances } = useBf();
  const router = useRouter();
  const { workid } = router.query;

  useEffect(() => {
    if (workid) {
      console.log("WID", workid);
      setInstances((prevState) => ({
        ...prevState,
        instanceOf: workid,
        mainTitle: work.mainTitle,
      }));
    } else {
      return;
      //console.log("WID else");
    }
  }, [workid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", instance);
   
    //router.push(`/admin/templates/instances?workid=${work.work_id}`);

    // CataloguingApi.post("work", work)
    //   .then((response) => {
    //     console.log("Api", response);
    //   })
    //   .catch(function (error) {
    //     console.log("ER", error);
    //   });
  };

  return (
    <Grid container>
      <Grid item xs={3} bgcolor={grey[900]} sx={{ color: "white", p: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          Instância
        </Typography>
        <MenuList>
          {metadados.map((metadata, index) => (
            <MenuItem
              key={index}
              sx={
                visible == index
                  ? {
                      ...styleItemMenunActive,
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(index);
              }}
            >
              <ListItemText>{metadata}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Grid>
      <Grid xs={5} bgcolor={grey[100]}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >

          {/* Content Type*/}
          <Box sx={visible === 0 ? { display: "block" } : { display: "none" }}>
            <Title />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: "2rem",
          }}
        >
          <Button variant="outlined" type="submit">
            Salvar e Adicionar Item
          </Button>
        </Box>
        </form>
      </Grid>
      <InstancePreview />
    </Grid>
  );
}
