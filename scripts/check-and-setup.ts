import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
  console.log('🔍 Checking if tables exist...\n')

  // Try to query districts table
  const { data: districts, error: districtError } = await supabase
    .from('districts')
    .select('count')
    .limit(1)

  // Try to query neighborhoods table
  const { data: neighborhoods, error: neighborhoodError } = await supabase
    .from('neighborhoods')
    .select('count')
    .limit(1)

  const districtTableExists = !districtError
  const neighborhoodTableExists = !neighborhoodError

  console.log(`Districts table: ${districtTableExists ? '✅ EXISTS' : '❌ NOT FOUND'}`)
  console.log(`Neighborhoods table: ${neighborhoodTableExists ? '✅ EXISTS' : '❌ NOT FOUND'}`)

  if (!districtTableExists || !neighborhoodTableExists) {
    console.log('\n⚠️  Tables are missing!')
    console.log('\n📋 Please run the following SQL in your Supabase Dashboard:')
    console.log('   1. Go to https://supabase.com/dashboard/project/' + supabaseUrl.split('//')[1].split('.')[0])
    console.log('   2. Click on "SQL Editor" in the left menu')
    console.log('   3. Click "New Query"')
    console.log('   4. Copy and paste the contents of scripts/create-tables.sql')
    console.log('   5. Click "Run" to execute\n')
    return false
  }

  // Check if tables have data
  const { count: districtCount } = await supabase
    .from('districts')
    .select('*', { count: 'exact', head: true })

  const { count: neighborhoodCount } = await supabase
    .from('neighborhoods')
    .select('*', { count: 'exact', head: true })

  console.log(`\n📊 Current data:`)
  console.log(`   Districts: ${districtCount || 0}`)
  console.log(`   Neighborhoods: ${neighborhoodCount || 0}`)

  return true
}

checkTables()
