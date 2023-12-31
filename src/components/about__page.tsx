import "./about__page.css";
import Intro__about from "./about__page-components/intro__about";
import Main__slogans__about from "./about__page-components/main__slogans__about";
import { useTheme } from "../Theme_context";
import { ThemeType } from "../Types";
import React from "react";

export default function About__page(): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  return (
    <section
      className={`shop-about__page ${theme ? "dark__theme__PURE_BLACK" : ""}`}
    >
      <Intro__about />
      <Main__slogans__about />
    </section>
  );
}
