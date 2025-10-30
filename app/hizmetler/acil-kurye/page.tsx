import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Zap, Clock, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acil Kurye Hizmeti İstanbul | 1 Saat İçinde Teslimat | Moto Kurye',
  description: 'İstanbul genelinde acil kurye hizmeti. Evrak, paket ve önemli gönderileriniz hızlı adresinde. 24 saat acil teslimat çözümleri.',
  keywords: 'acil kurye, hızlı teslimat, 1 saat teslimat, express kurye, istanbul acil kurye',
}

export default function AcilKuryePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context": "https://schema.org","@type": "Service","serviceType": "Acil Kurye Hizmeti","provider": {"@type": "LocalBusiness","name": "Moto Kurye Gelsin","areaServed": "İstanbul, Türkiye"}})}} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Zap className="w-16 h-16 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Acil Kurye Hizmeti</h1>
                <p className="text-xl text-red-100 mb-8">
                  Acil durumlarınızda yanınızdayız. hızlı teslimat garantisi ile hızlı çözümler sunuyoruz.
                </p>
                <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-8 py-4 rounded-full font-semibold">
                  Acil Kurye Çağır <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Acil Teslimat Senaryoları</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {['İhale son dakika evrakları', 'Acil imza gerektiren belgeler', 'Sağlık raporu ve tetkik sonuçları', 'Mahkeme duruşma evrakları', 'Vize randevusu dökümanları', 'Unutulan önemli eşyalar'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-red-50 p-4 rounded-lg"><CheckCircle className="w-6 h-6 text-red-500" /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-red-600 text-white text-center">
            <div className="container mx-auto px-4">
              <Clock className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">7/24 Acil Durum Hattı</h2>
              <Link href="/kurye-cagir" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold">
                Hemen Ara <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
