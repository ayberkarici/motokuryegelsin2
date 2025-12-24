// Mevcut blogların yazar ismini güncellemek için bir kerelik script
// Çalıştırmak için: npx ts-node scripts/update-author-name.ts
// Not: .env.local dosyası yüklenmez, credentials gerekirse ekleyin

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials bulunamadı. .env.local dosyasını kontrol edin.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateAuthorNames() {
  console.log('Yazar isimleri güncelleniyor...')
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ author_name: 'Elif Yılmaz' })
    .or('author_name.eq.AI Blog Generator,author_name.is.null')
    .select()

  if (error) {
    console.error('Hata:', error)
    return
  }

  console.log(`${data?.length || 0} blog yazısı güncellendi.`)
  console.log('Güncellenen yazılar:', data?.map(p => p.title))
}

updateAuthorNames()
