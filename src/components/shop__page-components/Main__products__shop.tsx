import "./Main__products__shop.css";
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import { useTheme } from "../../Theme_context";
import { CartType, ThemeType } from "../../Types";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCart } from "../../Cart_context";
import { SandwichType } from "../../Types";
import { useSandwich } from "../../Sandwich_context";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../Account_context";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export const queryClient = new QueryClient();

export default function Main__products() {

    const { Add_to_cart } = useCart() as CartType;
    const { sandwich, error, isLoading } = useSandwich();
    const { loggedIn, favourites } = useAccount();

    const navigate = useNavigate();

    const { theme } = useTheme() as ThemeType;
    
    if (error) return <div>Something went wrong...</div>
    return (
    <QueryClientProvider client={queryClient}>
        <div className="shop__main__products">
            <div className="shop__main__products__filters">

            </div>
            <div className="shop__main__products__products">
                <h3>Popular sandwiches</h3>
                {isLoading ? <div>Loading...</div> : (
                <div className="shop__main__products__products__container">
                    {sandwich && sandwich.map((product: SandwichType, index: number) => (
                        <div className={`shop__main__products__products__container__product ${theme ? "dark__theme" : ""}`} key={index}>
                            {loggedIn ? 
                                <div className="shop__main__products__products__container__product__favorite">
                                    {favourites && favourites.includes(product.id) ? <StarIcon /> : <StarBorderIcon />}
                                </div> : ""
                            }
                            <div onClick={() => navigate("/shop/" + product.id)} className="shop__main__products__products__container__product__image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="shop__main__products__products__container__product__info">
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <div className="shop__main__products__products__container__product__info__rating">
                                    <Badge badgeContent={product.numReviews} color="primary">
                                        <Rating className="ratingItem" name="read-only" precision={0.5} value={product.rating} readOnly />
                                    </Badge>
                                </div>
                                <h5>${product.price}</h5>
                                <button onClick={() => Add_to_cart(product.id, product.name, product.image, product.price)} className="button">Add to cart</button>
                            </div>
                        </div>
                    ))}         
                </div>
                )}
            </div>
        </div>
    </QueryClientProvider>
    )
}
