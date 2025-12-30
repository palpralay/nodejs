import { createContext, useEffect} from "react";
import { useState } from "react";

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


  
  
  //jwt authentication to get user data-----------------
  const [userData, setUserData] = useState("");
  const userAuthentication = async () => {
  const response =  await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if(response.ok){
      const data = await response.json();
      setUserData(data)
      console.log("User authenticated:", data);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <Appcontext.Provider
      value={{ storeToken, getToken, removeToken, isLoggedIn, userData }}
    >
      {children}
    </Appcontext.Provider>
  );
};



export { Appcontext };
export default AppcontextProvider;
