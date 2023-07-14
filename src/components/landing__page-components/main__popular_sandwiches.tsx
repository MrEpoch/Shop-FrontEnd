import "./main__popular_sandwiches.css";
import { useTheme } from "../../Theme_context";
import { CartType, ThemeType } from "../../Types";
import { useSandwich } from "../../Sandwich_context";
import { useAccount } from "../../Account_context";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { SandwichType } from "../../Types";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Rating from "@mui/material/Rating";
import { useCart } from "../../Cart_context";
import Alert from "@mui/material/Alert";

export default function Popular__sandwiches() {
  const { theme } = useTheme() as ThemeType;
  const { sandwich, error } = useSandwich();
  const { loggedIn, favourites, mutate } = useAccount();
  const { Add_to_cart } = useCart() as CartType;

  const navigate = useNavigate();

  Array.prototype.three_best = function () {
    return this.sort((a: SandwichType, b: SandwichType) => {
        return b.numReviews - a.numReviews;
        })
        .slice(0, 3);
  };

  if (error) return <p>Error</p>;

  return (
    <section className="shop-popular__sandwiches">
      <h1>
        Popular <span>Sandwiches</span>
      </h1>
      <div className="shop-popular__sandwiches__container">
        {error  && (
            <Alert
              severity="error"
              style={{ position: "fixed", zIndex: 10, right: "1%", bottom: "0%" }}
              className="error__auth"
            >
              {error}
            </Alert>
          )}
        {sandwich &&
                sandwich.three_best().map((product: SandwichType, index: number) => (
                  <div
                    className={`shop__main__products__products__container__product ${
                      theme ? "dark__theme" : ""
                    }`}
                    key={index}
                  >
                    {loggedIn ? (
                      <div onClick={() => {mutate(product.id)}} id="star_color" className="shop__main__products__products__container__product__favorite">
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
                      </div>
                      <h5 className={`${theme ? "price__DARK" : ""}`}>${product.price}</h5>
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
                ))}      </div>
    </section>
  );
}
