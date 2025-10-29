"use client"

import React, { useEffect, useRef, useState } from 'react'
import { LocationData } from '@/lib/utils'

interface MapComponentProps {
  fromLocation: LocationData | null
  toLocation: LocationData | null
}

const MapComponent: React.FC<MapComponentProps> = ({ fromLocation, toLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const layersRef = useRef<any>({})
  const [isLoading, setIsLoading] = useState(true)

  // Cleanup map on component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        console.log('Component unmount - harita temizleniyor')
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Initialize map when locations are available and container is rendered
  useEffect(() => {
    // Don't initialize if locations not selected yet
    if (!fromLocation || !toLocation) return

    console.log('Map useEffect çalıştı, mapContainerRef.current:', !!mapContainerRef.current)
    if (!mapContainerRef.current) {
      console.log('mapContainerRef.current yok, return ediliyor')
      return
    }

    // Don't reinitialize if map already exists
    if (mapRef.current) {
      console.log('Map zaten var, initialization atlanıyor')
      setIsLoading(false)
      return
    }

    let isMounted = true

    const initMap = async () => {
      try {
        console.log('initMap başladı')
        // Dynamic import - only load on client side
        const L = (await import('leaflet')).default
        console.log('Leaflet yüklendi')

        // Fix default marker icons in Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })

        if (!isMounted || mapRef.current) {
          console.log('isMounted:', isMounted, 'mapRef.current var mı:', !!mapRef.current)
          setIsLoading(false)
          return
        }

        console.log('Harita oluşturuluyor...')
        const map = L.map(mapContainerRef.current!, {
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          attributionControl: true,
        }).setView([41.0082, 28.9784], 11)

        console.log('Tile layer ekleniyor...')
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map)

        mapRef.current = map
        console.log('Harita başarıyla oluşturuldu!')
        setIsLoading(false)
      } catch (error) {
        console.error('Harita yüklenirken hata:', error)
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [fromLocation, toLocation])

  // Update map when locations change
  useEffect(() => {
    if (!mapRef.current || !fromLocation || !toLocation || isLoading) return

    const updateMap = async () => {
      try {
        const L = (await import('leaflet')).default
        const map = mapRef.current

        // Clear previous layers
        if (layersRef.current.fromBoundary) map.removeLayer(layersRef.current.fromBoundary)
        if (layersRef.current.toBoundary) map.removeLayer(layersRef.current.toBoundary)
        if (layersRef.current.fromMarker) map.removeLayer(layersRef.current.fromMarker)
        if (layersRef.current.toMarker) map.removeLayer(layersRef.current.toMarker)
        if (layersRef.current.routeLine) map.removeLayer(layersRef.current.routeLine)

        const bounds = L.latLngBounds([])

        // Custom marker icons
        const greenIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #22c55e; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        const redIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        // Add FROM boundary
        if (fromLocation.geometry) {
          const fromBoundary = L.geoJSON(fromLocation.geometry, {
            style: {
              color: '#22c55e',
              weight: 2,
              opacity: 0.8,
              fillColor: '#22c55e',
              fillOpacity: 0.1,
            },
          }).addTo(map)

          layersRef.current.fromBoundary = fromBoundary
          bounds.extend(fromBoundary.getBounds())
        }

        // Add TO boundary
        if (toLocation.geometry) {
          const toBoundary = L.geoJSON(toLocation.geometry, {
            style: {
              color: '#ef4444',
              weight: 2,
              opacity: 0.8,
              fillColor: '#ef4444',
              fillOpacity: 0.1,
            },
          }).addTo(map)

          layersRef.current.toBoundary = toBoundary
          bounds.extend(toBoundary.getBounds())
        }

        // Add FROM marker
        const fromLatLng: [number, number] = [fromLocation.coordinates[1], fromLocation.coordinates[0]]
        const fromMarker = L.marker(fromLatLng, { icon: greenIcon })
          .bindPopup(`
            <div style="text-align: center;">
              <strong style="color: #22c55e;">📍 Başlangıç</strong><br/>
              <span style="font-size: 13px;">${fromLocation.neighborhood}</span><br/>
              <span style="font-size: 11px; color: #666;">${fromLocation.district}</span>
            </div>
          `)
          .addTo(map)

        layersRef.current.fromMarker = fromMarker
        bounds.extend(fromLatLng)

        // Add TO marker
        const toLatLng: [number, number] = [toLocation.coordinates[1], toLocation.coordinates[0]]
        const toMarker = L.marker(toLatLng, { icon: redIcon })
          .bindPopup(`
            <div style="text-align: center;">
              <strong style="color: #ef4444;">🎯 Hedef</strong><br/>
              <span style="font-size: 13px;">${toLocation.neighborhood}</span><br/>
              <span style="font-size: 11px; color: #666;">${toLocation.district}</span>
            </div>
          `)
          .addTo(map)

        layersRef.current.toMarker = toMarker
        bounds.extend(toLatLng)

        // Add route line
        const routeLine = L.polyline([fromLatLng, toLatLng], {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 5',
        }).addTo(map)

        layersRef.current.routeLine = routeLine

        // Fit bounds
        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            padding: [30, 30],
            maxZoom: 14,
            animate: true,
          })
        }

        // Auto-open popup
        setTimeout(() => {
          fromMarker.openPopup()
        }, 500)
      } catch (error) {
        console.error('Harita güncellenirken hata:', error)
      }
    }

    updateMap()
  }, [fromLocation, toLocation, isLoading])

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
          {fromLocation.neighborhood} → {toLocation.neighborhood}
        </p>
      </div>

      <div className="relative h-52">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Harita yükleniyor...</p>
            </div>
          </div>
        )}

        <div
          ref={mapContainerRef}
          className="w-full h-full"
          style={{ background: '#f0f9ff' }}
        />

        {/* Info overlay */}
        {!isLoading && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-xs space-y-1 z-[1000]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">{fromLocation.district}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium">{toLocation.district}</span>
            </div>
            <div className="text-gray-500 text-[10px] mt-1 pt-1 border-t">
              🏍️ Kurye rotası
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapComponent
