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
<<<<<<< HEAD
    contributionID: "",
    contributionRoleUri: ""
=======
    contributionRoleUri: "",
    contributionID: "",
    subjects: [],
    language: "",
    languageCode: "",
    cdd: "",
    cutter: ""

>>>>>>> 8c140787b0eb12d34c23f730070687a8acce2908
  });

  return (
    <BfContext.Provider value={{ bf, setBf}}>
        { children}
    </BfContext.Provider>
  )
};

export const useBf = () => useContext(BfContext);