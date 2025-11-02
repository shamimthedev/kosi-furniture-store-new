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

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentMethod {
  type: 'cod' | 'bKash' | 'nagad'
  details?: {
    phone?: string
    transactionId?: string
  }
}

export interface Order {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: Date
}