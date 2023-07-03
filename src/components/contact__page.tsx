import "./contact__page.css";
import Intro__MyInfo from "./contact__page-components/intro__my-info.tsx";
import { useTheme } from "../App.tsx";
import { ThemeType } from "../Types.tsx";

export default function Contact__page() {
    
    const { theme } = useTheme() as ThemeType;

    return (
        <section className={`contact__page ${theme ? "dark__theme__PURE_BLACK" : ""}`}>
            <Intro__MyInfo />
        </section>
    )
}
