import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - MotoKuryeGelsin',
  description: 'MotoKuryeGelsin gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler. KVKK uyumlu veri işleme politikalarımız.',
  keywords: 'gizlilik politikası, kvkk, kişisel verilerin korunması, veri güvenliği',
  openGraph: {
    title: 'Gizlilik Politikası - MotoKuryeGelsin',
    description: 'Kişisel verilerinizin korunması ve gizlilik politikamız hakkında detaylı bilgi.',
    url: 'https://www.motokuryegelsin.com/gizlilik',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.motokuryegelsin.com/gizlilik',
  },
}

export default function GizlilikPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Son güncelleme: 21 Ekim 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Giriş</h2>
              <p className="text-gray-700 leading-relaxed">
                MotoKuryeGelsin olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz. 
                Bu gizlilik politikası, hizmetlerimizi kullanırken topladığımız bilgilerin 
                nasıl işlendiğini açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Topladığımız Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kişisel Bilgiler:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Ad, soyad</li>
                    <li>Telefon numarası</li>
                    <li>E-posta adresi</li>
                    <li>Teslimat adresleri</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hizmet Bilgileri:</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Sipariş detayları</li>
                    <li>Teslimat bilgileri</li>
                    <li>Ödeme bilgileri</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Bilgilerin Kullanımı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Kurye hizmetlerini sunmak</li>
                <li>Müşteri desteği sağlamak</li>
                <li>Hizmet kalitesini artırmak</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bilgi Paylaşımı</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel bilgilerinizi üçüncü taraflarla paylaşmayız. 
                Sadece hizmetin gereği olarak kurye personelimizle 
                teslimat için gerekli minimum bilgileri paylaşırız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed">
                Verilerinizi korumak için endüstri standardı güvenlik 
                önlemleri alıyoruz. SSL şifreleme ve güvenli sunucular kullanıyoruz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Haklarınız</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz hakkında bilgi talep etme</li>
                <li>Kişisel verilerinizin düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini isteme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>E-posta:</strong> MotoKuryeGelsin@gmail.com<br/>
                  <strong>Telefon:</strong> +90 541 695 52 34<br/>
                  <strong>Adres:</strong> Baraj sk. No: 44-46 Ümraniye / İstanbul
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}