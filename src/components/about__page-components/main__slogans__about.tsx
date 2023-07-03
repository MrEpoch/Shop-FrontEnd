import "./main__slogans__about.css";
import Fresh from "../../assets/fresh__ingredients.png";
import Care from "../../assets/shop__worker.png";
import Classic from "../../assets/sandwich-styled.png";


export default function Slogans() {
    return (
        <div className="about__slogans">
            <div id="fresh" className="about__slogans__info">
                <div className="about__slogans__info__text">
                    <h2 className="about__slogans__info__title">Fresh Ingredients</h2>
                    <p className="about__slogans__info__description">
                        Our unwavering dedication to using fresh ingredients stems from our belief that the essence of a classic sandwich
                        lies in the natural flavors and vibrant textures found in quality ingredients.
                        We work closely with local suppliers and farmers who share our passion for excellence,
                        ensuring that our sandwiches are made with ingredients that are sustainably and ethically sourced.
                    </p>
                </div>
                <img id="rotate-right" src={Fresh} alt="Fresh ingredients" />
            </div>
            <div id="taste" className="about__slogans__info">
                <div className="about__slogans__info__text">
                    <h2 className="about__slogans__info__title">Classic taste</h2>
                    <p className="about__slogans__info__description">
                        We believe that authenticity is key when it comes to crafting memorable sandwiches.
                        We meticulously research and recreate the recipes that have stood the test of time,
                        capturing the essence of the classics that have delighted taste buds for generations.
                        From the perfectly seasoned roast beef of a classic French dip to the tangy and creamy dressing of a timeless Caesar sandwich,
                        we strive to honor the authentic flavors that have become beloved staples.
                    </p>
                </div>
                <img id="rotate-left" src={Classic} alt="Fresh ingredients" />
            </div>
            <div id="service" className="about__slogans__info">
                <div className="about__slogans__info__text">
                    <h2 className="about__slogans__info__title">We care about you</h2>
                    <p className="about__slogans__info__description">
                        From the moment you interact with us, we strive to ensure your satisfaction.
                        Our knowledgeable and friendly staff is ready to assist you in navigating our menu, suggesting pairing options,
                        accommodating dietary preferences, or answering any questions you may have.
                        We are committed to providing personalized attention and going the extra mile to ensure that your experience with us is exceptional.
                    </p>
                </div>
                <img id="rotate-right" src={Care} alt="Fresh ingredients" />
            </div>
        </div>
    )
}
