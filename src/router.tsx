import { Routes, Route } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/header__v2";

function PackPage({ children }: ChildrenProp) {
  return (
    <>
      <Header__2 />
      {children}
      <Footer />
    </>
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

export interface ChildrenProp {
  children: React.ReactNode;
}
