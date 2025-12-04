import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { FileText, Shield, Zap, CheckCircle, ArrowRight, Package, Building2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Döküman Teslimat Hizmeti İstanbul | Evrak Kurye | Moto Kurye Gelsin',
  description: 'İstanbul genelinde hızlı ve güvenli döküman teslimat hizmeti. Evrak, sözleşme, ihale dökümanı, noter evrakları için profesyonel moto kurye çözümleri. hızlı teslimat.',
  keywords: 'döküman teslimat, evrak kurye, istanbul kurye, noter evrakı taşıma, ihale dökümanı, sözleşme teslimat, acil evrak',
  openGraph: {
    title: 'Döküman Teslimat Hizmeti İstanbul | Moto Kurye Gelsin',
    description: 'Evraklarınızı hızlı güvenle teslim ediyoruz. İstanbul genelinde profesyonel döküman kurye hizmeti.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Döküman Teslimat Hizmeti İstanbul',
    description: 'Evraklarınızı hızlı güvenle teslim ediyoruz.',
  },
  alternates: {
    canonical: 'https://www.motokuryegelsin.com/hizmetler/dokuman-teslimat',
  },
}

export default function DokumanTeslimatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Döküman Teslimat Hizmeti",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Moto Kurye Gelsin",
              "areaServed": "İstanbul, Türkiye",
              "telephone": "+90-541-695-52-34"
            },
            "description": "İstanbul genelinde hızlı ve güvenli döküman teslimat hizmeti",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "areaServed": {
                "@type": "City",
                "name": "İstanbul"
              }
            }
          })
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <FileText className="w-16 h-16 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Döküman Teslimat Hizmeti
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Evraklarınızı, sözleşmelerinizi ve önemli dökümanlarınızı İstanbul genelinde hızlı ve güvenli bir şekilde teslim ediyoruz.
                </p>
                <Link
                  href="/kurye-cagir"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Hemen Kurye Çağır
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Neden Bizimle Çalışmalısınız?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
                  <p className="text-gray-600">VIP hizmet ile hızlı teslimat garantisi</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Güvenli Taşıma</h3>
                  <p className="text-gray-600">Dökümanlarınız özel çantalarda korunarak taşınır</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Teslim Belgesi</h3>
                  <p className="text-gray-600">Her teslimat için imzalı teslim belgesi</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services List */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Hangi Dökümanları Taşıyoruz?</h2>
                <div className="space-y-4">
                  {[
                    'Noter evrakları ve tasdikli belgeler',
                    'İhale ve tender dökümanları',
                    'Sözleşmeler ve hukuki evraklar',
                    'Ticari faturalar ve mali belgeler',
                    'Vize ve pasaport evrakları',
                    'İmzalı anlaşmalar',
                    'Özel ve gizli dökümanlar',
                    'Mahkeme evrakları',
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Services */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Diğer Hizmetlerimiz</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/hizmetler/paket-kargo">
                    <Card className="h-full hover:shadow-lg transition-all hover:border-green-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-green-600" />
                          Paket Kargo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Küçük ve orta boy paketleriniz için aynı gün teslimat</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/hizmetler/acil-kurye">
                    <Card className="h-full hover:shadow-lg transition-all hover:border-red-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-red-600" />
                          Acil Kurye
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Acil durumlar için 1 saat içinde teslimat garantisi</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/hizmetler/kurumsal-cozumler">
                    <Card className="h-full hover:shadow-lg transition-all hover:border-purple-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-600" />
                          Kurumsal Çözümler
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">İşletmeniz için özel paketler ve aylık kontratlar</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Dökümanlarınızı Güvenle Teslim Edelim</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Profesyonel kurye ekibimiz ile evraklarınız en kısa sürede ve güvenli şekilde adresine ulaşır.
              </p>
              <Link
                href="/kurye-cagir"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Kurye Çağır
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
