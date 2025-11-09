'use client'

import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { createSlug } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { getAllDistricts } from '@/lib/district-queries'
import { District } from '@/lib/district-queries'

export default function DistrictsSection() {
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDistricts() {
      const data = await getAllDistricts()
      setDistricts(data)
      setLoading(false)
    }
    loadDistricts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hizmet Verdiğimiz İlçeler
            </h2>
            <p className="text-xl text-gray-600">
              İstanbul'un tüm ilçelerinde profesyonel kurye hizmeti
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hizmet Verdiğimiz İlçeler
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            İstanbul'un <span className="font-bold text-orange-600">{districts.length}</span> ilçesinde profesyonel kurye hizmeti
          </p>
          <p className="text-gray-500">
            İlçenize özel detayları görüntülemek için tıklayın
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {districts.map((district) => (
            <Link
              key={district.id}
              href={`/ilceler/${createSlug(district.name)}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg hover:border-orange-500 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="font-medium text-sm group-hover:text-orange-600 transition-colors truncate">
                        {district.name}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                  {district.neighborhood_count > 0 && (
                    <p className="text-xs text-gray-500 mt-2 ml-6">
                      {district.neighborhood_count} mahalle
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            İlçenizi göremiyor musunuz? <Link href="/iletisim" className="text-orange-600 hover:text-orange-700 font-medium underline">İletişime geçin</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
