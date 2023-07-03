import "./landing__page.css";
import "./landing__page-components/responsive__landing.css";
import IntroCarousel from "./landing__page-components/intro__carousel";
import IntroExpect from "./landing__page-components/intro__expect_cards";
import MainPopular from "./landing__page-components/main__popular_sandwiches.tsx";
import { useTheme } from "../App.tsx";
import { ThemeType } from "../Types.tsx";

export default function Landing__page() {

  const { theme } = useTheme() as ThemeType;

  return (
    <section id="page" className={`landing__page ${theme ? "dark__theme__PURE_BLACK" : ""}`}>
      <IntroCarousel />
      <IntroExpect />
      <MainPopular />
    </section>
  );
}
