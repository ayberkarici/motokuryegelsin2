import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Target, Star, Gem, Bike, Phone, Package, Building2, Sparkles, MessageCircle } from 'lucide-react'

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Uzun yıllardan beri İstanbul içi ve çevre illere moto kurye hizmeti vermekteyiz
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  MotoKuryeGelsin Ailesi
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    MotoKuryeGelsin ailesi olarak uzun yıllardan beri İstanbul içi ve çevre illere moto kurye hizmeti 
                    vermekteyiz. Müşteri memnuniyetini her zaman ön planda tutarak, güvenilir ve hızlı hizmet 
                    anlayışımızla sektörde kendimizi kanıtladık.
                  </p>
                  <p>
                    Evraklarınızı, zarf ve dosyalarınızı, küçük, orta ve büyük paketlerinizi, çanta aşarı eşyalarınızı 
                    güvenle taşıyor, İstanbul'un her yerine hızla ulaştırıyoruz. Tecrübeli kurye ekibimizle 
                    binlerce başarılı teslimat gerçekleştirdik.
                  </p>
                  <p>
                    Ümraniye merkezli hizmet veren firmamız, İstanbul'un tüm ilçelerine ulaşım sağlayarak 
                    müşterilerimize en iyi deneyimi sunmaya devam ediyor. Amacımız sadece paket taşımak değil, 
                    insanların hayatını kolaylaştırmak.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Bike size={40} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">100+</div>
                    <div className="text-gray-600">Kurye Ekibi</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Package size={40} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">50K+</div>
                    <div className="text-gray-600">Teslimat</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Building2 size={40} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">39</div>
                    <div className="text-gray-600">İlçe</div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Star size={40} className="text-blue-600 fill-current" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">4.9</div>
                    <div className="text-gray-600">Puan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                <p className="text-gray-700 leading-relaxed">
                  İstanbul'da yaşayan insanların günlük hayatlarını kolaylaştırmak, 
                  güvenilir ve hızlı kurye hizmetiyle zaman kazandırmak.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                <p className="text-gray-700 leading-relaxed">
                  Türkiye'nin en büyük şehirlerinde kurye hizmeti denilince akla gelen 
                  ilk marka olmak ve standartları belirlemek.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gem size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Değerlerimiz</h3>
                <p className="text-gray-700 leading-relaxed">
                  Güvenilirlik, hız, kalite, müşteri odaklılık ve sürekli gelişim 
                  ilkelerine bağlı kalarak hizmet vermek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bizimle Çalışmaya Hazır mısınız?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              İstanbul'da güvenilir kurye hizmeti için doğru adrestesiniz. 
              Hemen sipariş verin, farkı yaşayın!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/kurye-cagir"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Bike size={20} />
                <span>Kurye Çağır</span>
              </Link>
              <Link 
                href="/iletisim"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>İletişime Geç</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}