import React from 'react'
import { Star, MapPin, MessageCircle, RotateCcw, Trophy, User } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "İnsan Kaynakları Müdürü",
      company: "TechCorp",
      avatar: <User size={40} className="text-blue-600" />,
      rating: 5,
      text: "Şirketimizin acil belgelerini her zaman zamanında teslim ediyorlar. 2 yıldır çalıştığımız MotoKuryeGelsin'den çok memnunuz. Profesyonel ve güvenilir hizmet.",
      location: "Levent, Beşiktaş"
    },
    {
      name: "Zeynep Kaya",
      role: "E-ticaret Girişimcisi",
      company: "ZeyShop",
      avatar: <User size={40} className="text-pink-600" />,
      rating: 5,
      text: "Online mağazamın müşterilerine aynı gün teslimat yapabiliyorum. Özellikle WhatsApp takibi sayesinde siparişleri izlemek çok kolay. Harika hizmet!",
      location: "Kadıköy, İstanbul"
    },
    {
      name: "Mehmet Öztürk",
      role: "Avukat",
      company: "Öztürk Hukuk",
      avatar: <User size={40} className="text-green-600" />,
      rating: 5,
      text: "Mahkemeye yetiştirmem gereken acil belgelerim için her zaman MotoKuryeGelsin'i tercih ediyorum. 15 dakikada gelip alıyorlar, çok güvenilirler.",
      location: "Şişli, İstanbul"
    },
    {
      name: "Ayşe Demir",
      role: "Muhasebeci",
      company: "Freelance",
      avatar: <User size={40} className="text-purple-600" />,
      rating: 5,
      text: "Müşterilerimin faturalarını hızlıca ulaştırmam için vazgeçilmez hizmet. Çok güvenilirler. 1 yıldır hiç sorun yaşamadım.",
      location: "Beyoğlu, İstanbul"
    },
    {
      name: "Can Yıldırım",
      role: "Restoran Sahibi",
      company: "Lezzet Durağı",
      avatar: <User size={40} className="text-orange-600" />,
      rating: 5,
      text: "Özel etkinlikler için catering siparişlerimi güvenle teslim ediyorlar. Sıcak yemekleri bile soğumadan ulaştırabiliyorlar. Mükemmel!",
      location: "Ortaköy, Beşiktaş"
    },
    {
      name: "Selin Arslan",
      role: "Doktor",
      company: "Özel Klinik",
      avatar: <User size={40} className="text-red-600" />,
      rating: 5,
      text: "Hasta raporlarını hastaneler arası transfer ederken MotoKuryeGelsin'i kullanıyorum. Tıbbi belgelerin güvenliği konusunda çok titizler.",
      location: "Ataşehir, İstanbul"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Müşteri <span className="text-blue-600">Yorumları</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Binlerce memnun müşterimizden bazılarının deneyimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="mr-4">{testimonial.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-500">({testimonial.rating}/5)</span>
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1" />
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <Star size={40} className="text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4,9/5</div>
              <div className="text-gray-600">Ortalama Puan</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <MessageCircle size={40} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Müşteri Yorumu</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <RotateCcw size={40} className="text-green-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-600">Tekrar Eden Müşteri</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Trophy size={40} className="text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2024</div>
              <div className="text-gray-600">Yılın Kurye Servisi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection