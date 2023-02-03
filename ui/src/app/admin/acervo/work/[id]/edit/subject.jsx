// MUI
import { Box, Typography, IconButton, Button } from "@mui/material/";
import RemoveIcon from "@mui/icons-material/Remove";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// React Hooks
import { useState, useEffect } from "react";

import ThesarusBK from "src/components/bibframe/work/subject/thesarusBK";

export default function Subject({listSubject, setListSubject}) {

  const { work, setWork } = useBf();
 // const [listSubject, setListSubject] = useState([{ label: "", uri: "" }]);

  useEffect(() => {
  
    if (work.subjects.length > 0) {
        setListSubject(work.subjects)
    }

  }, [work]);

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography variant="subtitle2" sx={{ pb: "1rem" }}>
        Assunto
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {listSubject?.map((subject, index) => (
    
          <Box key={index} sx={{ display: "flex", gap: "1rem" }}>
            <ThesarusBK
              listSubject={listSubject}
              setListSubject={setListSubject}
              defaultSubject={subject.label}
              defaultUri={subject.uri}
              index={index}
            />
            <IconButton
              onClick={() => {
                let recuse = listSubject.filter((value, i) => {
                  return i !== index;
                });
                setListSubject(recuse);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          onClick={() => {
            setListSubject((prevSate) => [...prevSate, { label: "", uri: "" }]);
          }}
        >
          Adicionar Assunto
        </Button>
      </Box>
    </Box>
  );
}
