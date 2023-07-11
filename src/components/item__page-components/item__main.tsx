import { useParams } from "react-router-dom";
import { useSandwich } from "../../Sandwich_context"
import { useMemo, useState } from "react";
import { Button, Image, Stack } from "react-bootstrap";
import "./item__main.css";
import { useTheme } from "../../Theme_context";
import { CartType, ThemeType } from "../../Types";
import { useCart } from "../../Cart_context";

export default function Item_main() {

    const [current_sandwich, setCurrent_sandwich] = useState<any>({});

    const { id } = useParams();
    const { sandwich } = useSandwich();
    const { theme } = useTheme() as ThemeType;
    const { Add_to_cart } = useCart() as CartType;

    useMemo(() => {
        if (sandwich) {
            setCurrent_sandwich(sandwich.find((item:any) => item.id === id));
        }
    }, [sandwich]);

    return (
        <Stack gap={3} className={`shop__item-grid ${theme ? "shop__item__background_dark" : ""}`}>
            <Image src={current_sandwich.image} alt={current_sandwich.name} className="item__image__sizes"  />
            <h1 className="shop__item-title">{current_sandwich.name}</h1>
            <p className="p-2 shop__item-description">{current_sandwich.description}</p>
            <p className="p-2 shop__item-price">${current_sandwich.price}</p>
            <Button onClick={() => Add_to_cart(current_sandwich.id, current_sandwich.name, current_sandwich.image, current_sandwich.price)} variant="primary" className="shop__item__add-to-cart">Add to cart</Button>
        </Stack>
    )
}
