import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Phone, MessageCircle, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Bike } from 'lucide-react'

export const metadata: Metadata = {
  title: 'İletişim - MotoKuryeGelsin | Müşteri Hizmetleri',
  description: 'MotoKuryeGelsin ile iletişime geçin. WhatsApp destek hattı ve online sipariş. Ümraniye İstanbul merkezli hızlı kurye hizmeti.',
  keywords: 'kurye iletişim, motokuryegelsin iletişim, kurye telefon, kurye whatsapp, istanbul kurye iletişim',
  openGraph: {
    title: 'İletişim - MotoKuryeGelsin',
    description: 'Müşteri hizmetleri ve destek. Bize ulaşın, size en iyi hizmeti sunalım.',
    url: 'https://www.motokuryegelsin.com/iletisim',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.motokuryegelsin.com/iletisim',
  },
}

export default function IletisimPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Bize ulaşın, size en iyi kurye hizmetini sunalım
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  İletişim Bilgileri
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                      <p className="text-gray-600">+90 541 695 52 34</p>
                      <p className="text-sm text-gray-500">Müşteri Hizmetleri</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-600">+90 541 695 52 34</p>
                      <p className="text-sm text-gray-500">Anında destek ve sipariş</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Mail size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">E-posta</h3>
                      <p className="text-gray-600">MotoKuryeGelsin@gmail.com</p>
                      <p className="text-sm text-gray-500">Genel sorular ve destek</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <MapPin size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Adres</h3>
                      <p className="text-gray-600">
                        Baraj sk. No: 44-46<br/>
                        Ümraniye / İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock size={24} className="text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-600">Geniş Çalışma Saatleri</p>
                      <p className="text-sm text-gray-500">Hafta içi, hafta sonu ve resmi tatiller</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-bold text-gray-900 mb-4">Sosyal Medya</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition-colors">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Bize Mesaj Gönderin
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+90 5xx xxx xx xx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konu
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Konu seçin</option>
                      <option value="genel">Genel Bilgi</option>
                      <option value="fiyat">Fiyat Teklifi</option>
                      <option value="kurumsal">Kurumsal İşbirliği</option>
                      <option value="sikayet">Şikayet</option>
                      <option value="oneri">Öneri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      <Link href="/gizlilik" className="text-blue-600 hover:underline">
                        Gizlilik Politikası
                      </Link>'nı okudum ve kabul ediyorum.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg"
                  >
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hızlı İşlemler
              </h2>
              <p className="text-xl text-gray-600">
                En sık kullanılan hizmetlerimize hızlı erişim
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link 
                href="/kurye-cagir"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  <Bike size={60} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kurye Çağır</h3>
                <p className="text-gray-600">Hemen sipariş verin</p>
              </Link>

              <a 
                href="https://wa.me/905416955234"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  <MessageCircle size={60} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600">Anında destek alın</p>
              </a>

              <a 
                href="tel:+905416955234"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  <Phone size={60} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Telefon</h3>
                <p className="text-gray-600">Bizi arayın</p>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sık Sorulan Sorular
              </h2>
              <p className="text-xl text-gray-600">
                En çok merak edilen konular
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Kurye hizmetiniz hangi saatlerde aktif?",
                  answer: "Hafta içi ve hafta sonu geniş çalışma saatleri ile hizmet veriyoruz. Detaylı çalışma saatlerimiz için bizi arayabilirsiniz."
                },
                {
                  question: "Teslimat süreleri nasıl?",
                  answer: "VIP Gönderi: 1 saat • Ekspres Gönderi: 1-2 saat • Normal Gönderi: 2-4 saat. İhtiyacınıza göre uygun teslimat seçeneğini belirleyebilirsiniz."
                },
                {
                  question: "Hangi bölgelere hizmet veriyorsunuz?",
                  answer: "İstanbul'un tüm ilçelerine ve çevre illere (Kocaeli, Tekirdağ, Bursa, Sakarya, Yalova) hizmet veriyoruz."
                },
                {
                  question: "Ödeme nasıl yapılır?",
                  answer: "Nakit ödeme, havale ve EFT yoluyla ödeme yapabilirsiniz. Kurumsal müşterilerimiz için detaylı faturalandırma imkanı da mevcuttur."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}