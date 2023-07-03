import { ThemeType } from "../Types";
import { useTheme } from "../router";
import "./shop__page.css";
import Shop__intro__ad from "./shop__page-components/Intro__ad_sale__shop.tsx";
import Shop__main__products from "./shop__page-components/Main__products__shop.tsx";

export default function Shop__page() {
    
    const { theme } = useTheme() as ThemeType;

    return (
        <section style={{ width: "100%" }} className={`shop__page ${theme ? "dark__theme__PURE_BLACK" : ""}`}>
            <Shop__intro__ad />
            <Shop__main__products />
        </section>
    )
}
