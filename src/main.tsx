import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { featureConfigs } from "./featureConfigs";
import "./index.css";

const router = createBrowserRouter(
  featureConfigs.map((featureConfig) => ({
    path: `/${featureConfig.urlPath}`,
    element: <App featureConfig={featureConfig} />,
  }))
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
