import "./landing__page.css";
import IntroCarousel from "./landing__page-components/intro__carousel";
import IntroExpect from "./landing__page-components/intro__expect_cards";
import MainPopular from "./landing__page-components/main__popular_sandwiches.tsx";

export default function Landing__page() {
  return (
    <section className="landing__page">
      <IntroCarousel />
      <IntroExpect />
      <MainPopular />
    </section>
  );
}
