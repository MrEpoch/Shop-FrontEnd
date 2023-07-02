import { Link } from "react-router-dom";
import Logo from "../assets/WoRZX.png";
import { useState } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import "./Header__2.css";

const Header__links = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Shop",
        path: "/shop"
    },
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Contact",
        path: "/contact"
    }
]

export default function Header__2() {

  const [shortHeader, setShortHeader] = useState<boolean>(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{ width: "100%" }}>
          <div className="navbar-brand">
            <Link to="/about" className="navbar-item">
              <img src={Logo} alt="WoRZX" className="logo__style"  />
            </Link>

            <button onClick={() => setShortHeader(prev => !prev)} role="button"  className={`navbar-burger ${shortHeader && "is-active"}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </button>
          </div>

          <div id="navbarBasicExample" className={`navbar-menu ${shortHeader && "is-active"}`} >
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>

              <Link to="/shop" className="navbar-item">
                Shop
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  More
                </div>

                <div className="navbar-dropdown">
                  <Link to="/about" className="navbar-item">
                    About
                  </Link>
                  <Link to="/contact" className="navbar-item">
                    Contact
                  </Link>
                  <hr className="navbar-divider"/>
                  <Link to="/report" className="navbar-item">
                    Report an issue
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
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
