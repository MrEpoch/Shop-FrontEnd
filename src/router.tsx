import { Routes, Route, useParams } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/Header__2";
import Contact__page from "./components/contact__page";
import { ChildrenProp } from "./Types";
import Shop__page from "./components/shop__page";
import { useQuery } from "react-query";
import { GetSandwiches } from "./API_requests";

function PackPage({ children }: ChildrenProp) {
  return (
    <>
      <Header__2 />
      {children}
      <Footer />
    </>
  );
}

function Check_Validity_Page({ children }: ChildrenProp) {

    const { id } = useParams();

    const {isLoading, error, data} = useQuery<any[], Error>('sandwiches', GetSandwiches, {
        staleTime: 1000 * 60 * 60,
    });
  
  return (
    <>
      {children}
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

        <Route path="/shop" element={<PackPage><Shop__page /></PackPage>} />

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

