import "./header.css";
import Logo from "../assets/WoRZX.png";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  return (
    <header className="shop-header">
      <Link to="/about" className="header__logo">
        <img src={Logo} alt="WoRZX" />
      </Link>
      <div className="header__navigation">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
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
