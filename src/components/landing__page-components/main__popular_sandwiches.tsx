import "./main__popular_sandwiches.css";
import { useSandwich } from "../../Sandwich_context";
import { SandwichContextType, SandwichType } from "../../Types";
import Sandwich_card from "../shop__page-components/sandwich-card";

declare global {
      interface Array<T> {
        three_best(): Array<T>;
      }
}

export default function Popular__sandwiches(): React.JSX.Element {
  const { sandwich } = useSandwich() as SandwichContextType;
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
