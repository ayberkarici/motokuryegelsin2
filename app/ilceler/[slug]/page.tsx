import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Package, Users, ArrowRight, Clock, Shield, Phone, Mail, CheckCircle, Truck, Timer, Star, MessageCircle } from 'lucide-react'
import { getAllDistricts, getDistrictByName, getNearbyDistricts } from '@/lib/district-queries'
import { createSlug } from '@/lib/utils'
import { getDistrictTheme } from '@/lib/district-themes'
import { CONTACT_INFO } from '@/lib/config'
import MultiStepForm from '@/components/multi-step-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FixedWhatsAppButton from '@/components/fixed-whatsapp-button'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for all districts
export async function generateStaticParams() {
  const districts = await getAllDistricts()
  
  return districts.map((district) => ({
    slug: createSlug(district.name)
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const districts = await getAllDistricts()
  const district = districts.find(d => createSlug(d.name) === params.slug)
  
  if (!district) {
    return {
      title: 'İlçe Bulunamadı | Moto Kurye Gelsin'
    }
  }

  const districtData = await getDistrictByName(district.name)
  const neighborhoodCount = districtData?.neighborhoods.length || 0

  return {
    title: `${district.name} Moto Kurye | ${neighborhoodCount} Mahallede Hızlı Teslimat | MotoKuryeGelsin`,
    description: `${district.name} ilçesinde profesyonel moto kurye hizmeti. ${neighborhoodCount} mahallede hızlı teslimat. Evrak, paket ve acil kurye. VIP teslimat 1 saat içinde. Hemen kurye çağır!`,
    keywords: `${district.name} kurye, ${district.name} moto kurye, ${district.name} motorlu kurye, İstanbul kurye, hızlı teslimat ${district.name}, ${district.name} acil kurye, ${district.name} evrak kurye, ${district.name} paket teslimat`,
    openGraph: {
      title: `${district.name} Moto Kurye | ${neighborhoodCount} Mahallede Hızlı Teslimat`,
      description: `${district.name} ve ${neighborhoodCount} mahallesinde profesyonel kurye hizmeti. Evrak, paket ve acil teslimat. 1 saat içinde VIP teslimat garantisi.`,
      url: `https://www.motokuryegelsin.com/ilceler/${params.slug}`,
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${district.name} Moto Kurye Hizmeti`,
      description: `${neighborhoodCount} mahallede hızlı ve güvenilir teslimat`,
    },
    alternates: {
      canonical: `https://www.motokuryegelsin.com/ilceler/${params.slug}`
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'page-type': 'district-landing',
      'geo.region': 'TR-34',
      'geo.placename': `${district.name}, İstanbul`,
    }
  }
}

export default async function DistrictPage({ params }: PageProps) {
  const districts = await getAllDistricts()
  const district = districts.find(d => createSlug(d.name) === params.slug)
  
  if (!district) {
    notFound()
  }

  const districtData = await getDistrictByName(district.name)
  const nearbyDistricts = await getNearbyDistricts(district.name)

  if (!districtData) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              'name': `${district.name} Moto Kurye Hizmeti`,
              'description': `${district.name} ilçesinde profesyonel moto kurye hizmeti. ${districtData.neighborhoods.length} mahallede hızlı teslimat.`,
              'provider': {
                '@type': 'Organization',
                'name': 'Moto Kurye Gelsin',
                'url': 'https://www.motokuryegelsin.com'
              },
              'areaServed': {
                '@type': 'City',
                'name': district.name,
                'containedIn': {
                  '@type': 'City',
                  'name': 'İstanbul'
                }
              },
              'serviceType': 'Kurye Hizmeti',
              'availableChannel': {
                '@type': 'ServiceChannel',
                'serviceUrl': `https://www.motokuryegelsin.com/ilceler/${createSlug(district.name)}`
              }
            })
          }}
        />

      {/* Hero Section with Background Image */}
      <section className="relative text-white py-20 overflow-hidden min-h-[500px] flex items-center">
        {/* Optimized Background Image with Skeleton Loading */}
        <div className="absolute inset-0">
          {/* Dark skeleton with glass shimmer effect */}
          <div className="absolute inset-0 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          
          {/* Optimized Next.js Image */}
          <Image
            src={district.photo_url || 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=75'}
            alt={`${district.name} İstanbul moto kurye hizmeti`}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${getDistrictTheme(district.name)} opacity-80`}></div>
        
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">İstanbul / {district.name}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {district.name} Moto Kurye
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              {districtData.neighborhoods.length} mahallede hızlı ve güvenilir teslimat hizmeti
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <Package className="h-5 w-5" />
                <span>Hızlı Teslimat</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <Users className="h-5 w-5" />
                <span>Profesyonel Kuryeler</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                {district.name}'de Hemen Kurye Çağır
              </h2>
              <p className="text-gray-600">
                Formu doldurun, kuryeniz dakikalar içinde yola çıksın
              </p>
            </div>
            
            <MultiStepForm defaultDistrict={district.name} />
          </div>
        </div>
      </section>

      {/* Detailed District Information - SEO Rich Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {district.name} Kurye Hizmeti Hakkında
            </h2>
            
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p className="leading-relaxed">
                <strong>{district.name} moto kurye hizmeti</strong> ile İstanbul'un bu önemli ilçesinde 
                evraklarınızı, paketlerinizi ve acil gönderilerinizi güvenle ve hızla ulaştırıyoruz. 
                {district.name}'de bulunan {districtData.neighborhoods.length} mahallenin tamamına 
                kesintisiz teslimat hizmeti sunmaktayız. Profesyonel kurye ekibimiz sayesinde 
                işletmenizin ve kişisel ihtiyaçlarınızın her türlü teslimat gereksinimine cevap veriyoruz.
              </p>

              <p className="leading-relaxed">
                {district.name} bölgesinde <Link href="/hizmetler/dokuman-teslimat" className="text-blue-600 hover:underline font-medium">döküman teslimat</Link>, 
                {' '}<Link href="/hizmetler/paket-kargo" className="text-blue-600 hover:underline font-medium">paket kargo</Link>, 
                {' '}<Link href="/hizmetler/acil-kurye" className="text-blue-600 hover:underline font-medium">acil kurye</Link> ve 
                {' '}<Link href="/hizmetler/kurumsal-cozumler" className="text-blue-600 hover:underline font-medium">kurumsal çözümler</Link> dahil 
                olmak üzere geniş bir hizmet yelpazesi sunuyoruz. Noter evrakları, sözleşmeler, 
                ihale dökümanları, tıbbi raporlar, elektronik ürünler, yedek parçalar ve daha 
                pek çok farklı türde gönderiyi aynı gün içinde güvenle teslim ediyoruz.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {district.name}'de Sunduğumuz Teslimat Seçenekleri
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>VIP Teslimat:</strong> 1 saat içinde öncelikli teslimat garantisi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Express Teslimat:</strong> 1-2 saat arası hızlı teslimat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Normal Teslimat:</strong> 2-4 saat içinde ekonomik teslimat</span>
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed">
                <strong>Geniş çalışma saatleri</strong> ile {district.name} içinde hafta içi ve hafta sonu 
                kurye hizmeti sağlıyoruz. Acil evrak teslimi gerektiğinde veya son dakika ihaleleriniz 
                olduğunda bize güvenebilirsiniz. 
                Tecrübeli moto kurye ekibimiz, İstanbul trafiğinde en hızlı rotaları kullanarak 
                gönderilerinizi zamanında teslim eder.
              </p>

              <p className="leading-relaxed">
                {district.name} merkezli işletmeler için <Link href="/hizmetler/kurumsal-cozumler" className="text-blue-600 hover:underline font-medium">özel kurumsal paketler</Link> de 
                sunuyoruz. Aylık sabit kontratlar, detaylı faturalama, özel fiyatlandırma ve 
                öncelikli hizmet avantajlarından yararlanabilirsiniz. Hukuk büroları, muhasebe 
                ofisleri, e-ticaret şirketleri, reklam ajansları ve sağlık kurumları gibi 
                düzenli kurye ihtiyacı olan işletmelere özel çözümler üretiyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {district.name} Kurye Hizmeti Verdiğimiz Mahalleler
            </h2>
            
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              {district.name} ilçesinin <strong>{districtData.neighborhoods.length} mahallesinin tamamına</strong> hızlı ve 
              güvenilir kurye hizmeti sunuyoruz. Her mahallede aynı kaliteli hizmeti alacağınızdan emin olabilirsiniz. 
              Aşağıda {district.name}'nin tüm mahallelerini bulabilirsiniz:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {districtData.neighborhoods.map((neighborhood) => (
                <Card key={neighborhood.id} className="hover:shadow-md transition-shadow hover:border-orange-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{neighborhood.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Mahallenizdeki adresinize en yakın kurye ile hızlı teslimat
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="#order-form">
                  <Package className="mr-2 h-5 w-5" />
                  Hemen Sipariş Ver
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer in District */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {district.name}'de Sunduğumuz Kurye Hizmetleri
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/hizmetler/dokuman-teslimat">
                <Card className="h-full hover:shadow-lg transition-all hover:border-blue-500 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Truck className="h-5 w-5 text-blue-600" />
                      Döküman Teslimat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Noter evrakları, sözleşmeler, ihale dökümanları ve önemli belgeleriniz için
                    </p>
                    <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1">
                      Detaylı Bilgi <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hizmetler/paket-kargo">
                <Card className="h-full hover:shadow-lg transition-all hover:border-green-500 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Package className="h-5 w-5 text-green-600" />
                      Paket Kargo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Küçük ve orta boy paketler, e-ticaret ürünleri, hediye gönderileri
                    </p>
                    <span className="text-green-600 text-sm font-medium inline-flex items-center gap-1">
                      Detaylı Bilgi <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hizmetler/acil-kurye">
                <Card className="h-full hover:shadow-lg transition-all hover:border-red-500 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Timer className="h-5 w-5 text-red-600" />
                      Acil Kurye
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Son dakika evrakları, acil belgeler ve zaman kritik gönderiler
                    </p>
                    <span className="text-red-600 text-sm font-medium inline-flex items-center gap-1">
                      Detaylı Bilgi <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hizmetler/kurumsal-cozumler">
                <Card className="h-full hover:shadow-lg transition-all hover:border-purple-500 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                      Kurumsal Çözümler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      İşletmeniz için özel paketler, aylık kontratlar ve toplu hizmetler
                    </p>
                    <span className="text-purple-600 text-sm font-medium inline-flex items-center gap-1">
                      Detaylı Bilgi <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-700 mb-4">
                Tüm hizmetlerimiz hakkında detaylı bilgi almak için
              </p>
              <Button asChild variant="default" size="lg">
                <Link href="/hizmetler">
                  Tüm Hizmetleri Görüntüle
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Districts Section */}
      {nearbyDistricts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Çevre İlçeler
              </h2>
              
              <p className="text-center text-gray-600 mb-8">
                {district.name}'e yakın diğer ilçelerde de hizmet veriyoruz
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyDistricts.map((nearbyDistrict) => (
                  <Link 
                    key={nearbyDistrict.id} 
                    href={`/ilceler/${createSlug(nearbyDistrict.name)}`}
                  >
                    <Card className="hover:shadow-lg transition-all hover:border-orange-500 h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{nearbyDistrict.name}</span>
                          <ArrowRight className="h-5 w-5 text-orange-500" />
                        </CardTitle>
                        <CardDescription>
                          {nearbyDistrict.neighborhood_count || 0} mahalle
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Detayları Gör
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {district.name}'de Neden Biz?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-orange-500" />
                    Hızlı Teslimat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {district.name} içinde hızlı ve güvenli teslimat
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    Profesyonel Ekip
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Deneyimli ve güvenilir kurye kadromuz
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    Tüm Mahalleler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {district.name}'in {districtData.neighborhoods.length} mahallesine ulaşım
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {district.name}'de Kurye İhtiyacınız mı Var?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Hemen sipariş verin, kuryeniz yola çıksın
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#order-form">
              Kurye Çağır
            </Link>
          </Button>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {district.name} Kurye Hizmet Detayları
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Hafta İçi</span>
                    <span className="text-gray-600">{CONTACT_INFO.workingHours.weekday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Hafta Sonu</span>
                    <span className="text-gray-600">{CONTACT_INFO.workingHours.weekend}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Resmi Tatiller</span>
                    <span className="text-gray-600">{CONTACT_INFO.workingHours.holidays}</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      {CONTACT_INFO.workingHours.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-orange-500" />
                    Teslimat Süreleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">VIP Teslimat</span>
                    <span className="text-red-600 font-semibold">1 saat</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Express Teslimat</span>
                    <span className="text-orange-600 font-semibold">1-2 saat</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Normal Teslimat</span>
                    <span className="text-blue-600 font-semibold">2-4 saat</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Güvenli Teslimat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Profesyonel kuryeler</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-orange-500" />
                    Kargo Türleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Evrak ve doküman</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Paket ve koli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Büyük ve ağır yükler</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-orange-500" />
                    Müşteri Memnuniyeti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">%99 başarı oranı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">4.8/5 müşteri puanı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-gray-600">Hızlı destek</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {district.name} Kurye Hakkında Sık Sorulan Sorular
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {district.name} bölgesinde kurye hizmeti hakkında en çok merak edilen sorular ve cevapları
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">❓</span>
                    {district.name}'de kurye hizmeti nasıl çalışır?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    <Link href="/kurye-cagir" className="text-blue-600 hover:underline font-medium">Online formdan</Link> veya 
                    WhatsApp üzerinden sipariş veriyorsunuz. Kuryeniz {district.name}'deki konumunuzdan alarak, 
                    belirttiğiniz adrese güvenle teslim ediyor. Tüm süreç boyunca SMS ile bilgilendiriliyorsunuz. 
                    İster evrak, ister paket teslimatı olsun, aynı günde teslim garantisi veriyoruz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">📍</span>
                    {district.name}'in hangi mahallelerine hizmet veriyorsunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {district.name}'in tüm <strong>{districtData.neighborhoods.length} mahallesine</strong> kesintisiz hizmet veriyoruz. 
                    Yukarıdaki mahalleler listesinden size en yakın mahalleri görebilirsiniz. Her mahallede aynı 
                    kaliteli ve hızlı hizmeti alacağınızdan emin olabilirsiniz. Mahalle sınırları dahilinde her 
                    adrese teslimat yapıyoruz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">⏱️</span>
                    {district.name}'de teslimat süreleri ne kadar?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>VIP Teslimat:</strong> 1 saat içinde öncelikli teslimat<br/>
                    <strong>Express Teslimat:</strong> 1-2 saat arası hızlı teslimat<br/>
                    <strong>Normal Teslimat:</strong> 2-4 saat içinde ekonomik teslimat<br/>
                    İhtiyacınıza göre en uygun teslimat seçeneğini sipariş sırasında belirleyebilirsiniz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">💰</span>
                    Teslimat ücreti nasıl hesaplanıyor?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Fiyatlandırma; mesafe, kargo tipi (evrak, paket, büyük koli), aciliyet durumu ve teslimat 
                    saatine göre belirleniyor. <Link href="/kurye-cagir" className="text-blue-600 hover:underline">Form üzerinden</Link> detayları 
                    girdikten sonra net fiyat bilgisi WhatsApp üzerinden size anında iletiliyor. 
                    Şeffaf fiyatlandırma politikamızla gizli maliyet söz konusu değildir.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">🌙</span>
                    Gece saatlerinde de {district.name}'de hizmet veriyor musunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Hafta içi ve hafta sonu geniş çalışma saatleri ile {district.name}'de hizmet veriyoruz. 
                    Mesai saatleri içinde ve hafta sonları da kurye hizmeti alabilirsiniz. Çalışma saatlerimiz 
                    için bize ulaşabilirsiniz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">💳</span>
                    Ödemeyi nasıl yapabilirim?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Nakit ödeme veya havale/EFT ile ödeme yapabilirsiniz. Ödeme yönteminizi sipariş sırasında 
                    belirleyebilirsiniz. <Link href="/hizmetler/kurumsal-cozumler" className="text-blue-600 hover:underline">Kurumsal müşterilerimiz</Link> için 
                    aylık toplu faturalama ve cari hesap seçenekleri de mevcuttur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">📦</span>
                    Ne tür gönderiler için kurye hizmeti alabilirim?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    <Link href="/hizmetler/dokuman-teslimat" className="text-blue-600 hover:underline">Evrak ve dökümanlar</Link> (noter, 
                    sözleşme, ihale), <Link href="/hizmetler/paket-kargo" className="text-blue-600 hover:underline">paket ve koli</Link> (e-ticaret, 
                    hediye), elektronik ürünler, yedek parça, tıbbi malzeme, gıda ürünleri ve daha pek çok 
                    farklı türde gönderi için hizmet veriyoruz. 20 kg'a kadar paketler taşınabilir.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">🏢</span>
                    {district.name}'deki işletmem için kurumsal hizmet alabilir miyim?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Evet! {district.name}'de bulunan işletmeler için <Link href="/hizmetler/kurumsal-cozumler" className="text-blue-600 hover:underline">özel 
                    kurumsal çözümler</Link> sunuyoruz. Aylık paket anlaşmalar, özel fiyatlandırma, öncelikli hizmet, 
                    detaylı raporlama ve özel müşteri temsilcisi gibi avantajlardan yararlanabilirsiniz. 
                    <Link href="/iletisim" className="text-blue-600 hover:underline ml-1">İletişim sayfamızdan</Link> teklif alabilirsiniz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">🌍</span>
                    {district.name} dışına da teslimat yapıyor musunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Evet! İstanbul'un tüm ilçelerine ve çevre illere (Kocaeli, Tekirdağ, Bursa, Sakarya, Yalova)
                    hizmet veriyoruz. {district.name}'den başka ilçelere veya {district.name}'e diğer ilçelerden 
                    teslimat yapabiliyoruz. Şehirler arası kurye hizmetimiz de mevcuttur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span className="text-orange-500 text-xl">🔒</span>
                    Gönderilerimin güvenliği nasıl sağlanıyor?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Tüm kuryelerimiz tecrübeli ve güvenilir profesyonellerdir. Gönderileriniz özel kurye çantalarında 
                    korunarak taşınır. Her teslimat için imzalı teslim belgesi alınır. Önemli ve değerli gönderiler 
                    için sigorta seçeneği de mevcuttur. 
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Başka sorularınız mı var? Size yardımcı olmaktan memnuniyet duyarız!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default">
                  <Link href="/iletisim">
                    <Phone className="mr-2 h-4 w-4" />
                    Bize Ulaşın
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://wa.me/905416955234" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Destek
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {district.name} Kurye İletişim
            </h2>
            <p className="text-gray-600 mb-8">
              Sorularınız için bize ulaşabilirsiniz
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium mb-1">Telefon</p>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-orange-600 hover:text-orange-700">
                        {CONTACT_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium mb-1">E-posta</p>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-orange-600 hover:text-orange-700">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    <FixedWhatsAppButton />
    </>
  )
}
