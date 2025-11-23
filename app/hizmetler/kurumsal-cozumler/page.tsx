import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Building2, ArrowRight, CheckCircle, TrendingUp, Users, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kurumsal Kurye Çözümleri İstanbul | Toplu Kurye Hizmeti | B2B',
  description: 'İşletmeniz için özel kurumsal kurye çözümleri. Aylık paket anlaşmalar, kurumsal faturalama ve öncelikli hizmet. İstanbul genelinde B2B kurye hizmeti.',
  keywords: 'kurumsal kurye, B2B kurye, toplu kurye, kurumsal anlaşma, işletme kuryesi',
  openGraph: {
    title: 'Kurumsal Kurye Çözümleri İstanbul | Moto Kurye Gelsin',
    description: 'İşletmeniz için özel kurye çözümleri. Aylık paket anlaşmalar ve B2B hizmetler.',
    url: 'https://motokuryegelsin.com/hizmetler/kurumsal-cozumler',
    type: 'website',
  },
  alternates: {
    canonical: 'https://motokuryegelsin.com/hizmetler/kurumsal-cozumler',
  },
}

export default function KurumsalCozumlerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Service","serviceType":"Kurumsal Kurye Çözümleri","provider":{"@type":"LocalBusiness","name":"Moto Kurye Gelsin","areaServed":"İstanbul, Türkiye"}})}} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Building2 className="w-16 h-16 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Kurumsal Kurye Çözümleri</h1>
                <p className="text-xl text-indigo-100 mb-8">
                  İşletmenizin tüm kurye ihtiyaçları için özel çözümler. Aylık anlaşmalarla öncelikli hizmet ve profesyonel destek.
                </p>
                <Link href="/iletisim" className="inline-flex items-center gap-2 bg-yellow-400 text-indigo-900 px-8 py-4 rounded-full font-semibold">
                  Teklif Alın <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Kurumsal Avantajlar</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center p-6">
                  <TrendingUp className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Özel Çözümler</h3>
                  <p className="text-gray-600">İhtiyaçlarınıza özel esnek aylık paket anlaşmaları</p>
                </div>
                <div className="text-center p-6">
                  <Users className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Özel Hesap Yöneticisi</h3>
                  <p className="text-gray-600">Size özel atanmış müşteri temsilcisi</p>
                </div>
                <div className="text-center p-6">
                  <FileText className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Kurumsal Faturalama</h3>
                  <p className="text-gray-600">Aylık toplu faturalama ve cari hesap</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Kimler Tercih Ediyor?</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {['Hukuk büroları', 'Muhasebe ofisleri', 'E-ticaret şirketleri', 'Reklam ajansları', 'Sağlık kurumları', 'Bankalar ve finans kuruluşları', 'Lojistik firmaları'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="w-6 h-6 text-indigo-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-indigo-600 text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">İşletmenize Özel Teklif Alın</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Kurumsal ihtiyaçlarınıza göre özel fiyat teklifi için bizimle iletişime geçin.</p>
              <Link href="/iletisim" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold">
                İletişim <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
