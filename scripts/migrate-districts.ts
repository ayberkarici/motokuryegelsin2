import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface DistrictData {
  neighborhood_count: number
  neighborhoods: Array<{ name: string }>
}

interface DistrictsJSON {
  [districtName: string]: DistrictData
}

interface IstanbulMahalleFeature {
  type: 'Feature'
  properties: {
    address: {
      town: string
      suburb?: string
    }
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

interface IstanbulMahalleJSON {
  type: 'FeatureCollection'
  features: IstanbulMahalleFeature[]
}

// İlçe isim eşleştirme haritası (districts.json -> istanbul-mahaller.json)
const districtNameMapping: { [key: string]: string } = {
  'Arnavutköy': 'Arnavutköy',
  'Ataşehir': 'Ataşehir',
  'Avcılar': 'Avcılar',
  'Bağcılar': 'Bağcılar',
  'Bahçelievler': 'Bahçelievler',
  'Bakırköy': 'Bakırköy',
  'Başakşehir': 'Başakşehir',
  'Bayrampaşa': 'Bayrampaşa',
  'Beşiktaş': 'Beşiktaş',
  'Beykoz': 'Beykoz',
  'Beylikdüzü': 'Beylikdüzü',
  'Beyoğlu': 'Beyoğlu',
  'Büyükçekmece': 'Büyükçekmece',
  'Çatalca': 'Çatalca',
  'Çekmeköy': 'Çekmeköy',
  'Esenler': 'Esenler',
  'Esenyurt': 'Esenyurt',
  'Eyüpsultan': 'Eyüp',
  'Fatih': 'Fatih',
  'Gaziosmanpaşa': 'Gaziosmanpaşa',
  'Güngören': 'Güngören',
  'Kadıköy': 'Kadıköy',
  'Kağıthane': 'Kağıthane',
  'Kartal': 'Kartal',
  'Küçükçekmece': 'Küçükçekmece',
  'Maltepe': 'Maltepe',
  'Pendik': 'Pendik',
  'Sancaktepe': 'Sancaktepe',
  'Sarıyer': 'Sarıyer',
  'Silivri': 'Silivri',
  'Sultanbeyli': 'Sultanbeyli',
  'Sultangazi': 'Sultangazi',
  'Şile': 'Şile',
  'Şişli': 'Şişli',
  'Tuzla': 'Tuzla',
  'Ümraniye': 'Ümraniye',
  'Üsküdar': 'Üsküdar',
  'Zeytinburnu': 'Zeytinburnu',
  'Adalar': 'Adalar'
}

async function migrateDistricts() {
  try {
    console.log('🚀 Starting migration...')

    // 1. Load districts.json
    console.log('📖 Reading districts.json...')
    const districtsPath = path.join(process.cwd(), 'districts.json')
    const districtsData: DistrictsJSON = JSON.parse(fs.readFileSync(districtsPath, 'utf-8'))

    // 2. Load istanbul-mahaller.json for coordinates
    console.log('📖 Reading istanbul-mahaller.json...')
    const istanbulPath = path.join(process.cwd(), 'public', 'data', 'istanbul-mahaller.json')
    const istanbulData: IstanbulMahalleJSON = JSON.parse(fs.readFileSync(istanbulPath, 'utf-8'))

    // 3. Create district coordinates map
    const districtCoordinates: { [key: string]: { lng: number; lat: number } } = {}
    
    istanbulData.features.forEach(feature => {
      const districtName = feature.properties.address.town
      const [lng, lat] = feature.geometry.coordinates
      
      if (!districtCoordinates[districtName]) {
        districtCoordinates[districtName] = { lng, lat }
      }
    })

    // 4. Clear existing data
    console.log('🗑️  Clearing existing neighborhoods...')
    const { error: deleteNeighborhoodsError } = await supabase
      .from('neighborhoods')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (deleteNeighborhoodsError) {
      console.error('Error deleting neighborhoods:', deleteNeighborhoodsError)
    }

    console.log('🗑️  Clearing existing districts...')
    const { error: deleteDistrictsError } = await supabase
      .from('districts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (deleteDistrictsError) {
      console.error('Error deleting districts:', deleteDistrictsError)
    }

    // 5. Insert new districts and neighborhoods
    let districtCount = 0
    let neighborhoodCount = 0

    for (const [districtName, districtData] of Object.entries(districtsData)) {
      // Find coordinates for this district from its neighborhoods
      const mappedName = districtNameMapping[districtName] || districtName
      const neighborhoodFeatures = features.filter(f => f.properties.address.town === mappedName)
      
      if (neighborhoodFeatures.length === 0) {
        console.warn(`⚠️  No neighborhoods found for district: ${districtName} (mapped: ${mappedName})`)
        continue
      }

      // Calculate district center from all neighborhoods
      const coordinates = neighborhoodFeatures.map(f => f.geometry.coordinates)
      const centerLng = coordinates.reduce((sum, c) => sum + c[0], 0) / coordinates.length
      const centerLat = coordinates.reduce((sum, c) => sum + c[1], 0) / coordinates.length
      
      // Calculate bounding box
      const lngs = coordinates.map(c => c[0])
      const lats = coordinates.map(c => c[1])
      const bbox = [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)]
      
      // Create point geometry for district center
      const geometry = {
        type: 'Point',
        coordinates: [centerLng, centerLat]
      }

      // Insert district
      const { data: district, error: districtError } = await supabase
        .from('districts')
        .insert({
          name: districtName,
          center_lng: centerLng,
          center_lat: centerLat,
          osm_id: 0,
          bbox,
          geometry
        })
        .select()
        .single()

      if (districtError) {
        console.error(`❌ Error inserting district ${districtName}:`, districtError)
        continue
      }

      districtCount++
      console.log(`✅ District: ${districtName} (${districtData.neighborhood_count} neighborhoods)`)

      // Insert neighborhoods for this district
      const neighborhoodsToInsert = districtData.neighborhoods.map(n => ({
        name: n.name,
        district_id: district.id,
        center_lng: coords.lng, // Use district coordinates for neighborhoods
        center_lat: coords.lat,
        osm_id: 0,
        bbox: [coords.lng - 0.01, coords.lat - 0.01, coords.lng + 0.01, coords.lat + 0.01],
        geometry: null
      }))

      const { error: neighborhoodsError } = await supabase
        .from('neighborhoods')
        .insert(neighborhoodsToInsert)

      if (neighborhoodsError) {
        console.error(`❌ Error inserting neighborhoods for ${districtName}:`, neighborhoodsError)
      } else {
        neighborhoodCount += neighborhoodsToInsert.length
        console.log(`   → ${neighborhoodsToInsert.length} neighborhoods added`)
      }
    }

    console.log('\n🎉 Migration completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Districts added: ${districtCount}`)
    console.log(`   - Neighborhoods added: ${neighborhoodCount}`)

  } catch (error) {
    console.error('💥 Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateDistricts()
