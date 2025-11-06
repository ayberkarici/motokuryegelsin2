'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, FileText, Eye, TrendingUp, Package, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
      const { count: districtsCount } = await supabase
        .from('districts')
        .select('*', { count: 'exact', head: true })

      const { count: neighborhoodsCount } = await supabase
        .from('neighborhoods')
        .select('*', { count: 'exact', head: true })

      const { count: blogPostsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam İlçe</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.districts}
            </div>
            <p className="text-xs text-muted-foreground">
              İstanbul geneli
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Mahalle</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.neighborhoods}
            </div>
            <p className="text-xs text-muted-foreground">
              Aktif bölgeler
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.blogPosts}
            </div>
            <p className="text-xs text-muted-foreground">
              Toplam içerik
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Görüntülenme</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Blog görüntüleme
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Lokasyon Yönetimi
            </CardTitle>
            <CardDescription>
              İlçe ve mahalle verilerini düzenle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/locations">
              <Button className="w-full">
                Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Blog Yönetimi
            </CardTitle>
            <CardDescription>
              Blog yazıları ekle veya düzenle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/blog">
              <Button className="w-full">
                Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Siteyi Görüntüle
            </CardTitle>
            <CardDescription>
              Ana sayfaya git ve kontrol et
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" target="_blank">
              <Button variant="outline" className="w-full">
                Görüntüle
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Son Aktiviteler
          </CardTitle>
          <CardDescription>
            Sistemdeki son değişiklikler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Sistem aktif</p>
                <p className="text-muted-foreground">Tüm servisler çalışıyor</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Dashboard yenilendi</p>
                <p className="text-muted-foreground">Modern tasarım uygulandı</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
