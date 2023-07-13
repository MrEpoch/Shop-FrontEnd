import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/Header__2";
import Contact__page from "./components/contact__page";
import { ChildrenProp } from "./Types";
import Shop__page from "./components/shop__page";
import { useSandwich } from "./Sandwich_context";
import Shop_item__page from "./components/shop__item__page";
import Login__page from "./components/auth__pages/log_in.tsx";
import Sign_up from "./components/auth__pages/create_account.tsx";
import { useEffect } from "react";

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
  const { sandwich } = useSandwich();

  const { id } = useParams();

  if (sandwich.find((item: any) => item.id === id)) {
    return <>{children}</>;
  }

  return <>ERROR 404</>;
}

function Check_token({ children }: ChildrenProp) {
  const token = localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  if (token) {
    return <>{children}</>;
  }
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

        <Route
          path="/shop"
          element={
            <PackPage>
              <Shop__page />
            </PackPage>
          }
        />

        <Route
          path="/about"
          element={
            <PackPage>
              <About__page />
            </PackPage>
          }
        />
        <Route
          path="/contact"
          element={
            <PackPage>
              <Contact__page />
            </PackPage>
          }
        />

        <Route
          path="/shop/:id"
          element={
            <Check_Validity_Page>
              <PackPage>
                <Shop_item__page />
              </PackPage>
            </Check_Validity_Page>
          }
        />

        <Route
          path="/login"
          element={
            <PackPage>
              <Login__page />
            </PackPage>
          }
        />
        <Route
          path="/signup"
          element={
            <PackPage>
              <Sign_up />
            </PackPage>
          }
        />
        <Route
          path="/user"
          element={
            <Check_token>
              <PackPage>
                <h1>USER PAGE</h1>
              </PackPage>
            </Check_token>
          }
        />
      </Routes>
    </>
  );
}
