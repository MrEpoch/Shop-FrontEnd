import "./contact__page.css";
import Intro__MyInfo from "./contact__page-components/intro__my-info.tsx";
import { useTheme } from "../Theme_context";
import { ThemeType } from "../Types.tsx";
import React from "react";

export default function Contact__page(): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  return (
    <section
      className={`contact__page ${theme ? "dark__theme__PURE_BLACK" : ""}`}
    >
      <Intro__MyInfo />
    </section>
  );
}
