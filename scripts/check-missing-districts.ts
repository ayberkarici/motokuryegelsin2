import * as fs from 'fs'
import * as path from 'path'

const mahalleDataPath = path.join(process.cwd(), 'data', 'mahalle_geojson.json')
const mahalleData = JSON.parse(fs.readFileSync(mahalleDataPath, 'utf-8'))

const noTown = mahalleData.features.filter((f: any) =>
  !f.properties.address.town && !f.properties.address.archipelago
)

console.log(`\n📊 Town/archipelago olmayan mahalle sayısı: ${noTown.length}`)
console.log(`📊 Toplam mahalle: ${mahalleData.features.length}`)
console.log(`📊 Yüzde: ${((noTown.length / mahalleData.features.length) * 100).toFixed(1)}%\n`)

console.log('İlk 10 örnek:\n')
noTown.slice(0, 10).forEach((f: any, i: number) => {
  const name = f.properties.address.suburb || f.properties.address.city
  const displayName = f.properties.display_name
  console.log(`${i + 1}. ${name}`)
  console.log(`   ${displayName}\n`)
})

// Try to extract district from display_name
console.log('\n🔍 Display_name\'den ilçe çıkarma denemesi:\n')
noTown.slice(0, 5).forEach((f: any) => {
  const displayParts = f.properties.display_name.split(',')
  console.log('Display name:', f.properties.display_name)
  console.log('Parts:', displayParts)
  console.log('---')
})
