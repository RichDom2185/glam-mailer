import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { appRoutes } from "./routes.ts";
import { store } from "./store/index.ts";

dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={createBrowserRouter(
          [{ path: "/*", element: <App />, children: appRoutes }],
          { future: { v7_relativeSplatPath: true } }
        )}
      />
    </Provider>
  </React.StrictMode>
);
