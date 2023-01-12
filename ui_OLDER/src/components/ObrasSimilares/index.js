import {
  Stack,
  Box,
  Container,
  Typography,
  Divider,
  IconButton, 
  Paper,
} from "@mui/material/";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { api } from "src/services/solr";
import { useRouter } from "next/router";

// Next Components
import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";

const styleText = {
    //fontFamily: "Alkalami"
    fontFamily: "Sarabun",
  };


 
export default function Carousel({setOpen, subjects }) {
  const router = useRouter();
  const { id } = router.query;
  const [similarItems, setSimilarItems] = useState([])

  const getData = (id) => {

    api
      .get("select", {
        params: {
          q: `subject:${subjects}`,
          //start: page,
          "q.op": "OR",
          "rows":"21",
          //json: JSON.stringify(json_filter),
          //facet: true,
          //"json.facet": JSON.stringify(facet),
          wt: "json",
        },
      })
      .then((response) => {
        return response.data.response.docs
      })
      .then((data) => {
        return data.filter( function(doc) {
          return doc.id != id
        })
        
      })
      .then((docs) => {        
        setSimilarItems(docs)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {

    if (!id) {
      return;
    }
    getData(id, subjects)
  }, [id])

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  const handleRightClick = (e) => {
    setLeft(left + 5);
    setRight(right + 5);
    console.log(similarItems.slice(left, right))
  };

  const handleLeftClick = (e) => {
    setLeft(left - 5);
    setRight(right - 5);
  };

  return (
    <Container maxWidth="md">
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: "Sarabun",
            pt: "1.5rem"
          }}
        >
          Obras similares
        </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pb: "2rem"
        }}
      >
        
        {left != 0 && (
          <Box>
            <IconButton color="primary" onClick={handleLeftClick}>
              <ArrowBack />
            </IconButton>
          </Box>
        )}

        <Stack mt={2} spacing={5} direction="row">
          {similarItems.slice(left, right).map((doc) => (
            <Box key={doc.id} 
            sx={{ 
              boxShadow: 10,
              cursor: 'pointer'
             }}
             onClick={() => {
              setOpen(false)

             }}
             >
            <Link href={`/item/${doc.id}`}>
              <Image
                src={`http://localhost:8000/items/${doc.id}/imagem`}
                width={150}
                height={200}
              />
              </Link>
            </Box>
          ))}
        </Stack>
        {right < similarItems.length && (
          <Box>
            <IconButton color="primary" onClick={handleRightClick}>
              <ArrowForward />
            </IconButton>
          </Box>
        )}
      </Box>
    </Container>
  );
}
