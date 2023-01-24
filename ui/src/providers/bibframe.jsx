import { createContext, useContext, useState } from "react";

export const BfContext = createContext({});

export const BfProvider = ({ children }) => {
  const [work, setWork] = useState({
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
    cutter: "",
  });

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
    series: "",
  });

  return (
    <BfContext.Provider value={{ work, setWork, instance, setInstances }}>
      {children}
    </BfContext.Provider>
  );
};

export const useBf = () => useContext(BfContext);
