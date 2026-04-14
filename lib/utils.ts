import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Turkish characters to URL-safe slug
export function createSlug(text: string): string {
  const turkishMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  }
  
  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Convert slug back to district name (for display)
export function slugToDistrictName(slug: string): string {
  // This will need to match against actual district names from DB
  const capitalizeWords = (str: string) => 
    str.split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ')
  
  return capitalizeWords(slug)
}

export interface LocationData {
  district: string;
  neighborhood: string;
  coordinates: [number, number]; // [lng, lat]
  geometry?: any; // GeoJSON geometry for drawing boundaries
  bbox?: number[]; // Bounding box [minLng, minLat, maxLng, maxLat]
}

export interface FormData {
  locationFrom: LocationData | null;
  locationTo: LocationData | null;
  cargoType: 'envelope' | 'small-package' | 'medium-package' | 'large-package' | 'oversized-package' | '';
  cargoWeight: '1-2kg' | '2-5kg' | '5-10kg' | '10-15kg' | '15-20kg' | '20kg+' | '';
  cargoDetails: string;
  timePreference: 'vip' | 'express' | 'standard' | '';
  scheduledDate?: Date;
}

export interface DistrictData {
  [district: string]: LocationData[];
}

export interface DistrictOption {
  value: string;
  label: string;
  coordinates: [number, number];
}

export interface NeighborhoodOption {
  value: string;
  label: string;
  district: string;
  coordinates: [number, number];
}

// İlçe verilerini yükle
export async function loadDistricts(): Promise<DistrictOption[]> {
  try {
    const response = await fetch('/data/ilce_geojson.json');
    const geoJson = await response.json();
    
    const districts: DistrictOption[] = [];
    const seen = new Set<string>();
    
    geoJson.features.forEach((feature: any) => {
      const districtName = feature.properties.address.archipelago || 
                          feature.properties.address.province;
      
      if (districtName && districtName.includes('İstanbul') === false && !seen.has(districtName)) {
        seen.add(districtName);
        
        // Merkez koordinatı hesapla (bbox'tan)
        const bbox = feature.bbox;
        const centerLng = (bbox[0] + bbox[2]) / 2;
        const centerLat = (bbox[1] + bbox[3]) / 2;
        
        districts.push({
          value: districtName.toLowerCase().replace(/\s+/g, '-'),
          label: districtName,
          coordinates: [centerLng, centerLat]
        });
      }
    });
    
    return districts.sort((a, b) => a.label.localeCompare(b.label, 'tr'));
  } catch (error) {
    console.error('İlçe verileri yüklenirken hata:', error);
    return [];
  }
}

// Mahalle verilerini yükle
export async function loadNeighborhoods(): Promise<NeighborhoodOption[]> {
  try {
    const response = await fetch('/data/mahalle_geojson.json');
    const geoJson = await response.json();
    
    const neighborhoods: NeighborhoodOption[] = [];
    const seen = new Set<string>();
    
    geoJson.features.forEach((feature: any) => {
      const neighborhoodName = feature.properties.address.city;
      const districtName = feature.properties.address.archipelago;
      
      const uniqueKey = `${districtName}-${neighborhoodName}`;
      
      if (neighborhoodName && districtName && !seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        
        // Merkez koordinatı hesapla (bbox'tan)
        const bbox = feature.bbox;
        const centerLng = (bbox[0] + bbox[2]) / 2;
        const centerLat = (bbox[1] + bbox[3]) / 2;
        
        neighborhoods.push({
          value: `${districtName.toLowerCase()}-${neighborhoodName.toLowerCase()}`.replace(/\s+/g, '-'),
          label: `${neighborhoodName} (${districtName})`,
          district: districtName,
          coordinates: [centerLng, centerLat]
        });
      }
    });
    
    return neighborhoods.sort((a, b) => a.label.localeCompare(b.label, 'tr'));
  } catch (error) {
    console.error('Mahalle verileri yüklenirken hata:', error);
    return [];
  }
}

// İstanbul mahalle verilerini işleyen fonksiyon
export async function loadLocationData(): Promise<DistrictData> {
  try {
    const response = await fetch('/data/istanbul-mahaller.json');
    const geoJson = await response.json();
    
    const districts: DistrictData = {};
    
    geoJson.features.forEach((feature: any) => {
      const district = feature.properties.address.town;
      const neighborhood = feature.properties.address.suburb;
      const coordinates = feature.geometry.coordinates as [number, number];
      
      if (!districts[district]) {
        districts[district] = [];
      }
      
      districts[district].push({
        district,
        neighborhood,
        coordinates
      });
    });
    
    return districts;
  } catch (error) {
    console.error('Konum verileri yüklenirken hata:', error);
    return {};
  }
}

// WhatsApp mesaj formatı
export function formatWhatsAppMessage(formData: FormData): string {
  const timeText = formData.timePreference === 'vip' ? 'VIP Teslimat (1 saat)' :
                   formData.timePreference === 'express' ? 'Ekspres Teslimat (1-2 saat)' :
                   formData.timePreference === 'standard' ? 'Normal Teslimat (2-4 saat)' : '';

  const cargoTypeText =
    formData.cargoType === 'envelope' ? 'Evrak/Zarf' :
    formData.cargoType === 'small-package' ? 'Küçük Paket' :
    formData.cargoType === 'medium-package' ? 'Orta Paket' :
    formData.cargoType === 'large-package' ? 'Büyük Paket' :
    formData.cargoType === 'oversized-package' ? 'Çanta Aşan Paket' : 'Belirtilmedi';

  const weightText =
    formData.cargoWeight === '1-2kg' ? '1-2 kg' :
    formData.cargoWeight === '2-5kg' ? '2-5 kg' :
    formData.cargoWeight === '5-10kg' ? '5-10 kg' :
    formData.cargoWeight === '10-15kg' ? '10-15 kg' :
    formData.cargoWeight === '15-20kg' ? '15-20 kg' :
    formData.cargoWeight === '20kg+' ? '20 kg üstü' : 'Belirtilmedi';

  return `Merhaba, yeni bir kurye talebim var:

📍 Nereden: ${formData.locationFrom?.district} - ${formData.locationFrom?.neighborhood}
📍 Nereye: ${formData.locationTo?.district} - ${formData.locationTo?.neighborhood}
📦 Kargo Türü: ${cargoTypeText}
⚖️ Ağırlık: ${weightText}${formData.cargoDetails ? '\n📝 Detay: ' + formData.cargoDetails : ''}
⏰ Zamanlama: ${timeText}

Teşekkürler!`;
}

// WhatsApp URL'si oluşturma
export function createWhatsAppUrl(message: string, phoneNumber: string = '905416955299'): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// İki nokta arasındaki mesafeyi hesaplama (Haversine formülü)
export function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // 2 decimal places
}