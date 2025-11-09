// District-specific color themes for hero sections
export const districtThemes: { [key: string]: { from: string; via: string; to: string } } = {
  'Kadıköy': { from: 'from-blue-500', via: 'via-blue-600', to: 'to-indigo-600' },
  'Beşiktaş': { from: 'from-gray-800', via: 'via-gray-900', to: 'to-black' },
  'Şişli': { from: 'from-purple-500', via: 'via-purple-600', to: 'to-pink-600' },
  'Beyoğlu': { from: 'from-red-500', via: 'via-red-600', to: 'to-orange-600' },
  'Fatih': { from: 'from-amber-500', via: 'via-orange-500', to: 'to-red-500' },
  'Üsküdar': { from: 'from-teal-500', via: 'via-cyan-600', to: 'to-blue-600' },
  'Sarıyer': { from: 'from-green-500', via: 'via-emerald-600', to: 'to-teal-600' },
  'Bakırköy': { from: 'from-orange-500', via: 'via-red-500', to: 'to-pink-600' },
  'Ataşehir': { from: 'from-indigo-500', via: 'via-purple-600', to: 'to-pink-600' },
  'Ümraniye': { from: 'from-cyan-500', via: 'via-blue-600', to: 'to-indigo-600' },
  'Maltepe': { from: 'from-sky-500', via: 'via-blue-500', to: 'to-indigo-500' },
  'Kartal': { from: 'from-emerald-500', via: 'via-green-600', to: 'to-teal-600' },
  'Pendik': { from: 'from-lime-500', via: 'via-green-600', to: 'to-emerald-600' },
  'Zeytinburnu': { from: 'from-rose-500', via: 'via-red-600', to: 'to-orange-600' },
  'Güngören': { from: 'from-amber-500', via: 'via-orange-600', to: 'to-red-600' },
  'Bahçelievler': { from: 'from-green-500', via: 'via-emerald-500', to: 'to-teal-500' },
  'Bağcılar': { from: 'from-violet-500', via: 'via-purple-600', to: 'to-fuchsia-600' },
  'Eyüpsultan': { from: 'from-blue-600', via: 'via-indigo-700', to: 'to-purple-700' },
  'Gaziosmanpaşa': { from: 'from-orange-600', via: 'via-red-600', to: 'to-rose-700' },
  'Esenler': { from: 'from-yellow-500', via: 'via-orange-600', to: 'to-red-600' },
  'Küçükçekmece': { from: 'from-cyan-500', via: 'via-sky-600', to: 'to-blue-600' },
  'Sultangazi': { from: 'from-indigo-600', via: 'via-violet-700', to: 'to-purple-700' },
  'Bayrampaşa': { from: 'from-red-600', via: 'via-rose-600', to: 'to-pink-600' },
  'Kâğıthane': { from: 'from-teal-600', via: 'via-cyan-700', to: 'to-sky-700' },
  'Başakşehir': { from: 'from-blue-500', via: 'via-indigo-600', to: 'to-violet-600' },
  'Arnavutköy': { from: 'from-green-600', via: 'via-teal-600', to: 'to-cyan-600' },
  'Esenyurt': { from: 'from-orange-600', via: 'via-amber-600', to: 'to-yellow-600' },
  'Avcılar': { from: 'from-sky-600', via: 'via-blue-700', to: 'to-indigo-700' },
  'Beylikdüzü': { from: 'from-violet-600', via: 'via-purple-700', to: 'to-fuchsia-700' },
  'Büyükçekmece': { from: 'from-blue-600', via: 'via-cyan-700', to: 'to-teal-700' },
  'Çatalca': { from: 'from-emerald-600', via: 'via-green-700', to: 'to-teal-700' },
  'Silivri': { from: 'from-sky-700', via: 'via-blue-800', to: 'to-indigo-800' },
  'Beykoz': { from: 'from-green-700', via: 'via-emerald-800', to: 'to-teal-800' },
  'Çekmeköy': { from: 'from-amber-600', via: 'via-orange-700', to: 'to-red-700' },
  'Sancaktepe': { from: 'from-indigo-700', via: 'via-purple-800', to: 'to-violet-800' },
  'Sultanbeyli': { from: 'from-rose-600', via: 'via-pink-700', to: 'to-fuchsia-700' },
  'Tuzla': { from: 'from-cyan-700', via: 'via-sky-800', to: 'to-blue-800' },
  'Şile': { from: 'from-teal-700', via: 'via-cyan-800', to: 'to-sky-800' },
  'Adalar': { from: 'from-blue-700', via: 'via-indigo-800', to: 'to-purple-800' },
  // Default theme
  'default': { from: 'from-orange-500', via: 'via-red-500', to: 'to-red-600' }
}

export function getDistrictTheme(districtName: string): string {
  const theme = districtThemes[districtName] || districtThemes['default']
  return `bg-gradient-to-br ${theme.from} ${theme.via} ${theme.to}`
}
