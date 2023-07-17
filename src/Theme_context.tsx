import { useContext, useState, useMemo } from "react";
import { ChildrenProp } from "./Types";
import { ThemeContext } from "./Context_definitions";

export function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null) return {};
  return value;
}

export default function Theme_context({ children }: ChildrenProp) {
  const [theme, setTheme] = useState<boolean>(false);

  useMemo(() => {
    const NewTheme = localStorage.getItem(
      import.meta.env.VITE_THEME_NAME
    );
    if (NewTheme) setTheme(JSON.parse(NewTheme));
  }, []);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
