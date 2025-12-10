import { MetadataRoute } from 'next'
import { getAllDistricts } from '@/lib/district-queries'
import { createSlug } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.motokuryegelsin.com'
  const currentDate = new Date().toISOString()
  
  // Get all districts for dynamic pages
  const districts = await getAllDistricts()

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

  // Blog posts if any
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/istanbul-kurye-hizmeti-rehberi`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...districtPages, ...blogPages]
}
