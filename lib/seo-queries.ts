import { supabaseServer } from '@/lib/supabase/server'
import { STATIC_PAGES } from '@/lib/sitemap-pages'
import { createSlug } from '@/lib/utils'

export interface PageSeo {
  id: string
  page_key: string
  page_label: string
  page_path: string
  title: string
  description: string
  keywords: string
  updated_at: string
}

export async function getPageSeo(pageKey: string): Promise<PageSeo | null> {
  const { data, error } = await supabaseServer
    .from('page_seo')
    .select('*')
    .eq('page_key', pageKey)
    .single()

  if (error || !data) return null
  return data as PageSeo
}

export async function getAllPageSeo(): Promise<PageSeo[]> {
  const { data, error } = await supabaseServer
    .from('page_seo')
    .select('*')
    .order('page_label')

  if (error || !data) return []
  return data as PageSeo[]
}

export async function syncPageSeoRows(
  districts: { name: string }[]
): Promise<void> {
  const existing = await getAllPageSeo()
  const existingKeys = new Set(existing.map((p) => p.page_key))
  const rows: Omit<PageSeo, 'id' | 'updated_at'>[] = []

  for (const page of STATIC_PAGES) {
    if (!existingKeys.has(page.page_key)) {
      rows.push({
        page_key: page.page_key,
        page_label: page.label,
        page_path: page.path,
        title: page.defaults.title,
        description: page.defaults.description,
        keywords: page.defaults.keywords,
      })
    }
  }

  for (const district of districts) {
    const slug = createSlug(district.name)
    const key = `ilce-${slug}`
    if (!existingKeys.has(key)) {
      rows.push({
        page_key: key,
        page_label: `${district.name} (İlçe)`,
        page_path: `/ilceler/${slug}`,
        title: `${district.name} Moto Kurye | Hızlı Teslimat | MotoKuryeGelsin`,
        description: `${district.name} ilçesinde profesyonel moto kurye hizmeti. Hızlı teslimat. Evrak, paket ve acil kurye. Hemen kurye çağır!`,
        keywords: `${district.name} kurye, ${district.name} moto kurye, ${district.name} motorlu kurye, hızlı teslimat ${district.name}`,
      })
    }
  }

  if (rows.length > 0) {
    await supabaseServer
      .from('page_seo')
      .insert(rows)
  }
}
