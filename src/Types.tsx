import { MutateFunction } from "react-query";

export interface ChildrenProp {
  children: React.ReactNode;
}

export type ThemeType = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CartType = {
  Remove_from_cart: (sandwichId: string) => void;
  Add_to_cart: (
    sandwichId: string,
    sandwichName: string,
    sandwichImage: string,
    sandwichPrice: string,
  ) => Array<CartProductType>;
  Get_cart_length: () => number;
  Get_cart: () => Array<CartProductType>;
};

export type CartProductType = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: string;
};

export type SandwichType = {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  comments: Array<CommentType>;
};

export type userType = {
  id: string;
  name: string;
  password: string;
  createdAt: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  country: string;
  orders: Array<OrderType>;
  favouritesId: Array<string>;
  banned: boolean;
};

export type OrderType = {
  id: number;
  createdAt: number;
  total: number;
  status: OrderStatus;
  items: string[];
  userId: string[];
};

enum OrderStatus {
  pending,
  completed,
  cancelled,
  processing,
}

export type CommentType = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  belongsToId: string;
  belongsToSandwichId: string;
};

export type AccountContextType = {
  account: userType;
  error: string;
  handleLogout: () => void;
  isLoading: boolean;
  favourites: string[];
  mutate: MutateFunction<userType, unknown, string, unknown>;
  Fill_user_account: (data: userType) => void;
  loggedIn: boolean;
  Update_account_favourites: (id: string) => Promise<void>;
};

export type SandwichContextType = {
    sandwich: SandwichType[];
    isLoading: boolean;
    error: string;
}
