import "./Main__products__shop.css";
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import { useTheme } from "../../Theme_context";
import { CartType, ThemeType } from "../../Types";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { GetSandwiches } from "../../API_requests";
import { useCart } from "../../Cart_context"
import { SandwichType } from "../../Types";

export const queryClient = new QueryClient();

export default function Main__products() {

    const { Add_to_cart } = useCart() as CartType;

    const {isLoading, error, data} = useQuery<any[], Error>('sandwiches', GetSandwiches, {
        staleTime: 1000 * 60 * 60,
    });

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
                    {data && data.map((product: SandwichType, index: number) => (
                        <div className={`shop__main__products__products__container__product ${theme ? "dark__theme" : ""}`} key={index}>
                            <div className="shop__main__products__products__container__product__image">
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
