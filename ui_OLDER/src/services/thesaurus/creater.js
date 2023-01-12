import axios from "axios";

function CreateSubject() {
    
    const api = axios.create({
      baseURL: "http://localhost:8000/thesaurus/thesaurus/",
    });
  
   
    return api;
  }
  
export const apiSubject = CreateSubject()