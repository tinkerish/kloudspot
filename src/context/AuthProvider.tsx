import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { registerLogout } from "../lib/authService";

function getTokenExpiry(token: string): number {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutTimer = useRef<number | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/", { replace: true });
  }, [navigate, queryClient]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const expiry = getTokenExpiry(token);
    const buffer = 60_000;
    const timeout = expiry - Date.now() - buffer;

    if (timeout <= 0) {
      logout();
      return;
    }

    logoutTimer.current = window.setTimeout(logout, timeout);

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    registerLogout(logout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
