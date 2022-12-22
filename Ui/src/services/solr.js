import axios from "axios"; 

function search() {
    
    const api = axios.create({
      baseURL: "http://localhost:8983/solr/search/",
    });
  
   
    return api;
  }
  
export const api = search()