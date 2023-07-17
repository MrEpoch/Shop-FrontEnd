import "./Main__products__shop.css";
import Sandwich_card from "./sandwich-card";
import { useSandwich } from "../../Sandwich_context";
import React from "react";
import { SandwichContextType } from "../../Types";


export default function Main__products(): React.JSX.Element {
  const { sandwich } = useSandwich() as SandwichContextType;

  return (
    <div className="shop__main__products">
      <div className="shop__main__products__filters"></div>
      <div className="shop__main__products__products">
        <h3>Popular sandwiches</h3>
        <Sandwich_card sandwich={sandwich} />
      </div>
    </div>
  );
}
