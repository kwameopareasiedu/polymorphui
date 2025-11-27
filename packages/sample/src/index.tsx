import "./index.css";
import App from "./app.tsx";
import { createRoot } from "react-dom/client";
import { PolymorphUiProvider } from "polymorphui/polymorphui-provider";
import { createBrowserRouter, RouterProvider } from "react-router";
import Isolate from "./isolate.tsx";

const router = createBrowserRouter([
  { index: true, element: <App /> },
  { path: "/isolate", element: <Isolate /> },
]);

createRoot(document.getElementById("root")!).render(
  <PolymorphUiProvider config={{}}>
    <RouterProvider router={router} />
  </PolymorphUiProvider>,
);
