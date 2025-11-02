'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Phone,
    MapPin,
    Clock,
    Mail,
    Send,
    Heart,
    ArrowUp
} from "lucide-react"
import Logo from "@/public/images/kosi-logo.png"

export default function Footer() {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsSubscribed(true)
            setEmail("")
            setTimeout(() => setIsSubscribed(false), 3000)
        }
    }

    const footerLinks = {
        services: [
            { name: "Interior Design", href: "/services/interior-design" },
            { name: "Custom Furniture", href: "/services/custom-furniture" },
            { name: "Home Consultation", href: "/services/consultation" },
            { name: "Delivery & Setup", href: "/services/delivery" }
        ],
        about: [
            { name: "Our Story", href: "/about" },
            { name: "Quality Promise", href: "/about/quality" },
            { name: "Design Team", href: "/about/team" },
            { name: "Careers", href: "/careers" }
        ],
        support: [
            { name: "Help Center", href: "/support" },
            { name: "Contact Us", href: "/contact" },
            { name: "Shipping Info", href: "/shipping" },
            { name: "Returns & Exchanges", href: "/returns" }
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
            { name: "Accessibility", href: "/accessibility" }
        ]
    }

    const socialLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://facebook.com/kosi",
            color: "hover:text-blue-600 hover:bg-blue-50"
        },
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://instagram.com/kosi",
            color: "hover:text-pink-600 hover:bg-pink-50"
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: "https://twitter.com/kosi",
            color: "hover:text-blue-400 hover:bg-blue-50"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: "https://linkedin.com/company/kosi",
            color: "hover:text-blue-700 hover:bg-blue-50"
        }
    ]

    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
            <div className="container">
                {/* Main Footer Content */}
                <div className="py-16 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                        {/* Brand & Newsletter Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Logo & Description */}
                            <div>
                                <Link href="/" className="inline-block mb-6">
                                    <Image
                                        src={Logo}
                                        alt="Kosi - Premium Furniture"
                                        className="h-10 w-auto"
                                        width={120}
                                        height={40}
                                    />
                                </Link>
                                <p className="text-gray-600 leading-relaxed max-w-md">
                                    Transform your space with our curated collection of premium furniture and home decor.
                                    Creating beautiful, functional environments since 2020.
                                </p>
                            </div>

                            {/* Newsletter Signup */}
                            <div>
                                <h4 className="font-primary text-xl font-bold text-primary mb-4">
                                    Stay Updated
                                </h4>
                                <p className="text-gray-600 mb-6">
                                    Get the latest trends, exclusive offers, and design inspiration delivered to your inbox.
                                </p>

                                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubscribed}
                                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-all duration-200 ${isSubscribed
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
                                                }`}
                                        >
                                            {isSubscribed ? (
                                                <span className="text-sm">✓</span>
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    {isSubscribed && (
                                        <p className="text-green-600 text-sm font-medium">
                                            ✓ Successfully subscribed to our newsletter!
                                        </p>
                                    )}
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h4 className="font-primary text-lg font-bold text-primary">Get in Touch</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <span>123 Design Street, Furniture District, NY 10001</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-5 h-5 text-primary" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-5 h-5 text-primary" />
                                        <span>hello@kosi-furniture.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Clock className="w-5 h-5 text-primary" />
                                        <span>Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                                {/* Services */}
                                <div>
                                    <h5 className="font-primary text-lg font-bold text-primary mb-6">
                                        Services
                                    </h5>
                                    <ul className="space-y-3">
                                        {footerLinks.services.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* About */}
                                <div>
                                    <h5 className="font-primary text-lg font-bold text-primary mb-6">
                                        About
                                    </h5>
                                    <ul className="space-y-3">
                                        {footerLinks.about.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Support */}
                                <div>
                                    <h5 className="font-primary text-lg font-bold text-primary mb-6">
                                        Support
                                    </h5>
                                    <ul className="space-y-3">
                                        {footerLinks.support.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Legal */}
                                <div>
                                    <h5 className="font-primary text-lg font-bold text-primary mb-6">
                                        Legal
                                    </h5>
                                    <ul className="space-y-3">
                                        {footerLinks.legal.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Awards Section */}
                <div className="py-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Social Links */}
                        <div className="flex items-center gap-6">
                            <span className="font-medium text-gray-600">Follow Us:</span>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => {
                                    const IconComponent = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 bg-white border border-gray-200 rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                                            aria-label={social.name}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Awards/Certifications */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 font-bold">★</span>
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">4.9/5 Rating</p>
                                    <p className="text-gray-600">2,500+ Reviews</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold">✓</span>
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">Certified</p>
                                    <p className="text-gray-600">Eco-Friendly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <span>© 2024 Kosi Furniture. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span>
                                by{' '}
                                <Link
                                    href="https://bebshardost.com"
                                    className="animated-name"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    BebsharDost
                                </Link>
                            </span>
                        </div>

                        <div className="flex items-center gap-8 text-sm">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary transition-colors duration-200"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary transition-colors duration-200"
                            >
                                Cookie Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 flex items-center justify-center p-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
                aria-label="Back to top"
            >
                <ArrowUp className="w-4 h-4" />
            </button>
        </footer>
    )
}