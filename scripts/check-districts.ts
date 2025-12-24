import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkDistricts() {
  const { data: districts, error } = await supabase
    .from('districts')
    .select('id, name, osm_id')
    .order('name')

  if (error) {
    console.error('Error fetching districts:', error)
    return
  }

  console.log(`\n📍 Total districts: ${districts?.length || 0}\n`)

  districts?.forEach((d, i) => {
    console.log(`${i + 1}. ${d.name} (OSM: ${d.osm_id})`)
  })
}

checkDistricts()
