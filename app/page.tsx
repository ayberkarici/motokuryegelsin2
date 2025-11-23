import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import DistrictsSection from '@/components/sections/DistrictsSection'
import FixedWhatsAppButton from '@/components/fixed-whatsapp-button'
import './globals.css'

export const metadata: Metadata = {
  title: 'MotoKuryeGelsin - İstanbul Moto Kurye | Hızlı ve Güvenilir Teslimat',
  description: 'İstanbul\'un en hızlı ve güvenilir moto kurye hizmeti. 39 ilçede hızlı teslimat. Döküman, paket ve acil kurye hizmetleri. Anında kurye çağır!',
  keywords: 'moto kurye istanbul, kurye hizmeti, hızlı teslimat istanbul, acil kurye, paket teslimat, döküman kurye',
  openGraph: {
    title: 'MotoKuryeGelsin - İstanbul\'un En Hızlı Kurye Servisi',
    description: 'İstanbul\'da 39 ilçede hızlı ve güvenilir moto kurye hizmeti',
    url: 'https://motokuryegelsin.com',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: 'https://motokuryegelsin.com',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'MotoKuryeGelsin',
            'url': 'https://motokuryegelsin.com',
            'logo': 'https://motokuryegelsin.com/logo.png',
            'description': 'İstanbul içi hızlı ve güvenilir moto kurye hizmeti. 39 ilçede hızlı teslimat.',
            'telephone': '+905416955234',
            'email': 'MotoKuryeGelsin@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Baraj sk. No: 44-46',
              'addressLocality': 'Ümraniye',
              'addressRegion': 'İstanbul',
              'addressCountry': 'TR'
            },
            'areaServed': {
              '@type': 'City',
              'name': 'İstanbul'
            },
            'sameAs': [
              'https://www.facebook.com/motokuryegelsin',
              'https://www.instagram.com/motokuryegelsin'
            ],
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '+905416955234',
              'contactType': 'customer service',
              'availableLanguage': 'Turkish',
              'areaServed': 'TR'
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'MotoKuryeGelsin',
            'image': 'https://motokuryegelsin.com/logo.png',
            'url': 'https://motokuryegelsin.com',
            'telephone': '+905416955234',
            'priceRange': '$$',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Baraj sk. No: 44-46',
              'addressLocality': 'Ümraniye',
              'addressRegion': 'İstanbul',
              'postalCode': '34768',
              'addressCountry': 'TR'
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 41.0082,
              'longitude': 28.9784
            },
            'openingHoursSpecification': {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ],
              'opens': '00:00',
              'closes': '23:59'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '250'
            }
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <ServicesSection />
          <DistrictsSection />
          <TestimonialsSection />
        </main>
        <Footer />
        <FixedWhatsAppButton />
      </div>
    </>
  )
}