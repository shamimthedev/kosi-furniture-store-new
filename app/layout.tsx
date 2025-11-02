import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kosi - Premium Furniture Store',
  description: 'Transform your space with our curated collection of premium furniture and home decor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="font-secondary antialiased">
        {children}
      </body>
    </html>
  )
}