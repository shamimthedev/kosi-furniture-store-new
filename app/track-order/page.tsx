'use client'

import { useState } from "react"
import Link from "next/link"
import { Search, Truck, Package, CheckCircle, Clock } from "lucide-react"

interface TrackingStep {
  name: string
  status: 'completed' | 'current' | 'pending'
  date: string
}

interface TrackingInfo {
  status: string
  steps: TrackingStep[]
  estimatedDelivery: string
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate tracking info
    setTrackingInfo({
      status: 'shipped',
      steps: [
        { name: 'Order Placed', status: 'completed', date: '2024-01-15 10:30 AM' },
        { name: 'Order Confirmed', status: 'completed', date: '2024-01-15 11:00 AM' },
        { name: 'Shipped', status: 'completed', date: '2024-01-16 09:15 AM' },
        { name: 'Out for Delivery', status: 'current', date: 'Expected 2024-01-18' },
        { name: 'Delivered', status: 'pending', date: '' }
      ],
      estimatedDelivery: 'January 18, 2024'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
            Track Your Order
          </h1>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., KOSI-123456)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track Order
              </button>
            </form>
          </div>

          {trackingInfo && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Order #{orderNumber || 'KOSI-123456'}
                </h2>
                <p className="text-gray-600">
                  Estimated Delivery: {trackingInfo.estimatedDelivery}
                </p>
              </div>

              {/* Tracking Timeline */}
              <div className="max-w-2xl mx-auto">
                <div className="space-y-8">
                  {trackingInfo.steps.map((step: TrackingStep) => (
                    <div key={step.name} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'current' ? 'bg-primary' : 'bg-gray-300'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : step.status === 'current' ? (
                          <Clock className="w-4 h-4 text-white" />
                        ) : (
                          <Package className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          step.status === 'completed' ? 'text-green-600' :
                          step.status === 'current' ? 'text-primary' : 'text-gray-400'
                        }`}>
                          {step.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors duration-200"
                >
                  Need help with your order?
                </Link>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}