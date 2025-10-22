"use client"

import React, { useEffect, useRef, useState } from 'react'
import { LocationData } from '@/lib/utils'

interface MapComponentProps {
  fromLocation: LocationData | null
  toLocation: LocationData | null
}

const MapComponent: React.FC<MapComponentProps> = ({ fromLocation, toLocation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (!fromLocation || !toLocation || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas boyutlarını ayarla
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    // İstanbul koordinat sınırları (yaklaşık)
    const istanbulBounds = {
      minLng: 28.5,
      maxLng: 29.5,
      minLat: 40.8,
      maxLat: 41.3
    }

    // Koordinatları canvas pozisyonuna çevir
    const coordToCanvas = (lng: number, lat: number) => {
      const x = ((lng - istanbulBounds.minLng) / (istanbulBounds.maxLng - istanbulBounds.minLng)) * (rect.width - 40) + 20
      const y = ((istanbulBounds.maxLat - lat) / (istanbulBounds.maxLat - istanbulBounds.minLat)) * (rect.height - 40) + 20
      return { x, y }
    }

    const fromPoint = coordToCanvas(fromLocation.coordinates[0], fromLocation.coordinates[1])
    const toPoint = coordToCanvas(toLocation.coordinates[0], toLocation.coordinates[1])

    // Temizle
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Arka plan
    ctx.fillStyle = '#f0f9ff'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // İstanbul silueti (basit şekil)
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.rect(10, 10, rect.width - 20, rect.height - 20)
    ctx.stroke()
    ctx.setLineDash([])

    // Başlangıç noktası
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(fromPoint.x, fromPoint.y, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Bitiş noktası
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(toPoint.x, toPoint.y, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Rota çizgisi
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(fromPoint.x, fromPoint.y)
    ctx.lineTo(toPoint.x, toPoint.y)
    ctx.stroke()

    // Animasyonlu moto kurye (nokta)
    if (animationProgress > 0) {
      const x = fromPoint.x + (toPoint.x - fromPoint.x) * animationProgress
      const y = fromPoint.y + (toPoint.y - fromPoint.y) * animationProgress

      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Moto ikonu (basit)
      ctx.fillStyle = '#000000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('🏍️', x, y - 15)
    }

    // Konum etiketleri
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'center'
    
    // Başlangıç etiketi
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(fromPoint.x - 30, fromPoint.y + 15, 60, 20)
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 1
    ctx.strokeRect(fromPoint.x - 30, fromPoint.y + 15, 60, 20)
    ctx.fillStyle = '#1f2937'
    ctx.fillText('Başlangıç', fromPoint.x, fromPoint.y + 28)

    // Bitiş etiketi
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(toPoint.x - 25, toPoint.y + 15, 50, 20)
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 1
    ctx.strokeRect(toPoint.x - 25, toPoint.y + 15, 50, 20)
    ctx.fillStyle = '#1f2937'
    ctx.fillText('Hedef', toPoint.x, toPoint.y + 28)

  }, [fromLocation, toLocation, animationProgress])

  // Animasyon döngüsü
  useEffect(() => {
    if (!fromLocation || !toLocation) return

    const startAnimation = () => {
      const duration = 3000 // 3 saniye
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        setAnimationProgress(progress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Animasyon tamamlandığında 2 saniye bekle ve tekrarla
          setTimeout(startAnimation, 2000)
        }
      }

      animate()
    }

    const timeoutId = setTimeout(startAnimation, 500)

    return () => clearTimeout(timeoutId)
  }, [fromLocation, toLocation])

  if (!fromLocation || !toLocation) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <p className="text-lg">🗺️</p>
          <p className="mt-2">Konum seçtikten sonra harita görünecek</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-64 bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-3 bg-gray-50 border-b">
        <h4 className="font-medium text-gray-900 flex items-center">
          🗺️ Rota Haritası
        </h4>
        <p className="text-sm text-gray-600 mt-1">
          {fromLocation.district} → {toLocation.district}
        </p>
      </div>
      
      <div className="relative h-52">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Konum bilgileri overlay */}
        <div className="absolute top-2 left-2 space-y-1">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">
              {fromLocation.neighborhood}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">
              {toLocation.neighborhood}
            </span>
          </div>
        </div>

        {/* Animasyon durumu */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
          🏍️ Kurye yolda...
        </div>
      </div>
    </div>
  )
}

export default MapComponent