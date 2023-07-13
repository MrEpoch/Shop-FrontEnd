import "./Intro__ad_sale__shop.css";
import Sandwich from "../../assets/sandwich-4.png";
import { useTheme } from "../../Theme_context";
import { ThemeType } from "../../Types";

export default function Intro_ad() {
  const { theme } = useTheme() as ThemeType;

  return (
    <div className={`shop__intro__ad  ${theme ? "dark_ad" : "light_ad"}`}>
      <div className="shop__intro__ad__container__text">
        <h2>Great deal 30% off on Chicken sandwiches</h2>
        <button className="button">Buy now</button>
      </div>
    </div>
  );
}
