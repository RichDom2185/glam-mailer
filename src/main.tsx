import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { appRoutes } from "./routes.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter(
        [{ path: "/*", element: <App />, children: appRoutes }],
        { future: { v7_relativeSplatPath: true } }
      )}
    />
  </React.StrictMode>
);
