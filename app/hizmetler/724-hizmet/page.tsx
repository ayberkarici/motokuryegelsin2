import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Clock, Moon, Sun, Calendar, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '7/24 Kurye Hizmeti İstanbul | Gece Kurye | Hafta Sonu Teslimat',
  description: 'Hafta sonu, gece ve tatil günleri de kesintisiz kurye hizmeti. İstanbul genelinde 7 gün 24 saat moto kurye hizmeti. Gece teslimatları.',
  keywords: '724 kurye, gece kurye, hafta sonu kurye, tatil günü teslimat, 24 saat kurye',
}

export default function Hizmet724Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","serviceType":"7/24 Kurye Hizmeti","provider":{"@type":"LocalBusiness","name":"Moto Kurye Gelsin","openingHours":"Mo-Su 00:00-23:59","areaServed":"İstanbul, Türkiye"}})}} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Clock className="w-16 h-16 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">7/24 Kesintisiz Hizmet</h1>
                <p className="text-xl text-purple-100 mb-8">
                  Gece, gündüz, hafta sonu, tatil... Ne zaman ihtiyacınız olursa, biz hep buradayız. 7 gün 24 saat kesintisiz kurye hizmeti.
                </p>
                <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-semibold">
                  Kurye Çağır <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Her Zaman Yanınızdayız</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center p-6 bg-yellow-50 rounded-xl">
                  <Sun className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Gündüz Hizmet</h3>
                  <p className="text-gray-600">06:00 - 22:00 arası standart hizmet saatleri</p>
                </div>
                <div className="text-center p-6 bg-indigo-50 rounded-xl">
                  <Moon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Gece Hizmet</h3>
                  <p className="text-gray-600">22:00 - 06:00 arası gece teslimat hizmeti</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <Calendar className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Hafta Sonu ve Tatil</h3>
                  <p className="text-gray-600">Cumartesi, Pazar ve resmi tatillerde hizmet</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">7/24 Hizmet Avantajları</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  'Gece acil evrak teslimatı',
                  'Hafta sonu paket gönderimi',
                  'Tatil günlerinde kesintisiz hizmet',
                  'Havalimanı transfer servisi (her saat)',
                  'Gece hastane ve eczane teslimatları',
                  'Otel ve konaklama teslimatları',
                  '24 saat canlı müşteri desteği'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-purple-600 text-white text-center">
            <div className="container mx-auto px-4">
              <Clock className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">Saat Fark Etmeksizin Hizmetinizdeyiz</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">İstanbul'un her saatinde, her gününde yanınızdayız.</p>
              <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold">
                Hemen Kurye Çağır <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
