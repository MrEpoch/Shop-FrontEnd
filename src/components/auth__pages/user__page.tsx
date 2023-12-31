import "./user__page.css";
import { useAccount } from "../../Account_context";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSandwich } from "../../Sandwich_context";
import Sandwich_card from "../shop__page-components/sandwich-card";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Theme_context";
import { AccountContextType, SandwichContextType, SandwichType, ThemeType } from "../../Types";
import { Alert, CircularProgress } from "@mui/material";

export default function User__page(): React.JSX.Element { 
  const { account, favourites, handleLogout, isLoading, error } = useAccount() as AccountContextType;
  const { sandwich } = useSandwich() as SandwichContextType;
  const navigate = useNavigate();
  const { theme } = useTheme() as ThemeType;

  if (error) navigate("/");

  return (
    <>
    {isLoading ? (
        <div className={`load_backdrop_normal ${theme ? "dark__theme__LIGHTER" : ""}`}>
            <CircularProgress />
        </div>
        ) : (
    
    <section
      className={`shop__user-page ${theme ? "dark__theme__LIGHTER" : ""}`}
    >
        {error && (
          <Alert
            severity="error"
            style={{
              position: "fixed",
              zIndex: 10,
              right: "1%",
              bottom: "0%",
            }}
            className="error__auth"
          >
            {error}
          </Alert>
        )}
      <div
        onClick={() => {
          handleLogout();
          navigate("/");
        }}
        id={theme ? "dark__logout__svg" : ""}
        className="shop__user-page__logout"
      >
        <LogoutIcon />
      </div>
      <div className="shop__user-page__design">
        <div className="shop__user-page__greeting">
          <h1>Hi {account && account.name},</h1>
          <p>
            Here you can see your account information, favourites and orders.
          </p>
        </div>
      </div>
      <div className="shop__user-page__information">
        <div className="custom-shape-divider-top-1689418504">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h3>
          <AccountBoxIcon /> {account && account.name}
        </h3>
        <h3>
          <EmailIcon />
          {account && account.email}
        </h3>
        <h3>
          <LanguageIcon />
          {account && account.country}
        </h3>
        <h3>
          <PhoneIcon />
          {account && account.phone}
        </h3>
      </div>
      <div className="shop__user-page__favourites">
        <h3>Favourites</h3>
        <div className="shop__user-page__favourites__container">
          {sandwich && (
            <Sandwich_card
              sandwich={sandwich.filter(
                (favourite: SandwichType) =>
                  favourites && favourites.includes(favourite.id),
              )}
            />
          )}
        </div>
      </div>
      <div className="shop__user-page__orders"></div>
    </section>
    )}
    </>
  );
}
