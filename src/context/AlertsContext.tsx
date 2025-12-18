import { createContext } from "react";
import type { AlertsContextType } from "../types/alerts";

export const AlertsContext = createContext<AlertsContextType | null>(null);
