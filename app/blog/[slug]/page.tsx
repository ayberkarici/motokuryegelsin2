import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabaseServer } from '@/lib/supabase/server'
import { Calendar, Eye, ArrowLeft } from 'lucide-react'
export const revalidate = 0 // Disable cache

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
  og_image: string | null
  published_at: string
  author_name: string
  view_count: number
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error

    // Increment view count
    if (data) {
      await supabaseServer
        .from('blog_posts')
        .update({ view_count: data.view_count + 1 })
        .eq('id', data.id)
    }

    return data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Yazı Bulunamadı | Moto Kurye Gelsin',
    }
  }

  return {
    title: post.meta_title || `${post.title} | Moto Kurye Gelsin Blog`,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords?.join(', ') || undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
      locale: 'tr_TR',
      images: post.og_image ? [{ url: post.og_image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.og_image ? [post.og_image] : undefined,
    },
    alternates: {
      canonical: `https://www.motokuryegelsin.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.published_at,
            "author": {
              "@type": "Person",
              "name": post.author_name
            },
            "publisher": {
              "@type": "Organization",
              "name": "Moto Kurye Gelsin"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.motokuryegelsin.com/blog/${post.slug}`
            }
          })
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-white">
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Tüm Yazılara Dön
            </Link>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {post.view_count} görüntülenme
                </span>
                <span>Yazar: {post.author_name}</span>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-3xl prose-h1:text-blue-800 prose-h1:border-b-2 prose-h1:border-blue-200 prose-h1:pb-3 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-blue-700 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-blue-600
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:text-gray-800 prose-em:font-medium
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-blue-700
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-img:rounded-lg prose-img:shadow-md
                prose-hr:my-8 prose-hr:border-gray-200
                [&_.bg-blue-50]:bg-blue-50 [&_.bg-yellow-50]:bg-yellow-50 [&_.bg-green-50]:bg-green-50
                [&_.border-blue-500]:border-blue-500 [&_.border-yellow-500]:border-yellow-500 [&_.border-green-500]:border-green-500
                [&_.border-l-4]:border-l-4 [&_.p-4]:p-4 [&_.my-4]:my-4
                [&_.bg-blue-600]:bg-blue-600 [&_.bg-green-600]:bg-green-600 [&_.text-white]:text-white
                [&_.px-6]:px-6 [&_.py-3]:py-3 [&_.rounded-lg]:rounded-lg [&_.font-bold]:font-bold
                [&_.inline-block]:inline-block [&_.mt-4]:mt-4 [&_.hover\\:bg-blue-700]:hover:bg-blue-700 [&_.hover\\:bg-green-700]:hover:bg-green-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Tüm Yazılara Dön
              </Link>
            </div>
          </article>

          <section className="bg-blue-600 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Kurye Hizmetine İhtiyacınız mı Var?</h2>
              <p className="text-xl text-blue-100 mb-6">İstanbul genelinde hızlı ve güvenli teslimat</p>
              <Link
                href="/kurye-cagir"
                className="inline-block bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
              >
                Hemen Kurye Çağır
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
