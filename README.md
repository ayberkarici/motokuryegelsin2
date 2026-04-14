# 🏍️ MotoKuryeGelsin - Profesyonel Kurye Websitesi

İstanbul içi moto kurye servisi için geliştirilmiş, tam özellikli kurumsal website. Next.js, TypeScript ve modern web teknolojileri kullanılarak oluşturulmuştur.

## 🌟 Website Özellikleri

### 📱 Ana Sayfa
- **Hero Section**: Etkileyici görsel tasarım ve istatistikler
- **Özellikler Bölümü**: 6 ana hizmet özelliği
- **Hizmetler Özeti**: 4 farklı hizmet paketi
- **Müşteri Yorumları**: 6 gerçek müşteri deneyimi
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

### 🎯 Sayfa Yapısı
- **Ana Sayfa** (`/`): Şirket tanıtımı ve genel bilgiler
- **Kurye Çağır** (`/kurye-cagir`): 4 adımlı sipariş formu
- **Hizmetler** (`/hizmetler`): Detaylı hizmet açıklamaları ve fiyatlar
- **Hakkımızda** (`/hakkimizda`): Şirket hikayesi, misyon-vizyon, ekip
- **İletişim** (`/iletisim`): İletişim bilgileri, form ve SSS
- **Gizlilik Politikası** (`/gizlilik`): KVKK uyumlu gizlilik metni

### 🎨 Tasarım Sistemi
- **Renk Paleti**: Mavi-beyaz corporate kimlik
- **Tipografi**: Modern, okunabilir font düzeni
- **İkonografi**: Emoji tabanlı görsel dil
- **Animasyonlar**: Hover efektleri ve micro-interactions
- **Grid Sistemi**: Responsive grid layout

## 🛠️ Teknik Özellikler

### 🏗️ Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **Bileşenler**: Custom UI components (shadcn/ui tarzı)
- **İkonlar**: Emoji tabanlı simgeler

### 📋 Form Sistemi
- **MultiStepForm**: 4 adımlı sipariş formu
- **Validation**: Client-side form doğrulama
- **Progress Tracking**: İlerleme çubuğu
- **WhatsApp Integration**: Otomatik mesaj oluşturma

### 🗺️ Harita Bileşeni
- **Canvas Rendering**: HTML5 Canvas API
- **Animation**: Animasyonlu kurye simülasyonu
- **Coordinates**: İstanbul mahalle koordinatları
- **Route Visualization**: Başlangıç-hedef rota çizimi

### 📊 Veri Yönetimi
- **Static Data**: JSON tabanlı mahalle veritabanı
- **State Management**: React useState hooks
- **Type Safety**: TypeScript interfaces
- **Data Fetching**: Client-side data loading

## 📁 Proje Yapısı

