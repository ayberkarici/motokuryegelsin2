import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FloatingWhatsAppButton from '@/components/floating-whatsapp-button'
import './globals.css'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  )
}