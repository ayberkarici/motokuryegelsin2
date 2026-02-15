export interface StaticPageDef {
  page_key: string
  label: string
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  defaults: {
    title: string
    description: string
    keywords: string
  }
}

export const STATIC_PAGES: StaticPageDef[] = [
  {
    page_key: 'home',
    label: 'Ana Sayfa',
    path: '/',
    priority: 1,
    changeFrequency: 'daily',
    defaults: {
      title: 'MotoKuryeGelsin - İstanbul Moto Kurye | Hızlı ve Güvenilir Teslimat',
      description: "İstanbul'un en hızlı ve güvenilir moto kurye hizmeti. 39 ilçede hızlı teslimat. Döküman, paket ve acil kurye hizmetleri. Anında kurye çağır!",
      keywords: 'moto kurye istanbul, kurye hizmeti, hızlı teslimat istanbul, acil kurye, paket teslimat, döküman kurye',
    },
  },
  {
    page_key: 'hizmetler',
    label: 'Hizmetler',
    path: '/hizmetler',
    priority: 0.9,
    changeFrequency: 'weekly',
    defaults: {
      title: 'Kurye Hizmetlerimiz - MotoKuryeGelsin',
      description: "Döküman teslimatı, paket kargo, acil kurye ve kurumsal çözümler. İstanbul'un tamamında hızlı ve güvenilir kurye hizmetleri.",
      keywords: 'kurye hizmetleri, döküman teslimat, paket kargo, acil kurye, kurumsal kurye çözümleri, istanbul kurye',
    },
  },
  {
    page_key: 'hizmetler-dokuman',
    label: 'Döküman Teslimatı',
    path: '/hizmetler/dokuman-teslimat',
    priority: 0.9,
    changeFrequency: 'weekly',
    defaults: {
      title: 'Döküman Teslimat Hizmeti İstanbul | Evrak Kurye | Moto Kurye Gelsin',
      description: 'İstanbul genelinde hızlı ve güvenli döküman teslimat hizmeti. Evrak, sözleşme, ihale dökümanı, noter evrakları için profesyonel moto kurye çözümleri.',
      keywords: 'döküman teslimat, evrak kurye, istanbul kurye, noter evrakı taşıma, ihale dökümanı, sözleşme teslimat, acil evrak',
    },
  },
  {
    page_key: 'hizmetler-paket',
    label: 'Paket Kargo',
    path: '/hizmetler/paket-kargo',
    priority: 0.9,
    changeFrequency: 'weekly',
    defaults: {
      title: 'Paket Kargo Hizmeti İstanbul | Moto Kurye | Hızlı Paket Teslimat',
      description: 'İstanbul genelinde aynı gün paket kargo hizmeti. Küçük, orta ve büyük paketleriniz için motorlu kurye ile hızlı teslimat.',
      keywords: 'paket kargo, moto kurye, istanbul kargo, aynı gün teslimat, hızlı kargo, paket teslimat',
    },
  },
  {
    page_key: 'hizmetler-acil',
    label: 'Acil Kurye',
    path: '/hizmetler/acil-kurye',
    priority: 0.9,
    changeFrequency: 'weekly',
    defaults: {
      title: 'Acil Kurye Hizmeti İstanbul | 1 Saat İçinde Teslimat | Moto Kurye',
      description: 'İstanbul genelinde acil kurye hizmeti. Evrak, paket ve önemli gönderileriniz hızlı adresinde. Acil teslimat çözümleri.',
      keywords: 'acil kurye, hızlı teslimat, 1 saat teslimat, express kurye, istanbul acil kurye',
    },
  },
  {
    page_key: 'hizmetler-kurumsal',
    label: 'Kurumsal Çözümler',
    path: '/hizmetler/kurumsal-cozumler',
    priority: 0.9,
    changeFrequency: 'weekly',
    defaults: {
      title: 'Kurumsal Kurye Çözümleri İstanbul | Toplu Kurye Hizmeti | B2B',
      description: 'İşletmeniz için özel kurumsal kurye çözümleri. Aylık paket anlaşmalar, kurumsal faturalama ve öncelikli hizmet.',
      keywords: 'kurumsal kurye, B2B kurye, toplu kurye, kurumsal anlaşma, işletme kuryesi',
    },
  },
  {
    page_key: 'kurye-cagir',
    label: 'Kurye Çağır',
    path: '/kurye-cagir',
    priority: 1,
    changeFrequency: 'daily',
    defaults: {
      title: 'Kurye Çağır - Anında Online Sipariş | MotoKuryeGelsin',
      description: 'İstanbul içi hızlı kurye siparişi. Birkaç adımda online kurye çağırın, anında fiyat alın. Döküman, paket ve acil teslimat hizmeti.',
      keywords: 'kurye çağır, online kurye siparişi, hızlı kurye, kurye sipariş, istanbul kurye çağır',
    },
  },
  {
    page_key: 'blog',
    label: 'Blog',
    path: '/blog',
    priority: 0.8,
    changeFrequency: 'daily',
    defaults: {
      title: 'Blog | Moto Kurye Gelsin - Kurye ve Teslimat Rehberi',
      description: 'İstanbul kurye hizmetleri, teslimat ipuçları ve sektör haberleri. Moto kurye ile ilgili merak ettiğiniz her şey blog yazılarımızda.',
      keywords: 'kurye blog, teslimat ipuçları, istanbul kurye, moto kurye haberleri',
    },
  },
  {
    page_key: 'hakkimizda',
    label: 'Hakkımızda',
    path: '/hakkimizda',
    priority: 0.8,
    changeFrequency: 'monthly',
    defaults: {
      title: 'Hakkımızda - MotoKuryeGelsin',
      description: "MotoKuryeGelsin ailesi olarak uzun yıllardan beri İstanbul içi ve çevre illere profesyonel moto kurye hizmeti veriyoruz. Güvenilir, hızlı ve kaliteli teslimat.",
      keywords: 'motokuryegelsin hakkında, kurye firması, istanbul kurye, güvenilir kurye, profesyonel teslimat',
    },
  },
  {
    page_key: 'iletisim',
    label: 'İletişim',
    path: '/iletisim',
    priority: 0.7,
    changeFrequency: 'monthly',
    defaults: {
      title: 'İletişim - MotoKuryeGelsin | Müşteri Hizmetleri',
      description: 'MotoKuryeGelsin ile iletişime geçin. WhatsApp destek hattı ve online sipariş. Ümraniye İstanbul merkezli hızlı kurye hizmeti.',
      keywords: 'kurye iletişim, motokuryegelsin iletişim, kurye telefon, kurye whatsapp, istanbul kurye iletişim',
    },
  },
  {
    page_key: 'gizlilik',
    label: 'Gizlilik Politikası',
    path: '/gizlilik',
    priority: 0.3,
    changeFrequency: 'yearly',
    defaults: {
      title: 'Gizlilik Politikası - MotoKuryeGelsin',
      description: 'MotoKuryeGelsin gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler. KVKK uyumlu veri işleme politikalarımız.',
      keywords: 'gizlilik politikası, kvkk, kişisel verilerin korunması, veri güvenliği',
    },
  },
]

export function getStaticPageDef(pageKey: string): StaticPageDef | undefined {
  return STATIC_PAGES.find((p) => p.page_key === pageKey)
}
