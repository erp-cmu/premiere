import { FrappeProvider } from "frappe-react-sdk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FrappeProvider url="http://localhost:8000" socketPort="9000">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FrappeProvider>
  </StrictMode>,
);
