import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToasterProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToasterProvider>
      <App />
    </ToasterProvider>
  </BrowserRouter>,
);
