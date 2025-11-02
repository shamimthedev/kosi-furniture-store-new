export interface Product {
  id: string | number
  title: string
  price: number
  oldPrice?: number
  image: string
  category: string
  badgeText?: string
  className?: string
  rating?: number
  reviews?: number
  isNew?: boolean
  isBestSeller?: boolean
  quantity?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartStore {
  cartItems: CartItem[]
  totalQuantity: number
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (id: string | number) => void
  increaseQuantity: (id: string | number) => void
  decreaseQuantity: (id: string | number) => void
  clearCart: () => void
}