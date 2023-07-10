
export default function Item_main({ item }) {

    return (
        <div className="item__main">
            <div className="item__main__image">
            </div>
            <div className="item__main__info">
                <h1>{item.name}</h1>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
            </div>
            <div className="item__main__button">
                <button className="button is-success">Add to cart</button>
            </div>
            <div className="item__main__description">
                <p>{item.description}</p>
            </div>
        </div>
    )
}
