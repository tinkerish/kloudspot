// AppLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { AlertsProvider } from "../context/AlertsContextProvider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <AlertsProvider>
        <Outlet />
      </AlertsProvider>
    </AuthProvider>
  );
};

export default AppLayout;
