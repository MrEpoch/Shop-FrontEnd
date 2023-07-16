import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Footer from "./components/footer";
import About__page from "./components/about__page";
import Header__2 from "./components/Header__2";
import Contact__page from "./components/contact__page";
import { ChildrenProp, SandwichType } from "./Types";
import Shop__page from "./components/shop__page";
import { useSandwich } from "./Sandwich_context";
import Shop_item__page from "./components/shop__item__page";
import Login__page from "./components/auth__pages/log_in.tsx";
import Sign_up from "./components/auth__pages/create_account.tsx";
import React, { useEffect } from "react";
import User__page from "./components/auth__pages/user__page.tsx";
import CancelPage from "./components/payment_pages/cancel__page.tsx";
import SuccessPage from "./components/payment_pages/success__page.tsx";

function PackPage({ children }: ChildrenProp) {
  return (
    <>
      <Header__2 />
      {children}
      <Footer />
    </>
  );
}

function Check_Validity_Page({ children }: ChildrenProp): React.JSX.Element {
  const { sandwich } = useSandwich();

  const { id } = useParams();

  if (sandwich.find((item: SandwichType) => item.id === id)) {
    return <>{children}</>;
  }

  return <>ERROR 404</>;
}

function Check_token({ children }: ChildrenProp) {
  const token = localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_NAME);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

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
                <User__page />
              </PackPage>
            </Check_token>
          }
        />
        <Route
          path="/cancel"
          element={
            <PackPage>
              <CancelPage />
            </PackPage>
          }
        />
        <Route
          path="/success"
          element={
            <PackPage>
              <SuccessPage />
            </PackPage>
          }
        />
      </Routes>
    </>
  );
}
