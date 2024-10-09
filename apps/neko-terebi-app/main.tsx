// to get @tanstack/react-query to work
import "./polyfills/patchHeaders.ts";
import "abortcontroller-polyfill";

import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export function bootstrap(el: Container) {
  createRoot(el).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
