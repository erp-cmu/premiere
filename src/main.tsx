import { FrappeProvider } from "frappe-react-sdk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { BrowserRouter } from "react-router";

const erpnextUrl = import.meta.env.VITE_ERPNEXT_URL || "http://localhost:8000";
const socketPort = import.meta.env.VITE_SOCKET_PORT;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FrappeProvider url={erpnextUrl} socketPort={socketPort}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FrappeProvider>
  </StrictMode>,
);
