import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabaseServer } from '@/lib/supabase/server'
import { Calendar, Eye, ArrowRight } from 'lucide-react'

export const revalidate = 0 // Disable cache, always fetch fresh data
export const metadata: Metadata = {
  title: 'Blog | Moto Kurye Gelsin - Kurye ve Teslimat Rehberi',
  description: 'İstanbul kurye hizmetleri, teslimat ipuçları ve sektör haberleri. Moto kurye ile ilgili merak ettiğiniz her şey blog yazılarımızda.',
  keywords: 'kurye blog, teslimat ipuçları, istanbul kurye, moto kurye haberleri',
  openGraph: {
    title: 'Blog | Moto Kurye Gelsin',
    description: 'Kurye ve teslimat dünyasından haberler, ipuçları ve bilgiler.',
    url: 'https://motokuryegelsin.com/blog',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: 'https://motokuryegelsin.com/blog',
  },
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  published_at: string
  view_count: number
  featured: boolean
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select('id, slug, title, excerpt, published_at, view_count, featured')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const featuredPosts = posts.filter(p => p.featured).slice(0, 2)
  const regularPosts = posts.filter(p => !p.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Moto Kurye Gelsin Blog",
            "description": "İstanbul kurye hizmetleri ve teslimat rehberi",
            "url": "https://motokuryegelsin.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Moto Kurye Gelsin"
            }
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                <p className="text-xl text-blue-100">
                  Kurye hizmetleri, teslimat ipuçları ve sektör haberleri
                </p>
              </div>
            </div>
          </section>

          {featuredPosts.length > 0 && (
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 text-center">Öne Çıkan Yazılar</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {featuredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                          Öne Çıkan
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.published_at).toLocaleDateString('tr-TR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.view_count}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              {regularPosts.length === 0 && featuredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Henüz blog yazısı yayınlanmadı.</p>
                </div>
              ) : regularPosts.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-center">Tüm Yazılar</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {regularPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group bg-gray-50 rounded-xl hover:shadow-lg transition-all overflow-hidden border border-gray-200"
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.published_at).toLocaleDateString('tr-TR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.view_count}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
