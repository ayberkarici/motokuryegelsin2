/**
 * Google Sitemap Ping Script
 * Run this after deploying to notify Google about sitemap updates
 * 
 * Usage: npx ts-node scripts/ping-google.ts
 */

const SITEMAP_URL = 'https://www.motokuryegelsin.com/sitemap.xml'

async function pingGoogle() {
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ]

  console.log('🔔 Pinging search engines with sitemap...\n')

  for (const url of pingUrls) {
    try {
      const response = await fetch(url)
      const engine = url.includes('google') ? 'Google' : 'Bing'
      
      if (response.ok) {
        console.log(`✅ ${engine}: Sitemap ping successful (${response.status})`)
      } else {
        console.log(`⚠️ ${engine}: Ping returned status ${response.status}`)
      }
    } catch (error) {
      console.error(`❌ Error pinging:`, error)
    }
  }

  console.log('\n📋 Manual actions to speed up indexing:')
  console.log('1. Go to Google Search Console')
  console.log('2. Click "Sitemaps" in the left menu')
  console.log('3. Submit: sitemap.xml')
  console.log('4. Use "URL Inspection" tool and click "Request Indexing" for important pages')
  console.log('\n🔗 Priority URLs to request indexing:')
  
  const priorityUrls = [
    'https://www.motokuryegelsin.com/',
    'https://www.motokuryegelsin.com/ilceler/kadikoy',
    'https://www.motokuryegelsin.com/ilceler/besiktas',
    'https://www.motokuryegelsin.com/ilceler/sisli',
    'https://www.motokuryegelsin.com/ilceler/uskudar',
    'https://www.motokuryegelsin.com/ilceler/beyoglu',
    'https://www.motokuryegelsin.com/hizmetler',
    'https://www.motokuryegelsin.com/kurye-cagir',
  ]
  
  priorityUrls.forEach(url => console.log(`   - ${url}`))
}

pingGoogle()
