import { createContext } from "react";

type Auth = {
  logout: () => void;
};
export const AuthContext = createContext<Auth | null>(null);