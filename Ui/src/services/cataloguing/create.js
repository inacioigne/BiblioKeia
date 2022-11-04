import axios from "axios";

function Create() {
    
    const api = axios.create({
      baseURL: "http://localhost:8000/cataloguing/",
    });
  
   
    return api;
  }
  
export const CataloguingApi = Create()