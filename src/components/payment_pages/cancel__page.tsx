import ClearIcon from "@mui/icons-material/Clear";
import "./payment__pages.css";
import { useTheme } from "../../Theme_context";
import { ThemeType } from "../../Types";
import React from "react";

export default function CancelPage(): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  return (
    <section
      id="shop__payment"
      className={`shop__payment__cancel ${theme ? "dark__theme__LIGHTER" : ""}`}
    >
      <div
        id="shop__payment__container"
        className="shop__payment__cancel__container"
      >
        <ClearIcon className="shop__payment__cancel__icon" />
        <h1 className="shop__payment__cancel__title">
          Your order was cancelled.
        </h1>
      </div>
    </section>
  );
}
