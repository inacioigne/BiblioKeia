import { createContext, useContext, useState } from "react";

export const BfContext = createContext({});

export const BfProvider = ({ children }) => {
  const [bf, setBf] = useState({
    work_id: "",
    contentType: "",
    mainTitle: "",
    subtitle: "",
    contributionAgent: "",
    contributionRole: "",
    contributionRoleUri: "",
    contributionID: "",
    subjects: [],
    language: "",
    languageCode: "",
    cdd: "",
    cutter: ""

  });

  return (
    <BfContext.Provider value={{ bf, setBf}}>
        { children}
    </BfContext.Provider>
  )
};

export const useBf = () => useContext(BfContext);