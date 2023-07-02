import { Routes, Route } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/header__v2";
import { createContext, useContext, useState } from "react";
import { ChildrenProp, ThemeType } from "./Types";

const ThemeContext = createContext<object | ThemeType>({});

export function useTheme() {
    const value = useContext(ThemeContext);
    if (value === null) return {};
    return value;
}

function PackPage({ children }: ChildrenProp) {
  
  const [theme, setTheme] = useState<boolean>(true);

  const value = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <Header__2 />
      {children}
      <Footer />
    </ThemeContext.Provider>
  );
}

export default function Router() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PackPage>
              <Landing__page />
            </PackPage>
          }
        />

        <Route path="/shop" element={<PackPage><h1>Shop</h1></PackPage>} />

        <Route
          path="/about"
          element={
            <PackPage>
              <About__page />
            </PackPage>
          }
        />
        <Route path="/contact" element={<PackPage><h1>Contact</h1></PackPage>} />
        
        <Route path="/report" element={<PackPage><h1>Report</h1></PackPage>} />

        </Routes>
        
    </>
  );
}


