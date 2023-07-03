import { Routes, Route } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/Header__2";
import Contact__page from "./components/contact__page";
import { createContext, useContext, useMemo, useState } from "react";
import { ChildrenProp, ThemeType } from "./Types";

const ThemeContext = createContext<ThemeType | object>({});

export function useTheme() {
    const value = useContext(ThemeContext);
    if (value === null) return {};
    return value;
}

function PackPage({ children }: ChildrenProp) {
  
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
        <Route path="/contact" element={<PackPage><Contact__page /></PackPage>} />
        
        </Routes>
        
    </>
  );
}


