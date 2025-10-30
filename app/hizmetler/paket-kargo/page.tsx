import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Package, Clock, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paket Kargo Hizmeti İstanbul | Moto Kurye | Hızlı Paket Teslimat',
  description: 'İstanbul genelinde aynı gün paket kargo hizmeti. Küçük, orta ve büyük paketleriniz için motorlu kurye ile hızlı teslimat. aynı gün kapınızda.',
  keywords: 'paket kargo, moto kurye, istanbul kargo, aynı gün teslimat, hızlı kargo, paket teslimat',
  openGraph: {
    title: 'Paket Kargo Hizmeti İstanbul | Moto Kurye Gelsin',
    description: 'Paketlerinizi aynı gün içinde güvenle teslim ediyoruz. İstanbul genelinde hızlı kargo çözümleri.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function PaketKargoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Paket Kargo Hizmeti",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Moto Kurye Gelsin",
              "areaServed": "İstanbul, Türkiye"
            }
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Package className="w-16 h-16 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Paket Kargo Hizmeti</h1>
                <p className="text-xl text-green-100 mb-8">
                  Küçük paketlerden büyük kargolara kadar tüm gönderileriniz için aynı gün teslimat garantisi.
                </p>
                <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300">
                  Hemen Kurye Çağır <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Paket Kargo Hizmetlerimiz</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  'E-ticaret paket teslimatları',
                  'Hediye ve özel gün paketleri',
                  'Elektronik ürün teslimatı',
                  'Gıda ve sıcak yemek servisi',
                  'Medikal malzeme taşıma',
                  'Yedek parça ve aksesuar',
                  '20 kg\'a kadar paket taşıma',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-green-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Paketinizi Bugün Teslim Edelim</h2>
              <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full font-semibold">
                Kurye Çağır <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
