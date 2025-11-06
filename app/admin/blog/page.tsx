'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, Eye, Search, Save } from 'lucide-react'
import RichTextEditor from '@/components/admin/rich-text-editor'
import ImageUpload from '@/components/admin/image-upload'

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
  status: 'draft' | 'published'
  published_at: string | null
  author_name: string
  created_at: string
  view_count: number
  featured: boolean
}

interface FormData {
  title: string
  slug: string
  excerpt: string
  content: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  og_image: string
  status: 'draft' | 'published'
  featured: boolean
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_image: '',
    status: 'draft',
    featured: false,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        setError(error.message)
        throw error
      }
      setPosts(data || [])
      setError(null)
    } catch (error: any) {
      console.error('Error fetching posts:', error)
      setError(error.message || 'Bilinmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : generateSlug(title),
      meta_title: prev.meta_title || title,
    }))
  }

  const openDialog = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id)
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        meta_keywords: post.meta_keywords?.join(', ') || '',
        og_image: post.og_image || '',
        status: post.status,
        featured: post.featured,
      })
    } else {
      setEditingId(null)
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_image: '',
        status: 'draft',
        featured: false,
      })
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : null,
        og_image: formData.og_image || null,
        status: formData.status,
        featured: formData.featured,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
      }

      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData])

        if (error) throw error
      }

      setShowDialog(false)
      fetchPosts()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchPosts()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Yönetimi</h1>
          <p className="text-muted-foreground">Blog yazılarını yönetin</p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Yazı
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Yazı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-destructive font-medium">Hata: {error}</p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Muhtemelen <code className="bg-muted px-1 rounded">blog_posts</code> tablosu henüz oluşturulmadı.
                  Lütfen Supabase SQL Editor'da <code className="bg-muted px-1 rounded">scripts/create-blog-tables.sql</code> dosyasındaki SQL kodunu çalıştırın.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Yazıları ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Yükleniyor...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              {search ? 'Arama sonucu bulunamadı' : 'Henüz blog yazısı yok. Yeni bir yazı ekleyin.'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Görüntülenme</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">/{post.slug}</div>
                        {post.featured && (
                          <Badge className="mt-1 bg-yellow-600">Öne Çıkan</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status === 'published' ? 'Yayında' : 'Taslak'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          {post.view_count}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDialog(post)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingId ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Blog yazısı başlığı"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Özet *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                placeholder="Kısa açıklama (liste sayfasında görünür)"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label>İçerik *</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>

            {/* OG Image */}
            <div className="space-y-2">
              <Label>Open Graph Görseli</Label>
              <p className="text-sm text-muted-foreground">Sosyal medyada paylaşıldığında görünecek görsel</p>
              <ImageUpload
                value={formData.og_image}
                onChange={(url) => setFormData({ ...formData, og_image: url })}
                onRemove={() => setFormData({ ...formData, og_image: '' })}
              />
            </div>

            {/* SEO Fields */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">SEO Ayarları</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Başlık</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="SEO başlığı (boş bırakılırsa yazı başlığı kullanılır)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Açıklama</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={3}
                    placeholder="Arama motorlarında görünecek açıklama"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Anahtar Kelimeler</Label>
                  <Input
                    id="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    placeholder="kurye, istanbul, teslimat (virgülle ayırın)"
                  />
                </div>
              </div>
            </div>

            {/* Status & Featured */}
            <div className="border-t pt-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label>Öne Çıkan</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="status">Durum:</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    className="border rounded-md px-3 py-1.5 text-sm"
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayınla</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Güncelle' : 'Kaydet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
