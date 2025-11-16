"use client"

import React, { useEffect, useRef, useState } from 'react'
import { LocationData } from '@/lib/utils'

interface MapComponentProps {
  fromLocation: LocationData | null
  toLocation: LocationData | null
  height?: number
}

const MapComponent: React.FC<MapComponentProps> = ({ fromLocation, toLocation, height = 400 }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const layersRef = useRef<any>({})
  const [isLoading, setIsLoading] = useState(true)

  // Cleanup map on component unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Initialize map when locations are available and container is rendered
  useEffect(() => {
    if (!fromLocation || !toLocation || !mapContainerRef.current) return
    if (mapRef.current) {
      setIsLoading(false)
      return
    }

    let isMounted = true

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default

        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })

        if (!isMounted || mapRef.current) {
          setIsLoading(false)
          return
        }

        const map = L.map(mapContainerRef.current!, {
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
          tap: false,
          attributionControl: false,
        }).setView([41.0082, 28.9784], 11)

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 18,
        }).addTo(map)

        mapRef.current = map
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

  // Update map size when height changes
  useEffect(() => {
    if (mapRef.current && height) {
      setTimeout(() => {
        mapRef.current.invalidateSize()
      }, 100)
    }
  }, [height])

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
        if (layersRef.current.routeLine) map.removeLayer(layersRef.current.routeLine)
        if (layersRef.current.fromMarker) map.removeLayer(layersRef.current.fromMarker)
        if (layersRef.current.toMarker) map.removeLayer(layersRef.current.toMarker)

        const bounds = L.latLngBounds([])

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

        // Add route line
        const fromLatLng: [number, number] = [fromLocation.coordinates[1], fromLocation.coordinates[0]]
        const toLatLng: [number, number] = [toLocation.coordinates[1], toLocation.coordinates[0]]
        const routeLine = L.polyline([fromLatLng, toLatLng], {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 5',
        }).addTo(map)

        layersRef.current.routeLine = routeLine

        // Add circular markers
        const fromMarker = L.circleMarker(fromLatLng, {
          radius: 8,
          fillColor: '#3b82f6',
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map)

        const toMarker = L.circleMarker(toLatLng, {
          radius: 8,
          fillColor: '#ef4444',
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map)

        layersRef.current.fromMarker = fromMarker
        layersRef.current.toMarker = toMarker

        // Fit bounds
        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            padding: [30, 30],
            maxZoom: 14,
            animate: true,
          })
        }
      } catch (error) {
        console.error('Harita güncellenirken hata:', error)
      }
    }

    updateMap()
  }, [fromLocation, toLocation, isLoading])

  if (!fromLocation || !toLocation) {
    return (
      <div
        className="w-full bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
        style={{ height: `${height}px` }}
      >
        <div className="text-center text-gray-500">
          <p className="text-lg">🗺️</p>
          <p className="mt-2">Konum seçtikten sonra harita görünecek</p>
        </div>
      </div>
    )
  }

  const headerHeight = 60 // Approximate height of header
  const mapContentHeight = height - headerHeight

  return (
    <div
      className="w-full bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col"
      style={{ height: `${height}px` }}
    >
      <div className="p-3 bg-gray-50 border-b shrink-0">
        <h4 className="font-medium text-gray-900 flex items-center">
          🗺️ Rota Haritası
        </h4>
        <p className="text-sm text-gray-600 mt-1">
          {fromLocation.neighborhood} → {toLocation.neighborhood}
        </p>
      </div>

      <div
        className="relative flex-1"
      >
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
      </div>
    </div>
  )
}

export default MapComponent
