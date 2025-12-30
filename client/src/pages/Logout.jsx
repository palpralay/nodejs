import { useEffect, useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { removeToken } = useContext(Appcontext);
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate("/login");
  }, [removeToken, navigate]);

  return null;
};

export default Logout;
