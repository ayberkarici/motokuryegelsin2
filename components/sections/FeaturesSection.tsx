import React from 'react'
import { Zap, Shield, Clock, DollarSign, Users } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap size={32} className="text-white" />,
      title: "Süper Hızlı Teslimat",
      description: "İstanbul içi 30 dakika garantisi ile paketinizi en hızlı şekilde ulaştırıyoruz.",
      color: "bg-yellow-500"
    },
    {
      icon: <Shield size={32} className="text-white" />,
      title: "Güvenli Taşıma",
      description: "Paketleriniz özel koruma ambalajları ve sigorta güvencesi altında taşınır.",
      color: "bg-green-500"
    },
    {
      icon: <Clock size={32} className="text-white" />,
      title: "7/24 Hizmet",
      description: "Hafta içi ve hafta sonu, gece gündüz kesintisiz kurye hizmeti sunuyoruz.",
      color: "bg-purple-500"
    },
    {
      icon: <DollarSign size={32} className="text-white" />,
      title: "Uygun Fiyat",
      description: "İstanbul'un en rekabetçi fiyatları ile kaliteli kurye hizmeti alın.",
      color: "bg-orange-500"
    },
    {
      icon: <Users size={32} className="text-white" />,
      title: "Profesyonel Ekip",
      description: "Deneyimli ve güvenilir kurye ekibimiz ile hizmet kalitesi garantisi.",
      color: "bg-indigo-500"
    }
  ]

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-gray-50">
          <path d="M0,0V46.29c47.79,22.4,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Neden <span className="text-blue-600">MotoKuryeGelsin</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İstanbul'da kurye hizmeti denilince akla gelen ilk isim olmamızın sebepleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Başarılı Teslimat</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">39</div>
            <div className="text-gray-600">İlçe Kapsamı</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600">Müşteri Memnuniyeti</div>
          </div>
        </div>
      </div>
      
      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.4,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default FeaturesSection