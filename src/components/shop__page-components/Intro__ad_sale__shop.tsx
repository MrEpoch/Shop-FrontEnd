import "./Intro__ad_sale__shop.css";
import Sandwich from "../../assets/sandwich-4.png";

export default function Intro_ad() {
    return (
        <div className="shop__intro__ad">
                <div className="shop__intro__ad__container__text">
                    <h2>Great deal 30% off on Chicken sandwiches</h2>
                    <button className="button">Buy now</button>
                </div>
                <div className="shop__intro__ad__container__image">
                    <img src={Sandwich} alt="sandwich" />
                </div>
        </div>
    )
}
