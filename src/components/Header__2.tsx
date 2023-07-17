import { Link } from "react-router-dom";
import Logo from "../assets/WoRZX.png";
import LogoDark from "../assets/WoRZX-dark.png";
import React, { Suspense, lazy, useState } from "react";
import "./Header__2.css";
import { useTheme } from "../Theme_context";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PersonIcon from "@mui/icons-material/Person";
import { SandwichContextType, SandwichType, ThemeType } from "../Types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useSandwich } from "../Sandwich_context";

const Cart_Modal = lazy(() => import("./cart-components/Cart_main"));

export default function Header__2(): React.JSX.Element {
  const { theme, setTheme } = useTheme() as ThemeType;

  const [shortHeader, setShortHeader] = useState<boolean>(false);
  const { sandwich } = useSandwich() as SandwichContextType;

  return (
    <nav
      className={`navbar ${theme ? "dark__theme__container" : ""}`}
      role="navigation"
      aria-label="main navigation"
      style={{ width: "100%" }}
    >
      <div className="navbar-brand">
        <Link
          to="/about"
          className={`navbar-item ${theme ? "dark__theme" : ""}`}
        >
          <img
            src={theme ? LogoDark : Logo}
            alt="WoRZX"
            className="logo__style"
          />
        </Link>

        <button
          onClick={() => setShortHeader((prev) => !prev)}
          role="button"
          className={`navbar-burger ${shortHeader && "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${shortHeader ? "is-active" : ""} ${
          theme ? "dark__theme__container" : ""
        }`}
      >
        <div className={`navbar-start ${theme ? "dark__theme" : ""}`}>
          <Link to="/" className={`navbar-item ${theme ? "dark__theme" : ""}`}>
            Home
          </Link>

          <Link
            to="/shop"
            className={`navbar-item ${theme ? "dark__theme" : ""}`}
          >
            Shop
          </Link>

          <button
            className={`button header__navbar-end__button ${
              theme ? "dark__theme__NO_BORDER" : ""
            }`}
            onClick={() => {
              localStorage.setItem(
                "theme-ed06fa4efa4dd9b42b0063ff84e77ddd937f367f68e2a490aca139bfd884590e0f820a124e477562c643ddb6523489db9ed2b005183f9c859990cd89f72c1f74",
                JSON.stringify(!theme),
              );
              setTheme((prev) => !prev);
            }}
          >
            {theme ? <LightModeIcon /> : <NightlightIcon />}
          </button>

          <div className="navbar-item has-dropdown is-hoverable">
            <div
              className={`navbar-link ${theme ? "dark__theme" : ""}`}
              tabIndex={0}
            >
              More
            </div>

            <div
              className={`navbar-dropdown ${
                theme ? "dark__theme__NO_BORDER" : ""
              }`}
            >
              {["About", "Contact"].map((item, index) => (
                <Link
                  to={`/${item.toLowerCase()}`}
                  key={index}
                  className={`navbar-item ${theme ? "dark__theme" : ""}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="field has-addons">
            <div
              className={`control ${
                theme ? "DARK_INPUTS DARK_INPUTS_HEADER" : ""
              }`}
            >
              <Autocomplete
                freeSolo
                id="sandwich_search_bar"
                getOptionLabel={(option: SandwichType | string) => typeof option === "object" ? option.name : option}
                renderOption={(_, option: SandwichType) => (
                  <Link
                    key={option.name}
                    to={`/shop/${option.id}`}
                    className="navbar-item"
                  >
                    {option.name}
                  </Link>
                )}
                options={sandwich}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Sandwich"
                    inputProps={{
                      ...params.inputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <Link
            to="/user"
            className={`navbar-item ${theme ? "dark__theme" : ""}`}
          >
            <PersonIcon className="clickable" />
          </Link>
          <div className={`navbar-item ${theme ? "dark__theme" : ""}`}>
            <Suspense fallback={
            <div className="load_backdrop">
                <CircularProgress />
            </div>}>
                <Cart_Modal />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
