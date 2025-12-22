import Link from 'next/link'
import { supabaseServer } from '@/lib/supabase/server'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  published_at: string
}

async function getLatestBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select('id, slug, title, excerpt, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export default async function BlogSection() {
  const blogs = await getLatestBlogs()

  if (blogs.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📝 Blog Yazılarımız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kurye hizmetleri, teslimat ipuçları ve sektör haberleri
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.published_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
                <span className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Tüm Blog Yazıları
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
