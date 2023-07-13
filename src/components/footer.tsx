import "./footer.css";
import { useTheme } from "../Theme_context";
import { ThemeType } from "../Types.tsx";

export default function Footer() {
  const { theme } = useTheme() as ThemeType;

  return (
    <footer
      style={{ width: "100%" }}
      className={`footer ${theme ? "dark__theme__container" : ""}`}
    >
      <div className="content has-text-centered">
        <p>
          © 2023 Sandwich Shop by{" "}
          <a href="https://parallax-stencuk.pages.dev/">Alexandr Stenčuk</a>.
        </p>
      </div>
    </footer>
  );
}
