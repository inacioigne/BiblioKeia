// MUI
import { Grid } from "@mui/material/";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Components
import Type from "src/components/thesaurus/namesBK/inputs/type";
import Authority from "src/components/thesaurus/namesBK/inputs/authority";
import SearchBK from "src/components/thesaurus/namesBK/searchBK"

// BiblioKeia Services
import SearchAuthority from "src/services/solr/searchAuthority";

export default function NamesBK() {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([]);
    const [type, setType] = useState("PersonalName");
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
  
    const handleSearch = (e) => {
      e.preventDefault();
      setOpen(true);
      SearchAuthority(name, type, setResponse);
    };
    return (
      <>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} >
            <Grid item xs={3}>
              <Type setType={setType} type={type} />
            </Grid>
            <Grid item xs={9}>
              <Authority
                value={name}
                setValue={setName}
                setDisabled={setDisabled}
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </form>
        <SearchBK
          open={open}
          setOpen={setOpen}
          type={type}
          setType={setType}
          name={name}
          setName={setName}
          response={response}
          setResponse={setResponse}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </>
    );
  }