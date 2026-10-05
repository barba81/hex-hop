import { useInitializeApp } from "@/app/hooks/use-init-action";
import { router } from "@/app/router";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";


useInitializeApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);