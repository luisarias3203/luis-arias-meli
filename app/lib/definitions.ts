export interface ItemMeliProps {
  id: string
  title: string
  price: number
  currency_id: string
  thumbnail: string
  condition: string
  shipping: { free_shipping: boolean }
  seller_address: { city: { name: string } }
}

export interface AuthorProps {
  name: string
  lastName: string
}

export interface CategoriesProps {
  categories: string[]
}

export interface PriceProps {
  currency: string
  amount: number
  decimals: number
}

export interface ItemProps {
  id: string
  title: string
  price: PriceProps
  picture: string
  condition: string
  freeShipping: boolean
}

export interface AdditionalItemProps {
  soldQuantity: number
}

export interface ItemsProps {
  items: ItemProps[]
}

export interface ItemsResponseProps {
  author: AuthorProps
  categories?: CategoriesProps
  items: ItemsProps
}

export interface ItemResponseProps {
  author: AuthorProps
  item: ItemProps & AdditionalItemProps
}

export interface DescriptionResponseProps {
  description: string
}
