import { useParams } from "react-router-dom";
import { useSandwich } from "../../Sandwich_context"
import { useMemo, useState } from "react";

export default function Item_main() {

    const [current_sandwich, setCurrent_sandwich] = useState<any>({});

    const { id } = useParams();

    const { sandwich } = useSandwich();
    
    useMemo(() => {
        if (sandwich) {
            setCurrent_sandwich(sandwich.find((item:any) => item.id === id));
        }
    }, [sandwich]);

    return (
        <div className="item__main">
            <div className="item__main__image">
                <img src={current_sandwich.image} alt={current_sandwich.name} />
            </div>
            <div className="item__main__info">
                <h1>{current_sandwich.name}</h1>
                <p>Price: ${current_sandwich.price}</p>
                <p>Quantity: {current_sandwich.quantity}</p>
            </div>
            <div className="item__main__button">
                <button className="button is-success">Add to cart</button>
            </div>
            <div className="item__main__description">
                <p>{current_sandwich.description}</p>
            </div>
        </div>
    )
}
