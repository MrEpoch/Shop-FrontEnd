import "./Main__products__shop.css";

const temp__products = [
    {
        name: "Chicken Sandwich",
        description: "Our favourite classic chicken sandwich",
        image: "sandwich-1.png",
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
                                    <span>{product.rating} stars</span>
                                    <span>{product.numReviews} reviews</span>
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
