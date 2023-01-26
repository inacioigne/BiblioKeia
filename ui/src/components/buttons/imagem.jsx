"use client";
// MUI
import {
  Container,
  Paper,
  Grid,
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material/";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// React Hooks
import { useState } from "react";

// Nextjs Hooks
import Image from "next/image";

// Services BiblioKeia
import { api } from "src/services/api/api";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { useAlertBK } from "src/providers/alerts";

export default function ImagemBK() {
  const { instance } = useBf();
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    const i = event.target.files[0];
    setImage(i);
    setCreateObjectURL(URL.createObjectURL(i));
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    api
      .post(`/items/${instance.instance_id}/imagem`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status == 201) {
          setTypeAlert("success");
          setMessage("Imagem salva com sucesso!");
          setOpenSnack(true);
        } else {
          setTypeAlert("error");
          setMessage("Algo deu errado");
          setOpenSnack(true);
        }
      });
  };

  return (
    <>
      <Paper
        sx={{
          mt: "1rem",
          width: 200,
          height: 230,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image src={createObjectURL} width={200} height={220} alt="cover" />
        ) : (
          <Box>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={uploadToClient}
              />
              <PhotoCamera sx={{ width: "3rem", height: "3rem" }} />
            </IconButton>
          </Box>
        )}
      </Paper>
      {image && (
        <Box sx={{ mt: "0.5rem" }}>
          <Button
            size={"small"}
            variant="outlined"
            sx={{ mr: "0.5rem" }}
            onClick={uploadToServer}
          >
            Salvar
          </Button>
          <Button
            size={"small"}
            variant="outlined"
            onClick={() => {
              setImage(null);
            }}
          >
            Cancelar
          </Button>
        </Box>
      )}
    </>
  );
}