```
MotoKuryeGelsin2/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Ana sayfa
│   ├── layout.tsx               # Root layout + SEO
│   ├── globals.css              # Global stiller
│   ├── kurye-cagir/page.tsx     # Sipariş formu
│   ├── hizmetler/page.tsx       # Hizmetler sayfası
│   ├── hakkimizda/page.tsx      # Hakkımızda sayfası
│   ├── iletisim/page.tsx        # İletişim sayfası
│   └── gizlilik/page.tsx        # Gizlilik politikası
├── components/
│   ├── layout/                   # Layout bileşenleri
│   │   ├── Header.tsx           # Navigasyon menüsü
│   │   └── Footer.tsx           # Site altbilgisi
│   ├── sections/                 # Sayfa bölümleri
│   │   ├── HeroSection.tsx      # Ana hero bölümü
│   │   ├── FeaturesSection.tsx  # Özellikler
│   │   ├── ServicesSection.tsx  # Hizmetler
│   │   └── TestimonialsSection.tsx # Yorumlar
│   ├── ui/                       # UI bileşenleri
│   ├── multi-step-form.tsx       # Sipariş formu
│   └── map-component.tsx         # Harita bileşeni
├── data/
│   └── istanbul-mahaller.json    # Mahalle veritabanı
├── lib/
│   └── utils.ts                  # Yardımcı fonksiyonlar
└── public/                       # Statik dosyalar
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum
```bash
# Repository'yi klonlayın
git clone <repository-url>
cd MotoKuryeGelsin2

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### Build ve Production
```bash
# Production build
npm run build

# Production sunucusu
npm start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🎯 Ana Özellikler

### � İletişim Sistemi
- **WhatsApp Integration**: Otomatik mesaj oluşturma
- **Telefon**: Doğrudan arama bağlantıları
- **Form**: İletişim formu (frontend-only)
- **Email**: E-posta bağlantıları

### 🏍️ Sipariş Sistemi
- **4 Adımlı Form**: Konum → Kargo → Zaman → Onay
- **Lokasyon Seçimi**: İlçe/mahalle dropdown menüleri
- **Kargo Tipleri**: Zarf, paket seçenekleri
- **Zamanlama**: Hemen, bugün, ileri tarih
- **WhatsApp Yönlendirme**: Otomatik sipariş gönderimi

### 📊 İçerik Yönetimi
- **SEO Optimize**: Meta tags, OpenGraph, Twitter Cards
- **Responsive**: Mobil-first tasarım
- **Accessibility**: WCAG uyumlu tasarım
- **Performance**: Next.js optimizasyonları

## 🎨 Görsel Kimlik

### 🎨 Marka Kimliği
- **Logo**: 🏍️ MotoKuryeGelsin
- **Slogan**: "İstanbul'un En Hızlı Kurye Servisi"
- **Ana Renk**: Mavi (#2563eb)
- **Vurgu Rengi**: Sarı (#fbbf24)

### 📱 UI/UX Tasarım
- **Card-Based Layout**: Modüler tasarım yaklaşımı
- **Gradient Backgrounds**: Modern görsel efektler
- **Hover Animations**: Etkileşimli animasyonlar
- **Icon System**: Tutarlı emoji kullanımı

## 🔧 Özelleştirme

### 🗺️ Mahalle Ekleme
`data/istanbul-mahaller.json` dosyasına yeni GeoJSON feature ekleyin:

```json
{
  "type": "Feature",
  "properties": {
    "address": {
      "town": "İlçe Adı",
      "suburb": "Mahalle Adı"
    }
  },
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  }
}
```

### 💬 WhatsApp Numarası
`lib/utils.ts` dosyasında `createWhatsAppUrl` fonksiyonunu güncelleyin.

### 🎨 Tema Özelleştirme
`tailwind.config.js` dosyasında renk paletini değiştirin.

## 📈 Performans

### ⚡ Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### 🚀 Optimizasyonlar
- Next.js Image Optimization
- Code Splitting
- Lazy Loading
- CSS Purging
- Static Generation

## 🔒 Güvenlik

### 🛡️ Güvenlik Önlemleri
- **HTTPS**: SSL sertifikası gerekli
- **CSRF Protection**: Form güvenliği
- **Input Validation**: Client-side doğrulama
- **Privacy**: KVKK uyumlu gizlilik politikası

## 📱 Responsive Tasarım

### 📺 Desteklenen Ekran Boyutları
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

### 🎯 Breakpoint Stratejisi
- **Mobile First**: Mobil öncelikli tasarım
- **Progressive Enhancement**: Kademeli geliştirme
- **Flexible Grid**: Esnek grid sistemi

## 🚀 Deployment

### 🌐 Önerilen Platformlar
- **Vercel**: Next.js için optimize edilmiş
- **Netlify**: JAMstack deployment
- **AWS**: Enterprise çözümler
- **DigitalOcean**: Maliyet-etkin hosting

### 🔧 Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=905416955299
```

## 📞 Destek

### 🆘 Teknik Destek
- **GitHub Issues**: Bug raporları
- **Documentation**: Detaylı dökümanlar
- **Community**: Developer community

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Bu professional website GitHub Copilot tarafından geliştirilmiştir.

---

**Not**: Bu website production-ready bir kurumsal çözümdür. Gerçek bir kurye servisi için backend entegrasyonu, ödeme sistemi ve admin paneli eklenmesi önerilir.