import { Routes, Route } from "react-router-dom";
import Landing__page from "./components/landing__page";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Router() {
    return (
    <>
        <Routes>
            <Route path="/" element={
                <>
                    <Header />
                    <Landing__page />
                    <Footer />
                </>
            }
                children={
                    <Route path="s" element={
                        <></>
                }/>}
             />
        </Routes>
    </>
    )
}
