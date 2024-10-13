import "./index.css";
import App from "./app.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Isolate from "./isolate.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/isolate" element={<Isolate />} />
    </Routes>
  </BrowserRouter>,
);
