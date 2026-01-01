import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppcontextProvider from "./context/Appcontext";  
import {ToastContainer} from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppcontextProvider>
      <App />
      <ToastContainer/>
    </AppcontextProvider>
  </BrowserRouter>
);
