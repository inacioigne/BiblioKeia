import Fields from "src/admin/components/thesaurus/names/fields";
import SearchBK from "./searchBK";

// React Hooks
import { useState } from "react";

export default function NamesBK() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("PersonalName");
  const [name, setName] = useState("");
  const [response, setResponse] = useState([]);
  

  return (
    <>
      <Fields
        setOpen={setOpen} 
        type={type}
        setType={setType}
        name={name}
        setName={setName}
        setResponse={setResponse}
      />
      
      <SearchBK
        open={open}
        setOpen={setOpen}
        type={type}
        setType={setType}
        name={name}
        setName={setName}
        response={response}
        setResponse={setResponse}

      />
    </>
  );
}
