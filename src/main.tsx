import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Login from "./pages/Auth/Login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedPage from "./pages/Protected/index.tsx";
import Dashboard from "./pages/Dashboard/index.tsx";
import Overview from "./components/Overview.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CrowdEntriesRoute from "./components/CrowdEntriesWrapper.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import Error from "./pages/Error.tsx";
const queryClient = new QueryClient();

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route element={<AppLayout />}>
        {/* Protected routes */}
        <Route element={<ProtectedPage />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="crowd-entries" element={<CrowdEntriesRoute />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>
);
