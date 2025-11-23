import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MultiStepForm from '@/components/multi-step-form'
import { Bike } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kurye Çağır - Anında Online Sipariş | MotoKuryeGelsin',
  description: 'İstanbul içi hızlı kurye siparişi. Birkaç adımda online kurye çağırın, anında fiyat alın. Döküman, paket ve acil teslimat hizmeti.',
  keywords: 'kurye çağır, online kurye siparişi, hızlı kurye, kurye sipariş, istanbul kurye çağır',
  openGraph: {
    title: 'Kurye Çağır - Anında Online Sipariş | MotoKuryeGelsin',
    description: 'Birkaç adımda online kurye çağırın, anında fiyat alın. Hızlı teslimat.',
    url: 'https://motokuryegelsin.com/kurye-cagir',
    type: 'website',
  },
  alternates: {
    canonical: 'https://motokuryegelsin.com/kurye-cagir',
  },
}

export default function KuryeCagirPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Bike className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                Kurye Çağır
              </h1>
              <p className="text-xl text-muted-foreground">
                İstanbul içi hızlı ve güvenli kurye hizmeti. 
                Sadece birkaç adımda kargonuzu gönderin!
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <MultiStepForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
