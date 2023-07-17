import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { ChildrenProp, SandwichContextType, SandwichType } from "./Types";
import { useSandwich } from "./Sandwich_context";
import React, { Suspense, lazy, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const User__page = lazy(() => import("./components/auth__pages/user__page.tsx"));
const Login__page = lazy(() => import("./components/auth__pages/log_in.tsx"));
const Sign_up = lazy(() => import("./components/auth__pages/create_account.tsx"));
const CancelPage = lazy(() => import("./components/payment_pages/cancel__page.tsx"));
const SuccessPage = lazy(() => import("./components/payment_pages/success__page.tsx"));
const Shop_item__page = lazy(() => import("./components/shop__item__page.tsx"));
const Shop__page = lazy(() => import("./components/shop__page.tsx"));
const Landing__page = lazy(() => import("./components/landing__page.tsx"));
const Footer = lazy(() => import("./components/footer.tsx"));
const Header__2 = lazy(() => import("./components/Header__2.tsx"));
const About__page = lazy(() => import("./components/about__page.tsx"));
const Contact__page = lazy(() => import("./components/contact__page.tsx"));


function PackPage({ children }: ChildrenProp): React.JSX.Element {
  return (
    <>
      <Header__2 />
      {children}
      <Footer />
    </>
  );
}

function Check_Validity_Page({ children }: ChildrenProp): React.JSX.Element {
  const { sandwich } = useSandwich() as SandwichContextType;

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

export default function Router(): React.JSX.Element {
  return (
    <Suspense
        fallback={
        <div className="load_all">
          <CircularProgress />
        </div>
        }
    >
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
    </Suspense>
  );
}
