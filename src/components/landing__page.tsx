import IntroCarousel from "./landing__page-components/intro__carousel"
import IntroExpect from "./landing__page-components/intro__expect_cards"
import "./landing__page.css"

export default function Landing__page() {
    return (
        <section className="landing__page">
            <IntroCarousel />
            <IntroExpect />
        </section>
    )
}
