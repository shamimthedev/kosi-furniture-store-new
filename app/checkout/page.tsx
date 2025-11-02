'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Lock, Shield, Truck, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import type { ShippingAddress, PaymentMethod } from "@/types"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, totalPrice } = useCartStore()
  const [currentStep, setCurrentStep] = useState<'information' | 'payment' | 'review'>('information')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Bangladesh'
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'cod'
  })

  const [paymentDetails, setPaymentDetails] = useState({
    phone: '',
    transactionId: ''
  })

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('review')
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate order data to pass to success page
      const orderData = {
        orderNumber: `KOSI-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        shippingAddress,
        paymentMethod,
        total: finalTotal,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      }

      // Store order data in sessionStorage to persist during redirect
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
      
      // Redirect to success page first, then clear cart
      router.push('/order-success')
      
    } catch (error) {
      console.error('Order submission failed:', error)
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0 && !isSubmitting) {
    // Only show empty cart if we're not in the process of submitting an order
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
            <p className="text-gray-600 mb-8">
              Please add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const shippingCost = 0 // Free shipping
  const tax = totalPrice * 0.05 // 5% tax
  const finalTotal = totalPrice + shippingCost + tax
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-4">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {['information', 'payment', 'review'].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex flex-col items-center ${index < 2 ? 'flex-1' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${
                    currentStep === step 
                      ? 'bg-primary border-primary text-white' 
                      : currentStep > step
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-gray-500 bg-white'
                  }`}>
                    {currentStep > step ? '✓' : index + 1}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-600 capitalize">
                    {step === 'information' ? 'Shipping' : step}
      </span>
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'information' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Shipping Information</h2>
                
                <form onSubmit={handleAddressSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          firstName: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          lastName: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          city: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          state: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          zipCode: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    {/* Cash on Delivery */}
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod.type === 'cod'}
                        onChange={() => setPaymentMethod({ type: 'cod' })}
                        className="text-primary focus:ring-primary"
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">Cash on Delivery</span>
                          <Truck className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>

                    {/* bKash */}
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="bKash"
                        checked={paymentMethod.type === 'bKash'}
                        onChange={() => setPaymentMethod({ type: 'bKash' })}
                        className="text-primary focus:ring-primary"
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">bKash</span>
                          <Shield className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Secure payment via bKash
                        </p>
                      </div>
                    </label>

                    {/* Nagad */}
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="nagad"
                        checked={paymentMethod.type === 'nagad'}
                        onChange={() => setPaymentMethod({ type: 'nagad' })}
                        className="text-primary focus:ring-primary"
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">Nagad</span>
                          <Shield className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Secure payment via Nagad
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Payment Details */}
                  {(paymentMethod.type === 'bKash' || paymentMethod.type === 'nagad') && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="font-semibold text-lg text-primary mb-4">
                        {paymentMethod.type === 'bKash' ? 'bKash' : 'Nagad'} Payment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {paymentMethod.type === 'bKash' ? 'bKash' : 'Nagad'} Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={paymentDetails.phone}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              phone: e.target.value
                            }))}
                            placeholder="01XXXXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={paymentDetails.transactionId}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              transactionId: e.target.value
                            }))}
                            placeholder="Enter transaction ID"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                          />
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800">
                            <strong>Instructions:</strong> Send {finalTotal.toFixed(2)} BDT to {paymentMethod.type === 'bKash' ? 'bKash' : 'Nagad'} number 01XXXXXXXX and enter the transaction ID above.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('information')}
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Review Your Order</h2>
                
                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-primary mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-primary">{item.title}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-primary mb-4">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-900">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </p>
                    <p className="text-gray-600">{shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-600">{shippingAddress.country}</p>
                    <p className="text-gray-600 mt-2">
                      {shippingAddress.email} | {shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-primary mb-4">Payment Method</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-medium text-gray-900 capitalize">
                      {paymentMethod.type === 'cod' ? 'Cash on Delivery' : paymentMethod.type}
                    </p>
                    {paymentMethod.type !== 'cod' && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Phone: {paymentDetails.phone}</p>
                        <p>Transaction ID: {paymentDetails.transactionId}</p>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit}>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-800 font-medium">
                  Secure Checkout
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}