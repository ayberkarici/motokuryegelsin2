import { MetadataRoute } from 'next'
import { getAllDistricts } from '@/lib/district-queries'
import { createSlug } from '@/lib/utils'
import { supabaseServer } from '@/lib/supabase/server'

// Blog yazılarını çek
async function getBlogPosts() {
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.motokuryegelsin.com'
  const currentDate = new Date().toISOString()
  
  // Get all districts for dynamic pages
  const districts = await getAllDistricts()
  
  // Get all published blog posts
  const blogPosts = await getBlogPosts()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetler/dokuman-teslimat`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetler/paket-kargo`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetler/acil-kurye`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetler/kurumsal-cozumler`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kurye-cagir`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // District pages (SEO landing pages) - Higher priority for better crawl
  const districtPages: MetadataRoute.Sitemap = districts.map((district, index) => ({
    url: `${baseUrl}/ilceler/${createSlug(district.name)}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9, // High priority for district landing pages
  }))

  // Blog posts - dynamically fetched from database
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...districtPages, ...blogPages]
}
