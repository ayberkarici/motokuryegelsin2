'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { MapPin, FileText, Eye, TrendingUp } from 'lucide-react'

interface Stats {
  districts: number
  neighborhoods: number
  blogPosts: number
  totalViews: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    districts: 0,
    neighborhoods: 0,
    blogPosts: 0,
    totalViews: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch districts count
      const { count: districtsCount } = await supabase
        .from('districts')
        .select('*', { count: 'exact', head: true })

      // Fetch neighborhoods count
      const { count: neighborhoodsCount } = await supabase
        .from('neighborhoods')
        .select('*', { count: 'exact', head: true })

      // Fetch blog posts count
      const { count: blogPostsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

      // Fetch total blog views
      const { data: viewsData } = await supabase
        .from('blog_posts')
        .select('view_count')

      const totalViews = viewsData?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0

      setStats({
        districts: districtsCount || 0,
        neighborhoods: neighborhoodsCount || 0,
        blogPosts: blogPostsCount || 0,
        totalViews,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'İlçeler',
      value: stats.districts,
      icon: MapPin,
      color: 'bg-blue-600',
      description: 'Toplam ilçe sayısı',
    },
    {
      title: 'Mahalleler',
      value: stats.neighborhoods,
      icon: MapPin,
      color: 'bg-green-600',
      description: 'Toplam mahalle sayısı',
    },
    {
      title: 'Blog Yazıları',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-purple-600',
      description: 'Yayınlanmış ve taslak',
    },
    {
      title: 'Toplam Görüntülenme',
      value: stats.totalViews,
      icon: Eye,
      color: 'bg-orange-600',
      description: 'Blog görüntülenme sayısı',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Moto Kurye Gelsin yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-slate-900 border-slate-800 p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <p className="text-3xl font-bold text-white">
                  {loading ? '...' : stat.value.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/locations"
            className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors border border-slate-700"
          >
            <MapPin className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-white">İlçe & Mahalle Yönetimi</p>
              <p className="text-sm text-slate-400">Lokasyon verilerini düzenle</p>
            </div>
          </a>

          <a
            href="/admin/blog"
            className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors border border-slate-700"
          >
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium text-white">Blog Yönetimi</p>
              <p className="text-sm text-slate-400">Yazı ekle veya düzenle</p>
            </div>
          </a>

          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors border border-slate-700"
          >
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-white">Siteyi Görüntüle</p>
              <p className="text-sm text-slate-400">Ana sayfaya git</p>
            </div>
          </a>
        </div>
      </Card>
    </div>
  )
}
