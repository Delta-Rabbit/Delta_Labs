import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/Theme_Context";
import "./index.css"; // Tailwind + base styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" enablePersistence>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
 