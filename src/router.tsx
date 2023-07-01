import { Routes, Route } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Header from "./components/header";
import Footer from "./components/footer";
import About__page from "./components/about__page";

function PackPage({ children }: ChildrenProp) {
  return (
    <>
      <Header />
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

        <Route path="/shop" element={<PackPage></PackPage>} />

        <Route
          path="/about"
          element={
            <PackPage>
              <About__page />
            </PackPage>
          }
        />
      </Routes>
    </>
  );
}

export interface ChildrenProp {
  children: React.ReactNode;
}
