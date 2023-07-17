import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./payment__pages.css";
import { useTheme } from "../../Theme_context";
import { ThemeType } from "../../Types";
import React from "react";

export default function SuccessPage(): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  return (
    <section
      id="shop__payment"
      className={`shop__payment__success ${
        theme ? "dark__theme__LIGHTER" : ""
      }`}
    >
      <div
        id="shop__payment__container"
        className="shop__payment__success__container"
      >
        <CheckCircleIcon className="shop__payment__success__icon" />
        <h1 className="shop__payment__success__title">Payment Successful</h1>
        <p className="shop__payment__success__text">
          Thank you for your purchase!
        </p>
      </div>
    </section>
  );
}
