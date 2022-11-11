import { parseCookies } from "nookies";
import axios from "axios";

export function getAPIClient (ctx) {
    const  { "bibliokeia.token": token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: "http://localhost:8000"
      });

      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        
      }

    return api; 
}