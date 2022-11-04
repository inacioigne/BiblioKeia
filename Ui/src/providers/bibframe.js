import { createContext, useContext, useState } from "react";

export const BfContext = createContext({});

export const BfProvider = ({ children }) => {
  const [bf, setBf] = useState({
    contentType: "",
    mainTitle: "",
    subtitle: "",
    contributionAgent: "",
    contributionRole: "",
    contributionID: ""
  });

  return (
    <BfContext.Provider value={{ bf, setBf}}>
        { children}
    </BfContext.Provider>
  )
};

export const useBf = () => useContext(BfContext);