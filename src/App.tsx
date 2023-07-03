import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./router";
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeType } from "./Types";

const ThemeContext = createContext<ThemeType | object>({});

export function useTheme() {
    const value = useContext(ThemeContext);
    if (value === null) return {};
    return value;
}

function App() {
   
  const [theme, setTheme] = useState<boolean>(false);
  
  useMemo(() => {
    const NewTheme = localStorage.getItem("theme-ed06fa4efa4dd9b42b0063ff84e77ddd937f367f68e2a490aca139bfd884590e0f820a124e477562c643ddb6523489db9ed2b005183f9c859990cd89f72c1f74");
    if (NewTheme) setTheme(JSON.parse(NewTheme));
  }, []);

   const value = {
    theme,
    setTheme
  }; 

  return (
    <ThemeContext.Provider value={value}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
