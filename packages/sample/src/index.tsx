import "./index.css";
import App from "./app.tsx";
import { createRoot } from "react-dom/client";
import { PolymorphUiProvider } from "polymorphui/polymorphui-provider";
import { ComponentVariants } from "polymorphui/variant";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Isolate from "./isolate.tsx";

const variants: ComponentVariants = {
  text: {
    default: "text-gray-600 tracking-wide",
    heading: "text-5xl font-medium text-black",
    small: "text-sm",
    /* Other text variants (As many as you want) */
  },
  button: {
    default: "",
    secondary: "bg-orange-500 hover:opacity-85",
    /* Other button variants (As many as you want) */
  },
  /* Other component variants */
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PolymorphUiProvider variants={variants}>
      <Routes>
        <Route index element={<App />} />
        <Route path="/isolate" element={<Isolate />} />
      </Routes>
    </PolymorphUiProvider>
  </BrowserRouter>,
);
