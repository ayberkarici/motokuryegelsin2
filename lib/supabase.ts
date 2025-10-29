import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript types for our tables
export interface District {
  id: string
  name: string
  osm_id: number
  bbox: number[] // [minLng, minLat, maxLng, maxLat]
  geometry: any // GeoJSON geometry object
  center_lng: number
  center_lat: number
  created_at?: string
}

export interface Neighborhood {
  id: string
  district_id: string
  name: string
  osm_id: number
  bbox: number[] // [minLng, minLat, maxLng, maxLat]
  geometry: any // GeoJSON geometry object
  center_lng: number
  center_lat: number
  created_at?: string
}
