import "./Main__products__shop.css";
import Rating from '@mui/material/Rating';
import TempImage from "../../assets/sandwich-2.jpg";
import Badge from '@mui/material/Badge';

const temp__products = [
    {
        name: "Chicken Sandwich",
        description: "Our favourite classic chicken sandwich",
        image: TempImage,
        price: 5.99,
        rating: 4.5,
        numReviews: 10,
        countInStock: 10
    }
];

export default function Main__products() {
    return (
        <div className="shop__main__products">
            <div className="shop__main__products__filters">

            </div>
            <div className="shop__main__products__products">
                <h3>Popular sandwiches</h3>
                <div className="shop__main__products__products__container">
                    {temp__products.map((product, index) => (
                        <div className="shop__main__products__products__container__product" key={index}>
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
                                <button className="button">Add to cart</button>
                            </div>
                        </div>
                    ))}           
                </div>
            </div>
        </div>
    )
}
