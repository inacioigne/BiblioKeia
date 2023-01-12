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
import Extent from "src/admin/components/bibframe/instances/extent";
import ProvisionActivity from "src/admin/components/bibframe/instances/provisionActivity";
import Responsibility from "src/admin/components/bibframe/instances/responsibilityStatement";
import Series from "src/admin/components/bibframe/instances/series";
import Items from "src/admin/components/bibframe/items"
import InstancePreview from "src/admin/components/instance_preview";
import { api } from "src/services/api";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

const metadados = ["Título", "Extensão", "Publicação", "Responsabilides", "Série"];

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
  const [openItem, setOpenItem] = useState(false)

  useEffect(() => {
    if (workid) {
      //console.log("WID", workid);
      setInstances((prevState) => ({
        ...prevState,
        instanceOf: workid,
        mainTitle: work.mainTitle,
        subtitle: work.subtitle,
      }));
    } else {
      return;
      //console.log("WID else");
    }
  }, [workid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", instance);
    setOpenItem(true)
    // api
    //   .post("/cataloguing/instance", instance)
    //   .then((response) => {
    //     console.log("Api", response);
    //   })
    //   .catch(function (error) {
    //     console.log("ER", error);
    //   });

    //router.push(`/admin/templates/instances?workid=${work.work_id}`);
  };

  return (
    <>
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
            {/* Content Title */}
            <Box
              sx={visible === 0 ? { display: "block" } : { display: "none" }}
            >
              <Title />
            </Box>
            {/* Content Extensão */}
            <Box
              sx={visible === 1 ? { display: "block" } : { display: "none" }}
            >
              <Extent />
            </Box>
            {/* ProvisionActivity */}
            <Box
              sx={visible === 2 ? { display: "block" } : { display: "none" }}
            >
              <ProvisionActivity />
            </Box>
            {/* Responsibility */}
            <Box
              sx={visible === 3 ? { display: "block" } : { display: "none" }}
            >
              <Responsibility />
            </Box>
            {/* Series */}
            <Box
              sx={visible === 4 ? { display: "block" } : { display: "none" }}
            >
              <Series />
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
    <Items open={openItem} setOpen={setOpenItem} />
    </>
    
  );
} 
