import axios from "axios";

function search() {
    
    const api = axios.create({
      baseURL: "https://id.loc.gov/authorities/names/",
    });
  
   
    return api;
  }
  
export const api = search()