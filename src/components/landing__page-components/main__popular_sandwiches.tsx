import "./main__popular_sandwiches.css";
import Sandwich1 from "../../assets/sandwich-1.jpg";
import Sandwich2 from "../../assets/sandwich-2.jpg";
import Sandwich3 from "../../assets/sandwich-3.jpg";
import { useTheme } from "../../App";
import { ThemeType } from "../../Types";

export const sandwichData = [
    {
        name: "The Classic",
        img: Sandwich1
    },
    {
        name: "The Cheeky Chicken",
        img: Sandwich2
    },
    {
        name: "The Beefer",
        img: Sandwich3
    }
];
    
export default function Popular__sandwiches() {

    const { theme } = useTheme() as ThemeType;

    return (
        <section className="shop-popular__sandwiches">
            <h1>Popular <span>Sandwiches</span></h1>
            <div className="shop-popular__sandwiches__container">
                {
                    sandwichData.map((val, index) => (
                        <div key={index} className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={val.img} alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <h3>{val.name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content card__price">
                                <h3>$5.99</h3>
                                <button className="button">Add to cart</button>
                                <button className="button">Buy now</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
