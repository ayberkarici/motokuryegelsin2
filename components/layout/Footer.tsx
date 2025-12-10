import React from 'react'
import Link from 'next/link'
import { 
  Bike, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock,
  FileText,
  Package,
  Zap,
  Building,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react'

// Popular districts for SEO internal linking
const popularDistricts = [
  { name: 'Kadıköy', slug: 'kadikoy' },
  { name: 'Beşiktaş', slug: 'besiktas' },
  { name: 'Şişli', slug: 'sisli' },
  { name: 'Üsküdar', slug: 'uskudar' },
  { name: 'Beyoğlu', slug: 'beyoglu' },
  { name: 'Bakırköy', slug: 'bakirkoy' },
  { name: 'Ataşehir', slug: 'atasehir' },
  { name: 'Maltepe', slug: 'maltepe' },
  { name: 'Pendik', slug: 'pendik' },
  { name: 'Kartal', slug: 'kartal' },
  { name: 'Sarıyer', slug: 'sariyer' },
  { name: 'Fatih', slug: 'fatih' },
]

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-blue-400">
                <Bike size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-400">MotoKuryeGelsin</h3>
                <p className="text-sm text-gray-400">İstanbul Moto Kurye Hizmeti</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              MotoKuryeGelsin ailesi olarak uzun yıllardan beri İstanbul içi ve çevre illere 
              moto kurye hizmeti vermekteyiz. Güvenli ve hızlı teslimat garantisi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="text-gray-300 hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/kurye-cagir" className="text-gray-300 hover:text-white transition-colors">
                  Kurye Çağır
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hizmetler/dokuman-teslimat" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <FileText size={16} />
                  <span>Döküman Teslimatı</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/paket-kargo" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Package size={16} />
                  <span>Paket Kargo</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/acil-kurye" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Zap size={16} />
                  <span>Acil Kurye</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/kurumsal-cozumler" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Building size={16} />
                  <span>Kurumsal Çözümler</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">Baraj sk. No: 44-46 Ümraniye / İstanbul</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">+90 541 695 52 34</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">WhatsApp Destek</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">MotoKuryeGelsin@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">Hızlı Hizmet</span>
              </div>
            </div>
          </div>
        </div>

        {/* District Links for SEO */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-lg font-semibold mb-4 text-blue-400 text-center">Hizmet Bölgelerimiz</h4>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {popularDistricts.map((district) => (
              <Link
                key={district.slug}
                href={`/ilceler/${district.slug}`}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {district.name} Kurye
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MotoKuryeGelsin. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/gizlilik" className="text-gray-400 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/cerez-politikasi" className="text-gray-400 hover:text-white text-sm transition-colors">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer