import "./App.css";
import { createContext, useContext, useState } from "react";
import { CartProductType, CartType, ChildrenProp } from "./Types";

const CartContext = createContext<CartType | object>({});

export function useCart() {
    const value = useContext(CartContext);
    if (value === null) return {};
    return value;
}

export default function Cart_context({ children } : ChildrenProp) {
   
   const [cart, setCart] = useState<CartProductType[]>([]);

   function Add_to_cart(sandwichId: string, sandwichName: string, sandwichImage: string) {
        const newCart = [...cart];
        const itemCheck = newCart.find((item: CartProductType) => item.id === sandwichId);
        if (itemCheck && Object.keys(itemCheck).includes("quantity") && itemCheck.quantity) {
            itemCheck.quantity++;
            newCart.splice(newCart.findIndex((item: CartProductType) => item.id === sandwichId), 1, itemCheck);
        } else {
            newCart.push({
                id: sandwichId,
                name: sandwichName,
                image: sandwichImage,
                quantity: 1
            });
        }
        setCart(newCart);
        return newCart;
    }

   function Remove_from_cart(sandwichId: string) {
        setCart((prev: CartProductType[]) => prev.filter((item: CartProductType) => item.id !== sandwichId));
   }

   const value: CartType = {
       cart,
       setCart,
       Remove_from_cart,
       Add_to_cart
  }; 
  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  );
}

