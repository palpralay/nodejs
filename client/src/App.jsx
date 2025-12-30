import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Logout from "./pages/Logout.jsx";
import Error from "./pages/Error.jsx";  
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<Error />} /> 
      </Routes>
    </>
  );
}

export default App;
