import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkZumrutevler() {
  // Check Zümrütevler
  const { data: zumrutevler, error: zError } = await supabase
    .from('neighborhoods')
    .select('*, districts(name)')
    .ilike('name', '%zümrütevler%')

  console.log('\n🔍 Zümrütevler Mahallesi:')
  if (zumrutevler && zumrutevler.length > 0) {
    zumrutevler.forEach((n: any) => {
      console.log(`✅ ${n.name} - ${n.districts.name}`)
    })
  } else {
    console.log('❌ Bulunamadı')
  }

  // Check all Maltepe neighborhoods
  const { data: maltepeNeighborhoods, error: mError } = await supabase
    .from('neighborhoods')
    .select('name, districts!inner(name)')
    .eq('districts.name', 'Maltepe')
    .order('name')

  console.log(`\n📍 Maltepe Mahalleleri (${maltepeNeighborhoods?.length || 0} adet):`)
  maltepeNeighborhoods?.forEach((n: any, i: number) => {
    console.log(`  ${i + 1}. ${n.name}`)
  })
}

checkZumrutevler()
