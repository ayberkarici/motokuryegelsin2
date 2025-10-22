import React from 'react'
import Link from 'next/link'
import { FileText, Package, ShoppingBag, Building, Check, Phone, MessageCircle } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: <FileText size={48} />,
      title: "Evrak ve Dosya Teslimatı",
      description: "Evraklarınızı, zarf ve dosyalarınızı güvenle teslim ediyoruz",
      features: ["Zarf teslimatı", "Dosya taşıma", "Yasal belgeler", "Resmi evraklar"],
      price: "Uygun fiyatlarla",
      time: "Hızlı teslimat"
    },
    {
      icon: <Package size={48} />,
      title: "Küçük ve Orta Paketler",
      description: "Küçük, orta ve büyük paketlerinizi profesyonelce ulaştırıyoruz",
      features: ["Küçük paketler", "Orta boy kargolar", "Büyük paketler", "Güvenli ambalaj"],
      price: "Hesaplı fiyatlar",
      time: "Hızlı servis"
    },
    {
      icon: <ShoppingBag size={48} />,
      title: "Çanta Aşarı Eşyalar",
      description: "Çanta aşarı eşyalarınızı özenle taşıyoruz",
      features: ["Büyük eşyalar", "Hacimli ürünler", "Özel taşıma", "Dikkatli teslimat"],
      price: "Özel fiyatlandırma",
      time: "Güvenli teslimat"
    },
    {
      icon: <Building size={48} />,
      title: "Kurumsal Hizmetler",
      description: "İşletmeniz için özel moto kurye hizmet çözümleri",
      features: ["Düzenli teslimatlar", "Toplu siparişler", "Kurumsal fiyatlar", "Faturalı hizmet"],
      price: "Avantajlı fiyatlar",
      time: "Esnek süreler"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hizmet <span className="text-blue-600">Seçeneklerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza uygun kurye hizmeti seçeneği ile paketinizi güvenle ulaştırın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center mb-6">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Özellikler:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check size={16} className="text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Fiyat:</span>
                    <span className="font-semibold text-blue-600">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Süre:</span>
                    <span className="font-semibold text-green-600">{service.time}</span>
                  </div>
                </div>

                <Link 
                  href="/kurye-cagir"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Sipariş Ver
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Özel İhtiyacınız mı Var?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Standart hizmetlerimiz dışında özel bir talebiniz varsa bizimle iletişime geçin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/iletisim"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-bold inline-flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Bizi Arayın</span>
            </Link>
            <Link 
              href="/kurye-cagir"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-bold inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection