import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import { router } from "./routes";
import { ThemeProvider } from "./providers/theme.provider";
import { store } from "./redux/store";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="tour-app-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
);
