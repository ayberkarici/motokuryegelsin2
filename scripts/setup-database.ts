import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials not found in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
  console.log('🔧 Setting up database tables...\n')

  // Read SQL file
  const sqlPath = path.join(process.cwd(), 'scripts', 'create-tables.sql')
  const sql = fs.readFileSync(sqlPath, 'utf-8')

  // Split by semicolons to execute statements separately
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`📝 Found ${statements.length} SQL statements to execute\n`)

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i]
    console.log(`Executing statement ${i + 1}/${statements.length}...`)

    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement })

      if (error) {
        console.error(`❌ Error: ${error.message}`)
      } else {
        console.log(`✅ Success`)
      }
    } catch (err) {
      console.error(`❌ Exception:`, err)
    }
  }

  console.log('\n✨ Database setup completed!')
}

setupDatabase()
