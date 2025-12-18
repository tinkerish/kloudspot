import { Navigate, Outlet } from "react-router";
import { isSessionValid } from "../../lib/sessionExpired";

const ProtectedPage = () => {
  if (!isSessionValid()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedPage;
