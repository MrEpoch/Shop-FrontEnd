import EggIcon from "@mui/icons-material/Egg";
import StarIcon from "@mui/icons-material/Star";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import "./intro__expect_cards.css";
import { useTheme } from "../../router";
import { ThemeType } from "../../Types";
import { Link } from "react-router-dom";

const CardInfo = [
  {
    icon: <EggIcon />,
    title: "Fresh Ingredients",
    redirect: "/about#fresh",
    description:
      "We use only the freshest ingredients to make our food. We never use frozen ingredients.",
  },
  {
    icon: <StarIcon />,
    title: "Quality Service",
    redirect: "/about#service",
    description:
      "We strive to provide the best service possible. We want you to feel like family.",
  },
  {
    icon: <RestaurantIcon />,
    title: "Authentic Taste",
    redirect: "/about#taste",
    description:
      "We use traditional recipes to make our food. We want you to experience the authentic taste.",
  },
];

export default function ExpectIntro() {

  const { theme } = useTheme() as ThemeType;

  return (
    <div className="landing-expect__container">
      <h2 className="landing-expect__title">New Look, Classic Taste</h2>
      <div className="landing-expect__cards">
        {CardInfo.map((card, index) => {
          return (
            <Link
                to={card.redirect} className={`landing-expect__card ${theme ? "dark__theme__LIGHTER" : ""}`} key={index}>
              <div className="landing-expect__card__icon">{card.icon}</div>
              <h3 className="landing-expect__card__title">{card.title}</h3>
              <p className="landing-expect__card__description">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
