import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import DistrictsSection from '@/components/sections/DistrictsSection'
import FixedWhatsAppButton from '@/components/fixed-whatsapp-button'
import './globals.css'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <DistrictsSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <FixedWhatsAppButton />
    </div>
  )
}