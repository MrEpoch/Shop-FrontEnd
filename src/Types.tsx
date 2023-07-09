export interface ChildrenProp {
  children: React.ReactNode;
}

export type ThemeType = {
    theme: boolean,
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export type CartType = {
    cart: Array<CartProductType>,
    setCart: React.Dispatch<React.SetStateAction<CartProductType[]>>
    Remove_from_cart: (sandwichId: string) => void,
    Add_to_cart: (sandwichId: string, sandwichName: string, sandwichImage: string) => Array<CartProductType>
}

export type CartProductType = {
    id: string,
    name: string,
    image: string,
    quantity: number
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
