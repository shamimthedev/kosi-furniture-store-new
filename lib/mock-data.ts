import { Product } from "@/types"
import Product3 from "@/public/images/product-3.png"
import Product4 from "@/public/images/product-4.png"
import Product6 from "@/public/images/product-6.png"

export const mockProducts: Product[] = [
  { 
    id: 1, 
    title: "Premium Sport Jacket", 
    price: 30, 
    oldPrice: 45, 
    image: Product3.src, 
    category: "Sportswear", 
    badgeText: "-33%", 
    className: "bg-red-500 text-white",
    rating: 4.8,
    reviews: 156,
    isNew: false,
    isBestSeller: true
  },
  { 
    id: 2, 
    title: "Luxury Travel Backpack", 
    price: 25, 
    oldPrice: 35, 
    image: Product4.src, 
    category: "Accessories", 
    badgeText: "-29%", 
    className: "bg-orange-500 text-white",
    rating: 4.6,
    reviews: 89,
    isNew: true,
    isBestSeller: false
  },
  { 
    id: 3, 
    title: "Smart Fitness Watch", 
    price: 120, 
    oldPrice: 150, 
    image: Product6.src, 
    category: "Wearable Tech",
    badgeText: "-20%", 
    className: "bg-blue-500 text-white",
    rating: 4.9,
    reviews: 203,
    isNew: false,
    isBestSeller: true
  },
  { 
    id: 4, 
    title: "Advanced Smart Watch Pro", 
    price: 180, 
    oldPrice: undefined, 
    image: Product6.src, 
    category: "Wearable Tech",
    rating: 4.7,
    reviews: 124,
    isNew: true,
    isBestSeller: false
  },
  { 
    id: 5, 
    title: "Elite Sport Jacket", 
    price: 45, 
    oldPrice: 60, 
    image: Product3.src, 
    category: "Sportswear", 
    badgeText: "-25%", 
    className: "bg-green-500 text-white",
    rating: 4.5,
    reviews: 67,
    isNew: false,
    isBestSeller: false
  },
  { 
    id: 6, 
    title: "Designer Leather Backpack", 
    price: 85, 
    oldPrice: 110, 
    image: Product4.src, 
    category: "Accessories", 
    badgeText: "-23%", 
    className: "bg-purple-500 text-white",
    rating: 4.4,
    reviews: 45,
    isNew: false,
    isBestSeller: false
  },
  { 
    id: 7, 
    title: "Health Monitor Watch", 
    price: 95, 
    oldPrice: 120, 
    image: Product6.src, 
    category: "Wearable Tech",
    badgeText: "-21%", 
    className: "bg-teal-500 text-white",
    rating: 4.3,
    reviews: 78,
    isNew: false,
    isBestSeller: false
  },
  { 
    id: 8, 
    title: "Ultimate Smart Watch", 
    price: 220, 
    oldPrice: undefined, 
    image: Product6.src, 
    category: "Wearable Tech",
    rating: 4.9,
    reviews: 312,
    isNew: true,
    isBestSeller: true
  },
]

export const galleryItems = [
  {
    id: 1,
    src: "/images/footerItem1.png",
    title: "Modern Living Space",
    category: "Living Room",
    description: "Elegant furniture arrangement showcasing our premium collection in a contemporary setting.",
    tags: ["Modern", "Minimalist", "Luxury"]
  },
  // Add more gallery items
]