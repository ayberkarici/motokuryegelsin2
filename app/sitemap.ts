import { MetadataRoute } from 'next'
import { getAllDistricts } from '@/lib/district-queries'
import { createSlug } from '@/lib/utils'
import { supabaseServer } from '@/lib/supabase/server'
import { STATIC_PAGES } from '@/lib/sitemap-pages'

async function getBlogPosts() {
  const { data } = await supabaseServer
    .from('blog_posts')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return data || []
}

async function getPageSeoMap(): Promise<Record<string, string>> {
  const { data } = await supabaseServer
    .from('page_seo')
    .select('page_key, updated_at')

  if (!data) return {}
  const map: Record<string, string> = {}
  for (const row of data) {
    map[row.page_key] = row.updated_at
  }
  return map
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.motokuryegelsin.com'
  const currentDate = new Date().toISOString()

  const [districts, blogPosts, seoMap] = await Promise.all([
    getAllDistricts(),
    getBlogPosts(),
    getPageSeoMap(),
  ])

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: seoMap[page.page_key] || currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const districtPages: MetadataRoute.Sitemap = districts.map((district) => {
    const slug = createSlug(district.name)
    return {
      url: `${baseUrl}/ilceler/${slug}`,
      lastModified: seoMap[`ilce-${slug}`] || currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }
  })

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...districtPages, ...blogPages]
}
