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
    weekday: '09:00 - 22:00',
    weekend: '10:00 - 20:00',
    holidays: 'Arayınız',
    description: 'Hafta içi ve hafta sonu geniş çalışma saatleri'
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
