import "./responsive__H_F.css";
import "./header.css";
import Logo from "../assets/WoRZX.png";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import Menu from "@mui/icons-material/Notes";

const Header__links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Header() {
  const [shortHeader, setShortHeader] = useState<boolean>(false);

  function checkHeaderSize() {
    if (document.body.clientWidth < 1000) setShortHeader(true);
    else setShortHeader(false);
    return;
  }

  new ResizeObserver(() => {
    checkHeaderSize();
  }).observe(document.body);

  return (
    <header className="shop-header">
      <Link to="/about" className="header__logo">
        <img src={Logo} alt="WoRZX" />
      </Link>
      <div className="header__navigation">
        {shortHeader ? (
          <>
            <Menu className="menu__svg" />
            <div className="menu__container">
              {Header__links.map((val, index) => (
                <Link key={index} to={val.path} className="header__link__small">
                  {val.name}
                </Link>
              ))}
            </div>
          </>
        ) : (
          Header__links.map((val, index) => {
            return (
              <Link key={index} to={val.path} className="header__link">
                {val.name}
              </Link>
            );
          })
        )}
      </div>
      <div className="header__controls">
        <div className="header__search__container">
          <SearchIcon className="header__search__icon" />
          <input
            type="text"
            className="header__search__input"
            placeholder="Search"
          />
        </div>
        <div className="header__user__container">
          <PersonIcon className="header__user__icon" />
          <ShoppingCartIcon className="header__user__icon" />
        </div>
      </div>
    </header>
  );
}
