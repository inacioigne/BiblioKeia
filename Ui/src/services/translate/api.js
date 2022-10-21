import axios from "axios";

function translate() {

    const api = axios.create({
        baseURL: "http://localhost:8000/translate"
      });

     
    return api;
}

export const api = translate()