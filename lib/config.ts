/**
 * Merkezi İletişim ve Konfigürasyon Bilgileri
 * Tüm sayfalar bu bilgileri kullanmalıdır
 */

export const CONTACT_INFO = {
  phone: '+90 541 695 52 34',
  phoneFormatted: '0541 695 52 34',
  whatsapp: '905416955234',
  email: 'MotoKuryeGelsin@gmail.com',
  address: 'Baraj sk. No: 44-46 Ümraniye / İstanbul',
  workingHours: {
    weekday: '24 Saat',
    weekend: '24 Saat',
    holidays: 'Açık',
    description: '7/24 Kesintisiz Hizmet'
  }
} as const

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  twitter: '#',
  linkedin: '#'
} as const

export const COMPANY_INFO = {
  name: 'Moto Kurye Gelsin',
  description: 'İstanbul\'un her yerinde hızlı ve güvenilir moto kurye hizmeti',
  slogan: 'Hızlı, Güvenli, Ekonomik'
} as const
