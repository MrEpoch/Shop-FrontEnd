import { AccountContextType, SandwichContextType, CartType, ThemeType } from "./Types";
import { createContext } from "react";

export const AccountContext = createContext<AccountContextType | object>({});
export const CartContext = createContext<CartType | object>({});
export const SandwichContext = createContext<SandwichContextType | object>({});
export const ThemeContext = createContext<ThemeType | object>({});
