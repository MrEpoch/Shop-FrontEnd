import { useNavigate, useParams } from "react-router-dom";
import { useSandwich } from "../../Sandwich_context";
import React, { useMemo, useState } from "react";
import { Button, Image, Stack } from "react-bootstrap";
import "./item__main.css";
import { useTheme } from "../../Theme_context";
import { CartType, SandwichContextType, SandwichType, ThemeType } from "../../Types";
import { useCart } from "../../Cart_context";
import { CircularProgress } from "@mui/material";

export default function Item_main(): React.JSX.Element {

  const { id } = useParams();
  const { sandwich } = useSandwich() as SandwichContextType;
  const { theme } = useTheme() as ThemeType;
  const { Add_to_cart } = useCart() as CartType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [current_sandwich, setCurrent_sandwich] = useState<SandwichType>({} as SandwichType);

  useMemo(() => {
    setLoading(true);
    if (sandwich) {
        const selected_sandwich = sandwich.find((item: SandwichType) => item.id === id);
        if (!selected_sandwich) return navigate("/shop");
        setLoading(false);
        setCurrent_sandwich(selected_sandwich);
    } else {
        navigate("/shop");
    }
  }, [sandwich, id, navigate]);

  return (
  <>
  {loading ? (
    <div className="load_backdrop_normal">
        <CircularProgress />
    </div>
    ) : (
    <Stack
      gap={3}
      className={`shop__item-grid ${
        theme ? "shop__item__background_dark" : ""
      }`}
    >
      <Image
        src={current_sandwich.image}
        alt={current_sandwich.name}
        className="item__image__sizes"
      />
      <h1 className="shop__item-title">{current_sandwich.name}</h1>
      <p className="p-2 shop__item-description">
        {current_sandwich.description}
      </p>
      <p className="p-2 shop__item-price">${current_sandwich.price}</p>
      <Button
        onClick={() =>
          Add_to_cart(
            current_sandwich.id,
            current_sandwich.name,
            current_sandwich.image,
            current_sandwich.price,
          )
        }
        variant="primary"
        className="shop__item__add-to-cart"
      >
        Add to cart
      </Button>
    </Stack>
  )}
  </>
  );
}
