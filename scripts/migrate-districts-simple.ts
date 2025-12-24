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

// İstanbul ilçelerinin merkez koordinatları
const districtCoordinates: { [key: string]: { lng: number; lat: number } } = {
  'Adalar': { lng: 29.1245, lat: 40.8783 },
  'Arnavutköy': { lng: 28.7355, lat: 41.1917 },
  'Ataşehir': { lng: 29.1167, lat: 40.9833 },
  'Avcılar': { lng: 28.7211, lat: 41.0244 },
  'Bağcılar': { lng: 28.8333, lat: 41.0333 },
  'Bahçelievler': { lng: 28.8444, lat: 40.9888 },
  'Bakırköy': { lng: 28.8777, lat: 40.9888 },
  'Başakşehir': { lng: 28.8094, lat: 41.0811 },
  'Bayrampaşa': { lng: 28.9206, lat: 41.0453 },
  'Beşiktaş': { lng: 29.0377, lat: 41.0777 },
  'Beykoz': { lng: 29.0983, lat: 41.1347 },
  'Beylikdüzü': { lng: 28.6428, lat: 41.0028 },
  'Beyoğlu': { lng: 28.9777, lat: 41.0366 },
  'Büyükçekmece': { lng: 28.5844, lat: 41.0203 },
  'Çatalca': { lng: 28.4611, lat: 41.1442 },
  'Çekmeköy': { lng: 29.2194, lat: 41.0325 },
  'Esenler': { lng: 28.8806, lat: 41.0442 },
  'Esenyurt': { lng: 28.6764, lat: 41.0322 },
  'Eyüpsultan': { lng: 28.9333, lat: 41.0444 },
  'Fatih': { lng: 28.9777, lat: 41.0055 },
  'Gaziosmanpaşa': { lng: 28.9106, lat: 41.0711 },
  'Güngören': { lng: 28.8777, lat: 41.0222 },
  'Kadıköy': { lng: 29.0222, lat: 40.9888 },
  'Kâğıthane': { lng: 28.9856, lat: 41.0783 },
  'Kartal': { lng: 29.1888, lat: 40.9055 },
  'Küçükçekmece': { lng: 28.7856, lat: 41.0206 },
  'Maltepe': { lng: 29.1333, lat: 40.9333 },
  'Pendik': { lng: 29.2333, lat: 40.8777 },
  'Sancaktepe': { lng: 29.2364, lat: 41.0086 },
  'Sarıyer': { lng: 29.0222, lat: 41.1111 },
  'Silivri': { lng: 28.2461, lat: 41.0753 },
  'Sultanbeyli': { lng: 29.2631, lat: 40.9656 },
  'Sultangazi': { lng: 28.8819, lat: 41.1089 },
  'Şile': { lng: 29.6178, lat: 41.1767 },
  'Şişli': { lng: 28.9994, lat: 41.0666 },
  'Tuzla': { lng: 29.2997, lat: 40.8236 },
  'Ümraniye': { lng: 29.1333, lat: 41.0111 },
  'Üsküdar': { lng: 29.0222, lat: 41.0222 },
  'Zeytinburnu': { lng: 28.9111, lat: 41.0055 }
}

async function migrateDistricts() {
  try {
    console.log('🚀 Starting migration...')

    // 1. Load districts.json
    console.log('📖 Reading districts.json...')
    const districtsPath = path.join(process.cwd(), 'districts.json')
    const districtsData: DistrictsJSON = JSON.parse(fs.readFileSync(districtsPath, 'utf-8'))

    // 2. Clear existing data
    console.log('🗑️  Clearing existing neighborhoods...')
    const { error: deleteNeighborhoodsError } = await supabase
      .from('neighborhoods')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (deleteNeighborhoodsError) {
      console.error('Error deleting neighborhoods:', deleteNeighborhoodsError)
    }

    console.log('🗑️  Clearing existing districts...')
    const { error: deleteDistrictsError } = await supabase
      .from('districts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (deleteDistrictsError) {
      console.error('Error deleting districts:', deleteDistrictsError)
    }

    // 3. Insert new districts and neighborhoods
    let districtCount = 0
    let neighborhoodCount = 0
    let districtOsmId = 1000000

    for (const [districtName, districtData] of Object.entries(districtsData)) {
      const coords = districtCoordinates[districtName]
      
      if (!coords) {
        console.warn(`⚠️  No coordinates defined for district: ${districtName}`)
        continue
      }

      const centerLng = coords.lng
      const centerLat = coords.lat
      
      // Create bounding box (approximately 10km around center)
      const bbox = [
        centerLng - 0.05,
        centerLat - 0.05,
        centerLng + 0.05,
        centerLat + 0.05
      ]
      
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
          osm_id: districtOsmId++,
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

      // Insert neighborhoods for this district (all using district coordinates)
      let neighborhoodOsmId = districtOsmId * 1000
      const neighborhoodsToInsert = districtData.neighborhoods.map(n => ({
        name: n.name,
        district_id: district.id,
        center_lng: centerLng,
        center_lat: centerLat,
        osm_id: neighborhoodOsmId++,
        bbox,
        geometry
      }))

      if (neighborhoodsToInsert.length > 0) {
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
    }

    console.log('\n🎉 Migration completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Districts added: ${districtCount}`)
    console.log(`   - Neighborhoods added: ${neighborhoodCount}`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateDistricts()
