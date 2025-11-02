import Header from "@/components/layouts/Header"
import Hero from "@/components/sections/Hero"
import TopPicks from "@/components/sections/TopPicks"
import NewArrival from "@/components/sections/NewArrival"
import Feature from "@/components/sections/Feature"
import ImageGallery from "@/components/sections/ImageGallery"
import Footer from "@/components/layouts/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TopPicks />
        <NewArrival />
        <Feature />
        <ImageGallery />
      </main>
      <Footer />
    </>
  )
}