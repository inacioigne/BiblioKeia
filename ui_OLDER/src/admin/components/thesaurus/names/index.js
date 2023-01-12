// Material UI
import { Box } from "@mui/material/";
// BiblioKeia Components
import SearchBK from "./searchBK";
import AlertBK from "src/admin/components/alerts";
//import Inputs from "./inputs";
import Type from "./inputs/type";
import Authority from "./inputs/authority";

// React Hooks
import { useState } from "react";
// BiblioKeia Hooks
import { useAlertBK } from "src/providers/alerts";

// BiblioKeia Services
// import { getAthorities } from "src/services/solr/authorities";
import { apiSolr } from "src/services/solr";

export default function NamesBK() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("PersonalName");
  const [name, setName] = useState("");
  const [response, setResponse] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const { openSnack, setOpenSnack, message, typeAlert } = useAlertBK();

  const searchAuthority = (name = "*") => {
    //console.log("sh", name)
    apiSolr
      .get("authorities/select", {
        params: {
          q: `general_search:${name}*`,
          fq: `type:${type}`,
          "q.op": "AND",
          wt: "json",
        },
      })
      .then((response) => {
        setResponse(response.data.response.docs);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    //console.log("r", name)

    setOpen(true);
    // setName(e.target.value);
    searchAuthority(name);
  };

  return (
    <>
   
      <form onSubmit={handleSearch}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Type setType={setType} type={type} />
          <Authority
            handleSearch={handleSearch}
            value={name}
            setValue={setName}
            setDisabled={setDisabled}
            disabled={disabled}
          />
        </Box>
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
        handleSearch={handleSearch}
        searchAuthority={searchAuthority}
        setDisabled={setDisabled}
        disabled={disabled}
      />
      <AlertBK
        open={openSnack}
        setOpen={setOpenSnack}
        message={message}
        typeAlert={typeAlert}
      />
    </>
  );
}
