# İlçe Bazlı SEO Landing Sayfaları

## Genel Bakış

Bu proje, İstanbul'un 39 ilçesi için dinamik SEO landing sayfaları içerir. Her ilçe sayfası:
- SEO optimizasyonu (metadata, structured data)
- İlçeye özel içerik (mahalleler, çevre ilçeler)
- Önceden seçili kurye çağırma formu
- Otomatik sitemap entegrasyonu

## Yapı

### 📁 Dosya Organizasyonu

```
app/
├── ilceler/
│   └── [slug]/
│       └── page.tsx          # Dinamik ilçe sayfası
├── sitemap.ts                # Otomatik sitemap generator
└── page.tsx                  # Ana sayfa (ilçe listesi eklendi)

lib/
├── district-queries.ts       # Database query fonksiyonları
└── utils.ts                  # Slug helper fonksiyonları

components/
├── sections/
│   └── DistrictsSection.tsx  # İlçe listesi component
└── multi-step-form.tsx       # Güncellenmiş form (defaultDistrict prop)
```

### 🔗 URL Yapısı

- Ana sayfa: `/`
- İlçe sayfası: `/ilceler/[slug]`
  - Örnek: `/ilceler/kadikoy`
  - Örnek: `/ilceler/sisli`
  - Örnek: `/ilceler/atasehir`

### 🎯 SEO Özellikleri

1. **Dinamik Metadata**
   - Unique title ve description her ilçe için
   - OpenGraph tags
   - Canonical URLs
   - Keywords

2. **Structured Data (JSON-LD)**
   - Schema.org Service markup
   - AreaServed bilgisi
   - Organization bilgisi

3. **Sitemap Integration**
   - 39 ilçe sayfası otomatik eklenir
   - Weekly update frequency
   - 0.8 priority

### 🗺️ İlçe Sayfası Bileşenleri

1. **Hero Section**
   - İlçe adı ve mahalle sayısı
   - Call-to-action butonları

2. **Kurye Çağırma Formu**
   - İlçe önceden seçili
   - Mahalle dropdown otomatik yüklenir

3. **Mahalleler Listesi**
   - Grid layout
   - Tüm mahalleler görüntülenir

4. **Çevre İlçeler**
   - 6 en yakın ilçe
   - Direkt link ile erişim

5. **Özellikler Section**
   - İlçeye özel avantajlar

6. **CTA Section**
   - Form'a scroll

## Kullanım

### Yeni İlçe Ekleme

1. Database'e ilçe ekleyin (migration script kullanarak)
2. Sayfa otomatik oluşturulur (generateStaticParams)
3. Sitemap otomatik güncellenir

### Slug Oluşturma

```typescript
import { createSlug } from '@/lib/utils'

createSlug('Kadıköy')      // → 'kadikoy'
createSlug('Şişli')        // → 'sisli'
createSlug('Ataşehir')     // → 'atasehir'
createSlug('Eyüpsultan')   // → 'eyupsultan'
```

### İlçe Verisi Çekme

```typescript
import { getDistrictByName, getNearbyDistricts } from '@/lib/district-queries'

// İlçe ve mahallelerini getir
const district = await getDistrictByName('Kadıköy')

// Çevre ilçeleri getir
const nearby = await getNearbyDistricts('Kadıköy', 6)
```

## Build ve Deploy

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

Build sırasında:
- 39 ilçe sayfası statik olarak generate edilir
- Sitemap otomatik oluşturulur
- Tüm metadata optimize edilir

### Static Generation

Next.js 14 App Router kullanarak tüm ilçe sayfaları build time'da oluşturulur:

```typescript
export async function generateStaticParams() {
  const districts = await getAllDistricts()
  return districts.map((district) => ({
    slug: createSlug(district.name)
  }))
}
```

## SEO Checklist

✅ Unique metadata her sayfa için
✅ Structured data (JSON-LD)
✅ Sitemap.xml
✅ Robots.txt
✅ Canonical URLs
✅ OpenGraph tags
✅ Mobile responsive
✅ Fast page load (static generation)
✅ Internal linking (çevre ilçeler)
✅ Content hierarchy (H1, H2, H3)

## İstatistikler

- **Toplam İlçe Sayfası**: 39
- **Toplam Mahalle**: 851
- **SEO Priority**: 0.8
- **Update Frequency**: Weekly

## İyileştirme Önerileri

1. **Blog Entegrasyonu**: Her ilçe için ilgili blog yazıları göster
2. **Testimonials**: İlçeye özel müşteri yorumları
3. **Pricing**: İlçe bazlı fiyatlandırma
4. **Gallery**: İlçe görselleri
5. **FAQ**: İlçeye özel SSS
