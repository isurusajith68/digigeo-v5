"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import { ThemeProviders } from "./providers/theme-provider";

export default function LayoutClientComponent({ children }) {
  return (
    <ThemeProviders>
      <Provider store={store}>{children}</Provider>
    </ThemeProviders>
  );
}
