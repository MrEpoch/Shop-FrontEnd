import { useNavigate } from "react-router-dom";
import { useAccount } from "../../Account_context";
import { useSandwich } from "../../Sandwich_context";
import { useTheme } from "../../Theme_context";
import { AccountContextType, CartType, SandwichContextType, ThemeType } from "../../Types";
import { useCart } from "../../Cart_context";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { SandwichType } from "../../Types";
import Badge from "@mui/material/Badge";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import React from "react";
import { CircularProgress } from "@mui/material";
import "./Main__products__shop.css";

export default function Sandwich_card({ sandwich } : { sandwich: SandwichType[] }): React.JSX.Element {
  const { theme } = useTheme() as ThemeType;

  const { Add_to_cart } = useCart() as CartType;
  const { error, isLoading } = useSandwich() as SandwichContextType;
  const { loggedIn, favourites, mutate } = useAccount() as AccountContextType;

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <div className="item_loader">
            <CircularProgress />
        </div>
      ) : (
        !error && (
          <div className="shop__main__products__products__container">
            {error && (
              <Alert
                severity="error"
                style={{
                  position: "fixed",
                  zIndex: 10,
                  right: "1%",
                  bottom: "0%",
                }}
                className="error__auth"
              >
                {error}
              </Alert>
            )}
            {sandwich &&
              sandwich.map((product: SandwichType, index: number) => (
                <div
                  className={`shop__main__products__products__container__product ${
                    theme ? "dark__theme" : ""
                  }`}
                  key={index}
                >
                  {loggedIn ? (
                    <div
                      onClick={() => {
                        mutate(product.id);
                      }}
                      className="shop__main__products__products__container__product__favorite"
                    >
                      {favourites && favourites.includes(product.id) ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    onClick={() => navigate("/shop/" + product.id)}
                    className="shop__main__products__products__container__product__image"
                  >
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="shop__main__products__products__container__product__info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="shop__main__products__products__container__product__info__rating">
                      {product.numReviews > 0 && (
                        <Badge
                          badgeContent={product.numReviews}
                          color="primary"
                        >
                          <Rating
                            className="ratingItem"
                            name="read-only"
                            precision={0.5}
                            value={product.rating}
                            readOnly
                          />
                        </Badge>
                      )}
                    </div>
                    <h5 className={`${theme ? "price__DARK" : ""}`}>
                      ${product.price}
                    </h5>
                    <button
                      onClick={() =>
                        Add_to_cart(
                          product.id,
                          product.name,
                          product.image,
                          product.price,
                        )
                      }
                      className="button"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )
      )}
    </>
  );
}
