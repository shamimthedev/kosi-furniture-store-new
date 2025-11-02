'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"

export default function CartPage() {
  const { cartItems, totalQuantity, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore()
  const [isUpdating, setIsUpdating] = useState<string | number | null>(null)

  const handleIncrease = async (id: string | number) => {
    setIsUpdating(id)
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
    increaseQuantity(id)
    setIsUpdating(null)
  }

  const handleDecrease = async (id: string | number) => {
    setIsUpdating(id)
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
    decreaseQuantity(id)
    setIsUpdating(null)
  }

  const handleRemove = async (id: string | number) => {
    setIsUpdating(id)
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
    removeFromCart(id)
    setIsUpdating(null)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-primary text-3xl md:text-4xl font-bold text-primary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-primary">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-primary mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                            
                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl font-bold text-productPrice">
                                ${item.price}
                              </span>
                              {item.oldPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                  ${item.oldPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            disabled={isUpdating === item.id}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleDecrease(item.id)}
                              disabled={isUpdating === item.id || item.quantity <= 1}
                              className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium bg-white min-w-[60px] text-center border-x border-gray-300">
                              {isUpdating === item.id ? (
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => handleIncrease(item.id)}
                              disabled={isUpdating === item.id}
                              className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Item Total</p>
                            <p className="text-lg font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors duration-200"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <p className="text-xs text-gray-600">Secure Payment</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold text-sm">↻</span>
                    </div>
                    <p className="text-xs text-gray-600">Easy Returns</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold text-sm">🚚</span>
                    </div>
                    <p className="text-xs text-gray-600">Free Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}