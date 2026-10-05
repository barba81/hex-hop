import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { useInitializeApp } from "./app/hooks/use-init-action";

useInitializeApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);