import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { FileText, Package, Zap, Building2, Truck, Moon, Smartphone, Shield, Bike, MessageCircle } from 'lucide-react'

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
      pricing: {
        base: "25₺",
        urgent: "35₺",
        sameDay: "30₺"
      },
      deliveryTime: "15-30 dakika",
      coverage: "İstanbul geneli"
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
      pricing: {
        base: "35₺",
        urgent: "50₺",
        sameDay: "40₺"
      },
      deliveryTime: "30-45 dakika",
      coverage: "39 ilçe"
    },
    {
      icon: <Zap size={48} className="text-blue-600" />,
      title: "Acil Kurye",
      description: "Acil durumlar için öncelikli ekspres teslimat hizmeti",
      features: [
        "Öncelikli işlem garantisi",
        "Doğrudan rota planlaması",
        "SMS ile anlık güncellemeler",
        "15 dakika garanti süresi",
        "7/24 hizmet"
      ],
      pricing: {
        base: "50₺",
        urgent: "70₺",
        sameDay: "60₺"
      },
      deliveryTime: "10-20 dakika",
      coverage: "Merkezi ilçeler"
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
      pricing: {
        base: "Özel",
        urgent: "Fiyat",
        sameDay: "Paketi"
      },
      deliveryTime: "Esnek süre",
      coverage: "Tüm İstanbul"
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
      description: "24 saat hizmet ile gece teslimatları"
    },
    {
      icon: <Smartphone size={48} className="text-blue-600" />,
      title: "Dijital Takip",
      description: "WhatsApp ve SMS ile anlık konum takibi"
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
                        <h4 className="font-bold text-gray-900 mb-3">💰 Fiyatlandırma:</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Normal:</span>
                            <span className="font-bold text-blue-600">{service.pricing.base}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Aynı Gün:</span>
                            <span className="font-bold text-blue-600">{service.pricing.sameDay}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Acil:</span>
                            <span className="font-bold text-red-600">{service.pricing.urgent}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">⏱️ Teslimat Süresi:</h4>
                        <p className="text-green-600 font-semibold">{service.deliveryTime}</p>
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

        {/* Additional Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ek Hizmetlerimiz
              </h2>
              <p className="text-xl text-gray-600">
                Standart hizmetlerimize ek olarak sunduğumuz özel çözümler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
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
              <p className="text-xl text-gray-600">
                İstanbul'un 39 ilçesinde aktif hizmet veriyoruz
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
                <div 
                  key={index}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center hover:bg-blue-100 transition-colors"
                >
                  <span className="text-blue-700 font-medium text-sm">{district}</span>
                </div>
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