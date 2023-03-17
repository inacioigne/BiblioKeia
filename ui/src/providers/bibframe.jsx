import { createContext, useContext, useState } from "react";

export const BfContext = createContext({});

export const BfProvider = ({ children }) => {
  const [work, setWork] = useState({
    ID: "",
    content: "",
    mainTitle: "",
    subtitle: "",
    variantTitle: "",
    primaryContributionAgent: "",
    primaryContributionUri: "",
    primaryContributionRole: "",
    primaryContributionRoleUri: "",
    subjects: [],
    language: "",
    languageCode: "",
    cdd: "",
    cutter: "",
    serie: "",
    serieURI: ""
  });

  const [workEdit, setWorkEdit] = useState(null);

  const [instance, setInstances] = useState({
    instance_id: null,
    instanceOf: null,
    type: "Print",
    mainTitle: "",
    subtitle: "",
    extent: "",
    publication: "",
    edition: "",
    place: "",
    date: "",
    responsibility: "",
    series: null,
  });

  const [serie, setSerie] = useState({
    type: "Series",
    mainTitle: "",
    subtitle: "",
    variantTitle: "",
    contributionAgent: "",
    contributionRole: "",
    contributionRoleUri: "",
    contributionID: "",
    cdd: "",
    cutter: "",
    issn: ""
    
  }
  )

  return (
    <BfContext.Provider value={{ work, setWork, instance, setInstances, serie, setSerie, workEdit, setWorkEdit}}>
      {children}
    </BfContext.Provider>
  );
};

export const useBf = () => useContext(BfContext);
 