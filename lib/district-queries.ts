import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface District {
  id: string
  name: string
  center_lng: number
  center_lat: number
  neighborhood_count: number
  bbox: number[]
  geometry: any
  photo_url?: string | null
}

export interface Neighborhood {
  id: string
  name: string
  district_id: string
  center_lng: number
  center_lat: number
}

export interface DistrictWithNeighborhoods extends District {
  neighborhoods: Neighborhood[]
}

// Get all districts (for sitemap and listing)
export async function getAllDistricts(): Promise<District[]> {
  const { data, error } = await supabase
    .from('districts')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching districts:', error)
    return []
  }

  return data || []
}

// Get district by name with neighborhoods
export async function getDistrictByName(name: string): Promise<DistrictWithNeighborhoods | null> {
  const { data: district, error: districtError } = await supabase
    .from('districts')
    .select('*')
    .eq('name', name)
    .single()

  if (districtError || !district) {
    console.error('Error fetching district:', districtError)
    return null
  }

  const { data: neighborhoods, error: neighborhoodsError } = await supabase
    .from('neighborhoods')
    .select('*')
    .eq('district_id', district.id)
    .order('name')

  if (neighborhoodsError) {
    console.error('Error fetching neighborhoods:', neighborhoodsError)
    return { ...district, neighborhoods: [] }
  }

  return { ...district, neighborhoods: neighborhoods || [] }
}

// Get nearby districts (based on proximity - simplified version)
export async function getNearbyDistricts(districtName: string, limit: number = 6): Promise<District[]> {
  const currentDistrict = await getDistrictByName(districtName)
  if (!currentDistrict) return []

  const allDistricts = await getAllDistricts()
  
  // Get neighborhood counts for all districts
  const { data: neighborhoodCounts } = await supabase
    .from('neighborhoods')
    .select('district_id')
  
  // Count neighborhoods per district
  const countMap = new Map<string, number>()
  neighborhoodCounts?.forEach(n => {
    countMap.set(n.district_id, (countMap.get(n.district_id) || 0) + 1)
  })
  
  // Calculate distance and sort
  const districtsWithDistance = allDistricts
    .filter(d => d.name !== districtName)
    .map(d => ({
      ...d,
      neighborhood_count: countMap.get(d.id) || 0,
      distance: Math.sqrt(
        Math.pow(d.center_lng - currentDistrict.center_lng, 2) +
        Math.pow(d.center_lat - currentDistrict.center_lat, 2)
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)

  return districtsWithDistance
}

// Get district statistics
export async function getDistrictStats() {
  const { data: districts, error: districtError } = await supabase
    .from('districts')
    .select('id')

  const { data: neighborhoods, error: neighborhoodError } = await supabase
    .from('neighborhoods')
    .select('id')

  return {
    totalDistricts: districts?.length || 0,
    totalNeighborhoods: neighborhoods?.length || 0
  }
}
