import "./Cart_main.css";
import { Badge } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useCart } from "../../Cart_context";
import { CartType, ThemeType } from "../../Types";
import { useTheme } from "../../Theme_context";

export default function Cart__main() {
  const [openModal, setOpenModal] = useState(false);

  const { theme } = useTheme() as ThemeType;

  const { Get_cart_length, Get_cart } = useCart() as CartType;

  return (
    <div className="shop__cart_modal">
      <Badge
        onClick={() => setOpenModal(true)}
        style={{ padding: "5px" }}
        badgeContent={Get_cart_length()}
        color="secondary"
      >
        <CartIcon className="clickable" />
      </Badge>
      <div className={`modal ${openModal ? "is-active" : ""}`}>
        <div
          onClick={() => setOpenModal(false)}
          className="modal-background background_style_modal"
        ></div>
        <div className={`modal-card ${theme ? "dark__modal__body" : ""}`}>
          <header
            className={`modal-card-head ${theme ? "dark__modal__header" : ""}`}
          >
            <p className="modal-card-title">Shopping Cart</p>
            <button
              className="delete"
              onClick={() => setOpenModal(false)}
              aria-label="close"
            ></button>
          </header>
          <section
            className={`modal-card-body ${theme ? "dark__modal__body" : ""}`}
          >
            <div className="shop__cart__modal__items">
              {Get_cart().map((item, index) => (
                <div key={index} className="shop__cart__modal__item">
                  <div className="shop__cart__modal__item__image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="shop__cart__modal__item__info">
                    <h1>{item.name}</h1>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <footer
            className={`modal-card-foot ${theme ? "dark__modal__header" : ""}`}
          >
            <button onClick={() => setOpenModal(false)} className="button">
              Continue shopping
            </button>
            <button className="button is-success">Proceed to pay</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
