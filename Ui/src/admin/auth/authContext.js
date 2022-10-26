import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import qs from "qs";
import Router from "next/router";
import { api } from "src/services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "bibliokeia.token": token } = parseCookies();
    if (token) {
      //Pegar informações do usuario
      const payload = token.split(".")[1];
      setUser(JSON.parse(window.atob(payload)));
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function signIn(data) {
    const response = await api.post("token", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    setCookie(undefined, "bibliokeia.token", response.data.access_token, {
      // maxAge: 60 * 60 * 1,
      path: "/",
    });
    const { "bibliokeia.token": token } = parseCookies();
    const payload = token.split(".")[1];
    setUser(JSON.parse(window.atob(payload)));

    Router.push("/admin");
  }

  async function signOut(ctx) {
    setUser(null);
    destroyCookie(null, "bibliokeia.token", {
      path: "/",
    });

    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
