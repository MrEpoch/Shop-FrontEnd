import "./main__popular_sandwiches.css";
import { useSandwich } from "../../Sandwich_context";
import { SandwichType } from "../../Types";
import Sandwich_card from "../shop__page-components/sandwich-card";

export default function Popular__sandwiches() {
  const { sandwich } = useSandwich();

  Array.prototype.three_best = function () {
    return this.sort((a: SandwichType, b: SandwichType) => {
      return b.numReviews - a.numReviews;
    }).slice(0, 3);
  };

  return (
    <section className="shop-popular__sandwiches">
      <h1>
        Popular <span>Sandwiches</span>
      </h1>
      <div className="shop-popular__sandwiches__container">
        <Sandwich_card sandwich={sandwich.three_best()} />
      </div>
    </section>
  );
}
