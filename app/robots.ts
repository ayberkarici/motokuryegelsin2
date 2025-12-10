import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/ilceler/', '/hizmetler/', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/ilceler/', '/hizmetler/', '/blog/', '/'],
        disallow: ['/admin/', '/api/', '/_next/'],
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://www.motokuryegelsin.com/sitemap.xml',
    host: 'https://www.motokuryegelsin.com',
  }
}



