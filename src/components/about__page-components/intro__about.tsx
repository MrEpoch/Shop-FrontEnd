import "./intro__about.css";
import SandwichPicture from "../../assets/sandwich-4.png";
import { useTheme } from "../../Theme_context";
import { ThemeType } from "../../Types";
import { Link } from "react-router-dom";
import React from "react";

export default function Intro__about(): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  return (
    <div className="intro__about">
      <div className="intro__about__text">
        <h1 className="intro__about__text__h1">
          <span>WoRZX</span> classic taste with modern style.
        </h1>
        <p className="intro__about__text__p">
          We take pride in our food. Our traditional classic sandwiches are
          brought to modern times with us to elevate standards of taste and your
          enjoyment.
        </p>
        <div className="intro__about__buttons">
          <Link to="/contact" className="button">
            Contact
          </Link>
          <Link to="/shop" className="button">
            Shop
          </Link>
        </div>
      </div>
      <div className="intro__about__image">
        <img
          src={SandwichPicture}
          className={`${theme ? "dark__sandwich" : ""}`}
          alt="Sandwich"
        />
      </div>
    </div>
  );
}
