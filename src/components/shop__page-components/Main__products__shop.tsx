import "./Main__products__shop.css";
import { QueryClient } from "react-query";
import Sandwich_card from "./sandwich-card";
import { useSandwich } from "../../Sandwich_context";

export const queryClient = new QueryClient();

export default function Main__products() {
  
  const { sandwich } = useSandwich();

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
