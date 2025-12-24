import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { getDistrictFromPostcode } from './postcode-district-mapping'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials not found in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface GeoJSONFeature {
  type: string
  properties: {
    osm_id: number
    address: {
      city?: string
      suburb?: string
      town?: string
      archipelago?: string
      province?: string
      postcode?: string
    }
  }
  bbox: number[]
  geometry: any
}

interface GeoJSONCollection {
  type: string
  features: GeoJSONFeature[]
}

async function uploadDistricts() {
  console.log('📍 Loading districts from ilce_geojson.json...')

  const ilceDataPath = path.join(process.cwd(), 'data', 'ilce_geojson.json')
  const ilceData: GeoJSONCollection = JSON.parse(fs.readFileSync(ilceDataPath, 'utf-8'))

  console.log(`Found ${ilceData.features.length} districts`)

  const districtMap = new Map<string, string>() // name -> id mapping

  let processed = 0
  for (const feature of ilceData.features) {
    // District name can be in 'archipelago' (for Adalar) or 'town' field
    const districtName = feature.properties.address.archipelago ||
                        feature.properties.address.town ||
                        feature.properties.address.province
    processed++

    console.log(`[${processed}/${ilceData.features.length}] Processing: ${districtName}`)

    if (!districtName || districtName === 'İstanbul') {
      console.log(`  ⏭️  Skipped (no name or İstanbul)`)
      continue
    }

    const bbox = feature.bbox
    const centerLng = (bbox[0] + bbox[2]) / 2
    const centerLat = (bbox[1] + bbox[3]) / 2

    const district = {
      name: districtName,
      osm_id: feature.properties.osm_id,
      bbox: bbox,
      geometry: feature.geometry,
      center_lng: centerLng,
      center_lat: centerLat
    }

    try {
      // First check if district already exists
      const { data: existing } = await supabase
        .from('districts')
        .select('id, name')
        .eq('osm_id', feature.properties.osm_id)
        .single()

      if (existing) {
        console.log(`  ✓ Already exists, using ID: ${existing.id}`)
        districtMap.set(districtName, existing.id)
      } else {
        // Insert new district
        const { data, error } = await supabase
          .from('districts')
          .insert(district)
          .select()
          .single()

        if (error) {
          console.error(`  ❌ Error: ${error.message}`)
        } else {
          districtMap.set(districtName, data.id)
          console.log(`  ✅ Inserted with ID: ${data.id}`)
        }
      }
    } catch (err) {
      console.error(`  ❌ Exception:`, err)
    }
  }

  return districtMap
}

async function uploadNeighborhoods(districtMap: Map<string, string>) {
  console.log('\n🏘️  Loading neighborhoods from mahalle_geojson.json...')

  const mahalleDataPath = path.join(process.cwd(), 'data', 'mahalle_geojson.json')
  const mahalleData: GeoJSONCollection = JSON.parse(fs.readFileSync(mahalleDataPath, 'utf-8'))

  console.log(`Found ${mahalleData.features.length} neighborhoods`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const feature of mahalleData.features) {
    // Neighborhood name can be in 'suburb' or 'city' field
    const neighborhoodName = feature.properties.address.suburb ||
                             feature.properties.address.city

    if (!neighborhoodName) {
      skipCount++
      continue
    }

    // District name can be in 'town' or 'archipelago' field
    let districtName = feature.properties.address.town ||
                       feature.properties.address.archipelago

    // If no district, try to get from postcode
    if (!districtName) {
      const postcode = feature.properties.address.postcode
      districtName = getDistrictFromPostcode(postcode) || undefined
    }

    if (!districtName) {
      skipCount++
      continue
    }

    const districtId = districtMap.get(districtName)

    if (!districtId) {
      // console.warn(`⚠️  District not found in DB: ${districtName} for ${neighborhoodName}`)
      skipCount++
      continue
    }

    const bbox = feature.bbox
    const centerLng = (bbox[0] + bbox[2]) / 2
    const centerLat = (bbox[1] + bbox[3]) / 2

    const neighborhood = {
      district_id: districtId,
      name: neighborhoodName,
      osm_id: feature.properties.osm_id,
      bbox: bbox,
      geometry: feature.geometry,
      center_lng: centerLng,
      center_lat: centerLat
    }

    try {
      const { error } = await supabase
        .from('neighborhoods')
        .upsert(neighborhood, { onConflict: 'osm_id' })

      if (error) {
        console.error(`❌ Error inserting neighborhood ${neighborhoodName}:`, error.message)
        errorCount++
      } else {
        successCount++
        if (successCount % 50 === 0) {
          console.log(`✅ Processed ${successCount} neighborhoods...`)
        }
      }
    } catch (err) {
      console.error(`❌ Exception inserting neighborhood ${neighborhoodName}:`, err)
      errorCount++
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`✅ Successfully inserted: ${successCount} neighborhoods`)
  console.log(`⚠️  Skipped: ${skipCount} neighborhoods`)
  console.log(`❌ Errors: ${errorCount} neighborhoods`)
}

async function main() {
  console.log('🚀 Starting GeoJSON data upload to Supabase...\n')

  try {
    // First upload districts
    const districtMap = await uploadDistricts()

    // Then upload neighborhoods with district references
    await uploadNeighborhoods(districtMap)

    console.log('\n✨ Upload completed successfully!')
  } catch (error) {
    console.error('💥 Fatal error during upload:', error)
    process.exit(1)
  }
}

main()
