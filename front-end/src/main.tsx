import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./routers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvieder } from "./context/authContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvieder>
        <RouterProvider router={router} />
      </AuthProvieder>
    </QueryClientProvider>
  </StrictMode>
);
