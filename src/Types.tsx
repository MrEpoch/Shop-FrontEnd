export interface ChildrenProp {
  children: React.ReactNode;
}

export type ThemeType = {
    theme: boolean,
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export type CartType = {
    Remove_from_cart: (sandwichId: string) => void,
    Add_to_cart: (sandwichId: string, sandwichName: string, sandwichImage: string, sandwichPrice: string) => Array<CartProductType>
    Get_cart_length: () => number,
    Get_cart: () => Array<CartProductType>
}

export type CartProductType = {
    id: string,
    name: string,
    image: string,
    quantity: number,
    price: string
}

export type SandwichType = {
    id: string,
    name: string,
    image: string,
    price: string,
    description: string,
    rating: number,
    numReviews: number,
    countInStock: number,
    comments: Array<CommentType>
}

export type CommentType = {
    id: string,
    name: string,
    rating: number,
    comment: string,
    createdAt: string,
    belongsToId: string,
    belongsToSandwichId: string
}
