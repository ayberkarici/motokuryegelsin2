import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Package, Users, ArrowRight, Clock, Shield, Phone, Mail, CheckCircle, Truck, Timer, Star } from 'lucide-react'
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
    title: `${district.name} Moto Kurye | Hızlı ve Güvenilir Teslimat`,
    description: `${district.name} ilçesinde profesyonel moto kurye hizmeti. ${neighborhoodCount} mahallede 7/24 hızlı teslimat. Anında kurye çağır, güvenli teslimat.`,
    keywords: `${district.name} kurye, ${district.name} moto kurye, ${district.name} motorlu kurye, İstanbul kurye, hızlı teslimat ${district.name}`,
    openGraph: {
      title: `${district.name} Moto Kurye | Hızlı Teslimat`,
      description: `${district.name} ve ${neighborhoodCount} mahallesinde profesyonel kurye hizmeti`,
      type: 'website',
      locale: 'tr_TR',
    },
    alternates: {
      canonical: `https://motokuryegelsin.com/ilceler/${params.slug}`
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
              'description': `${district.name} ilçesinde profesyonel moto kurye hizmeti. ${districtData.neighborhoods.length} mahallede 7/24 hızlı teslimat.`,
              'provider': {
                '@type': 'Organization',
                'name': 'Moto Kurye Gelsin',
                'url': 'https://motokuryegelsin.com'
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
                'serviceUrl': `https://motokuryegelsin.com/ilceler/${createSlug(district.name)}`
              }
            })
          }}
        />

      {/* Hero Section with Background Image */}
      <section className="relative text-white py-20 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${district.photo_url || 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200'})` }}
        />
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
              {districtData.neighborhoods.length} mahallede 7/24 hızlı ve güvenilir teslimat hizmeti
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

      {/* Neighborhoods Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {district.name} Mahalleleri
            </h2>
            
            <p className="text-center text-gray-600 mb-8">
              {district.name} ilçesinin tüm mahallelerine hizmet veriyoruz
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {districtData.neighborhoods.map((neighborhood) => (
                <Card key={neighborhood.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{neighborhood.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                      <span className="text-sm text-gray-600">7/24 destek hattı</span>
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
            <h2 className="text-3xl font-bold mb-8 text-center">
              {district.name} Kurye Hakkında Sık Sorulan Sorular
            </h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {district.name}'de kurye hizmeti nasıl çalışır?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Online formdan veya WhatsApp üzerinden sipariş veriyorsunuz. Kuryeniz {district.name}'deki konumunuzdan alarak, 
                    belirttiğiniz adrese güvenle teslim ediyor. Tüm süreç boyunca SMS ile bilgilendiriliyorsunuz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {district.name}'in hangi mahallelerine hizmet veriyorsunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {district.name}'in tüm {districtData.neighborhoods.length} mahallesine kesintisiz hizmet veriyoruz. 
                    Yukarıdaki mahalleler listesinden size en yakın mahalleri görebilirsiniz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Teslimat ücreti nasıl hesaplanıyor?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Fiyatlandırma, mesafe, kargo tipi ve aciliyet durumuna göre belirleniyor. 
                    Form üzerinden detayları girdikten sonra net fiyat bilgisi WhatsApp üzerinden size iletiliyor.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Gece saatlerinde de hizmet veriyor musunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Evet! {district.name}'de 7/24 kesintisiz hizmet veriyoruz. Gece, gündüz, hafta sonu ve resmi tatillerde 
                    kuryelerimiz her an hizmetinizdedir.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Ödemeyi nasıl yapabilirim?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nakit ödeme veya havale/EFT ile ödeme yapabilirsiniz.
                    Ödeme yönteminizi sipariş sırasında belirleyebilirsiniz.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Hangi bölgelere hizmet veriyorsunuz?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    İstanbul'un tüm ilçelerine ve çevre illere (Kocaeli, Tekirdağ, Bursa, Sakarya, Yalova)
                    hizmet veriyoruz. {district.name} başta olmak üzere geniş bir coğrafyada kurye hizmeti sunmaktayız.
                  </p>
                </CardContent>
              </Card>
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
