import { Link } from "react-router-dom";
import Logo from "../assets/WoRZX.png";
import { useState } from "react";
import "./Header__2.css";
import { useTheme } from "../router";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

export default function Header__2() {

  const { theme, setTheme } = useTheme();

  const [shortHeader, setShortHeader] = useState<boolean>(false);

    return (
        <nav className={`navbar ${theme ? "dark__theme__container" : ""}`} role="navigation" aria-label="main navigation" style={{ width: "100%" }}>
          <div className="navbar-brand">
            <Link to="/about" className={`navbar-item ${theme ? "dark__theme" : ""}`}>
              <img src={Logo} alt="WoRZX" className="logo__style"  />
            </Link>

            <button onClick={() => setShortHeader(prev => !prev)} role="button"  className={`navbar-burger ${shortHeader && "is-active"}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </button>
          </div>

          <div id="navbarBasicExample" className={`navbar-menu ${shortHeader ? "is-active" : ""} ${theme ? "dark__theme__container" : ""}`} >
            <div className={`navbar-start ${theme ? "dark__theme" : ""}`}>
              <Link to="/" className={`navbar-item ${theme ? "dark__theme" : ""}`}>
                Home
              </Link>

              <Link to="/shop" className={`navbar-item ${theme ? "dark__theme" : ""}`}>
                Shop
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <div className={`navbar-link ${theme ? "dark__theme" : ""}`} tabIndex={0}>
                  More
                </div>

                <div className={`navbar-dropdown ${theme ? "dark__theme__NO_BORDER" : ""}`}>
                  {["About", "Contact"].map((item, index) => (
                    <Link to={`/${item.toLowerCase()}`} key={index} className={`navbar-item ${theme ? "dark__theme" : ""}`}>{item}</Link>
                  ))}
                  <Link to="/report" className={`navbar-item ${theme ? "dark__theme" : ""}`}>
                    Report an issue
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <button className={`button ${theme ? "dark__theme" : ""}`} onClick={() => setTheme(prev => !prev)}>
                        {theme ? <LightModeIcon/> : <NightlightIcon />}
                    </button>
                </div>
                <div className="field has-addons">
                    <div className="control">
                        <input className="input" type="text" placeholder="Cheesy waren" />
                    </div>
                    <div className="control">
                        <button className="button BackGroundMain">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </nav>
        )
}
