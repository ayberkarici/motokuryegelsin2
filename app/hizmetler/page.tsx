import { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo-queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { FileText, Package, Zap, Building2, Truck, Moon, Shield, Bike, MessageCircle } from 'lucide-react'
import { createSlug } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('hizmetler')
  const title = seo?.title || 'Kurye Hizmetlerimiz - MotoKuryeGelsin'
  const description = seo?.description || 'Döküman teslimatı, paket kargo, acil kurye ve kurumsal çözümler. İstanbul\'un tamamında hızlı ve güvenilir kurye hizmetleri.'
  const keywords = seo?.keywords || 'kurye hizmetleri, döküman teslimat, paket kargo, acil kurye, kurumsal kurye çözümleri, istanbul kurye'
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: 'https://www.motokuryegelsin.com/hizmetler',
      type: 'website',
    },
    alternates: {
      canonical: 'https://www.motokuryegelsin.com/hizmetler',
    },
  }
}

export default function HizmetlerPage() {
  const services = [
    {
      icon: <FileText size={48} className="text-blue-600" />,
      title: "Döküman Teslimatı",
      description: "Önemli belgelerinizi güvenle ve hızla ulaştırıyoruz",
      features: [
        "A4 zarflar ve belgeler",
        "Sözleşme ve yasal dökümanlar",
        "Fatura ve mali belgeler",
        "Tıbbi raporlar",
        "Akademik belgeler"
      ],
      deliveryTimes: {
        vip: "1 saat",
        express: "1-2 saat",
        normal: "2-4 saat"
      },
      coverage: "İstanbul'un tamamı ve çevre iller"
    },
    {
      icon: <Package size={48} className="text-blue-600" />,
      title: "Paket Kargo",
      description: "Küçük ve orta boy paketleriniz için hızlı teslimat",
      features: [
        "5kg'a kadar paketler",
        "Elektronik ürünler",
        "Kırılabilir eşyalar",
        "Gıda ürünleri",
        "Hediye paketleri"
      ],
      deliveryTimes: {
        vip: "1 saat",
        express: "1-2 saat",
        normal: "2-4 saat"
      },
      coverage: "İstanbul'un tamamı ve çevre iller"
    },
    {
      icon: <Zap size={48} className="text-blue-600" />,
      title: "Acil Kurye",
      description: "Acil durumlar için öncelikli ekspres teslimat hizmeti",
      features: [
        "Öncelikli işlem garantisi",
        "Doğrudan rota planlaması",
        "Hızlı teslimat garantisi",
      ],
      deliveryTimes: {
        vip: "1 saat",
        express: "1-2 saat",
        normal: "2-4 saat"
      },
      coverage: "İstanbul'un tamamı ve çevre iller"
    },
    {
      icon: <Building2 size={48} className="text-blue-600" />,
      title: "Kurumsal Çözümler",
      description: "İşletmeniz için özel kurye hizmet paketleri",
      features: [
        "Aylık sabit kontratlar",
        "Özel fiyatlandırma",
        "Detaylı faturalandırma",
        "Aylık kullanım raporları",
        "Özel müşteri temsilcisi"
      ],
      deliveryTimes: {
        vip: "1 saat",
        express: "1-2 saat",
        normal: "2-4 saat"
      },
      coverage: "İstanbul'un tamamı ve çevre iller"
    }
  ]

  const additionalServices = [
    {
      icon: <Truck size={48} className="text-blue-600" />,
      title: "Büyük Paket Servisi",
      description: "10kg'a kadar büyük paketler için özel araç hizmeti"
    },
    {
      icon: <Moon size={48} className="text-blue-600" />,
      title: "Gece Kurye",
      description: "Geniş çalışma saatleri ile teslimat hizmeti"
    },
    {
      icon: <Shield size={48} className="text-blue-600" />,
      title: "Sigorta Güvencesi",
      description: "Tüm gönderiler için kapsamlı sigorta koruması"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hizmetlerimiz
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              İhtiyacınıza uygun profesyonel kurye hizmeti seçenekleri
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ana Hizmet Paketlerimiz
              </h2>
              <p className="text-xl text-gray-600">
                Her ihtiyaca uygun, profesyonel kurye çözümleri
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">{service.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">📋 Hizmet Kapsamı:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                            <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">⏱️ Teslimat Süreleri:</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">VIP Teslimat:</span>
                            <span className="font-bold text-red-600">{service.deliveryTimes.vip}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Express Teslimat:</span>
                            <span className="font-bold text-orange-600">{service.deliveryTimes.express}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Normal Teslimat:</span>
                            <span className="font-bold text-blue-600">{service.deliveryTimes.normal}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">📍 Kapsam:</h4>
                        <p className="text-blue-600 font-semibold">{service.coverage}</p>
                      </div>

                      <Link 
                        href="/kurye-cagir"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-bold mt-4"
                      >
                        Sipariş Ver
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hizmet Alanlarımız
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                İstanbul'un 39 ilçesinde ve çevre illerde aktif hizmet veriyoruz
              </p>
              <p className="text-lg text-gray-500 mb-4">
                İstanbul'un tamamı • Kocaeli • Tekirdağ • Bursa • Sakarya • Yalova
              </p>
              <p className="text-gray-600">
                İlçe detayları için ilçe adına tıklayın ve o bölgeye özel hizmetlerimizi keşfedin
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler",
                "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü",
                "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt",
                "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane",
                "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer",
                "Silivri", "Sultanbeyli", "Şile", "Şişli", "Tuzla", "Ümraniye",
                "Üsküdar", "Zeytinburnu", "Sultangazi"
              ].map((district, index) => (
                <Link 
                  key={index}
                  href={`/ilceler/${createSlug(district)}`}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center hover:bg-blue-100 hover:border-blue-400 hover:shadow-md transition-all group"
                  title={`${district} Kurye Hizmeti`}
                >
                  <span className="text-blue-700 font-medium text-sm group-hover:text-blue-900">{district}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hemen Sipariş Verin
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              İhtiyacınıza uygun kurye hizmetini seçin ve güvenli teslimatın keyfini çıkarın
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
                <MessageCircle size={20} />
                <span>Fiyat Teklifi Al</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}