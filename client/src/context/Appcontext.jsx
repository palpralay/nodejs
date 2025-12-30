import React from "react";
import { createContext } from "react";

const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  const storeToken = (token) => {
    console.log("Token stored successfully", token);
    return localStorage.setItem("token", token);
  };

  return (
    <Appcontext.Provider value={{ storeToken, getToken, removeToken, isLoggedIn }}>{children}</Appcontext.Provider>
  );
};

export default AppcontextProvider;
export { Appcontext };
