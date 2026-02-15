'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { STATIC_PAGES } from '@/lib/sitemap-pages'
import { createSlug } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle,
  AlertCircle,
  Search,
  Globe,
  MapPin,
  FileText,
  RefreshCw,
} from 'lucide-react'

interface PageSeo {
  id: string
  page_key: string
  page_label: string
  page_path: string
  title: string
  description: string
  keywords: string
  updated_at: string
}

interface BlogMeta {
  id: string
  slug: string
  title: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
}

interface EditState {
  title: string
  description: string
  keywords: string
}

function GooglePreview({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `motokuryegelsin.com${path}`
  const displayTitle = title || 'Sayfa Basligi'
  const displayDesc = description || 'Sayfa aciklamasi burada gorunecek...'

  return (
    <div className="bg-white border rounded-lg p-4 font-sans max-w-xl">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
          <Search className="w-3 h-3 text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">{url}</span>
      </div>
      <div
        className="text-[#1a0dab] text-lg font-medium leading-snug truncate hover:underline cursor-pointer"
      >
        {displayTitle.length > 60 ? displayTitle.slice(0, 60) + '...' : displayTitle}
      </div>
      <div
        className="text-sm text-gray-600 mt-1 leading-relaxed"
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {displayDesc.length > 160 ? displayDesc.slice(0, 160) + '...' : displayDesc}
      </div>
    </div>
  )
}

function CharCount({ value, max, warn }: { value: string; max: number; warn: number }) {
  const len = value.length
  const color = len > max ? 'text-red-500' : len > warn ? 'text-yellow-500' : 'text-gray-400'
  return <span className={`text-xs ${color}`}>{len}/{max}</span>
}

function SeoCard({
  id,
  label,
  path,
  initialTitle,
  initialDesc,
  initialKeywords,
  onSave,
}: {
  id: string
  label: string
  path: string
  initialTitle: string
  initialDesc: string
  initialKeywords: string
  onSave: (id: string, edit: EditState) => Promise<boolean>
}) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<EditState>({
    title: initialTitle,
    description: initialDesc,
    keywords: initialKeywords,
  })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const isDirty =
    edit.title !== initialTitle ||
    edit.description !== initialDesc ||
    edit.keywords !== initialKeywords

  const handleSave = async () => {
    setSaving(true)
    setStatus('idle')
    const ok = await onSave(id, edit)
    setSaving(false)
    setStatus(ok ? 'success' : 'error')
    if (ok) setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-accent transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-medium truncate">{label}</span>
          <span className="text-sm text-muted-foreground font-mono shrink-0">{path}</span>
          {isDirty && <Badge variant="secondary" className="shrink-0">Degisiklik</Badge>}
        </div>
        {open ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 border-t bg-background space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Baslik (title)</Label>
              <CharCount value={edit.title} max={70} warn={55} />
            </div>
            <Input
              value={edit.title}
              onChange={(e) => setEdit({ ...edit, title: e.target.value })}
              placeholder="Sayfa basligi..."
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Aciklama (meta description)</Label>
              <CharCount value={edit.description} max={170} warn={150} />
            </div>
            <Textarea
              value={edit.description}
              onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              placeholder="Sayfa aciklamasi..."
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Anahtar kelimeler</Label>
            <Input
              value={edit.keywords}
              onChange={(e) => setEdit({ ...edit, keywords: e.target.value })}
              placeholder="kurye, istanbul kurye..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wide">Google Onizleme</Label>
            <GooglePreview title={edit.title} description={edit.description} path={path} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-sm">
              {status === 'success' && (
                <span className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Kaydedildi
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1.5 text-destructive">
                  <AlertCircle className="h-4 w-4" /> Kaydedilemedi
                </span>
              )}
            </div>
            <Button onClick={handleSave} disabled={saving || !isDirty} size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SeoPage() {
  const [pages, setPages] = useState<PageSeo[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const [seoRes, distRes, blogRes] = await Promise.all([
      supabase.from('page_seo').select('*').order('page_label'),
      supabase.from('districts').select('name').order('name'),
      supabase
        .from('blog_posts')
        .select('id, slug, title, meta_title, meta_description, meta_keywords')
        .eq('status', 'published')
        .order('title'),
    ])

    if (seoRes.error) {
      setError('page_seo tablosu yuklenemedi: ' + seoRes.error.message)
      setLoading(false)
      return
    }

    const existingRows = (seoRes.data || []) as PageSeo[]
    const districts = (distRes.data || []) as { name: string }[]
    setBlogPosts((blogRes.data || []) as BlogMeta[])

    const existingKeys = new Set(existingRows.map((r) => r.page_key))
    const missingRows: Omit<PageSeo, 'id' | 'updated_at'>[] = []

    for (const page of STATIC_PAGES) {
      if (!existingKeys.has(page.page_key)) {
        missingRows.push({
          page_key: page.page_key,
          page_label: page.label,
          page_path: page.path,
          title: page.defaults.title,
          description: page.defaults.description,
          keywords: page.defaults.keywords,
        })
      }
    }

    for (const district of districts) {
      const slug = createSlug(district.name)
      const key = `ilce-${slug}`
      if (!existingKeys.has(key)) {
        missingRows.push({
          page_key: key,
          page_label: `${district.name} (Ilce)`,
          page_path: `/ilceler/${slug}`,
          title: `${district.name} Moto Kurye | Hizli Teslimat | MotoKuryeGelsin`,
          description: `${district.name} ilcesinde profesyonel moto kurye hizmeti. Hizli teslimat. Evrak, paket ve acil kurye. Hemen kurye cagir!`,
          keywords: `${district.name} kurye, ${district.name} moto kurye, ${district.name} motorlu kurye, hizli teslimat ${district.name}`,
        })
      }
    }

    if (missingRows.length > 0) {
      setSyncing(true)
      const { data: inserted } = await supabase
        .from('page_seo')
        .insert(missingRows)
        .select()

      setSyncing(false)
      if (inserted) {
        setPages([...existingRows, ...(inserted as PageSeo[])].sort((a, b) =>
          a.page_label.localeCompare(b.page_label, 'tr')
        ))
        setLoading(false)
        return
      }
    }

    setPages(existingRows)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSavePage = async (id: string, edit: EditState): Promise<boolean> => {
    const { data, error } = await supabase
      .from('page_seo')
      .update({
        title: edit.title,
        description: edit.description,
        keywords: edit.keywords,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) return false
    setPages((prev) => prev.map((p) => (p.id === id ? (data as PageSeo) : p)))
    return true
  }

  const handleSaveBlog = async (id: string, edit: EditState): Promise<boolean> => {
    const kw = edit.keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)

    const { error } = await supabase
      .from('blog_posts')
      .update({
        meta_title: edit.title,
        meta_description: edit.description,
        meta_keywords: kw,
      })
      .eq('id', id)

    if (error) return false
    setBlogPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, meta_title: edit.title, meta_description: edit.description, meta_keywords: kw }
          : p
      )
    )
    return true
  }

  const staticKeys = new Set(STATIC_PAGES.map((p) => p.page_key))
  const staticSeoPages = pages.filter((p) => staticKeys.has(p.page_key))
  const districtSeoPages = pages.filter((p) => p.page_key.startsWith('ilce-'))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SEO Yonetimi</h1>
          <p className="text-muted-foreground mt-1">
            Tum sayfalarin Google&apos;da gorunen baslik ve aciklamalarini duzenleyin.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadData} disabled={loading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Yenile
        </Button>
      </div>

      {error && (
        <div className="text-destructive text-sm border border-destructive/30 rounded-lg p-4">{error}</div>
      )}

      {syncing && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Yeni sayfalar senkronize ediliyor...
        </div>
      )}

      {loading && !syncing && (
        <div className="text-muted-foreground text-sm">Yukleniyor...</div>
      )}

      {!loading && (
        <>
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Statik Sayfalar</h2>
              <Badge variant="secondary">{staticSeoPages.length}</Badge>
            </div>
            {staticSeoPages.map((page) => (
              <SeoCard
                key={page.id}
                id={page.id}
                label={page.page_label}
                path={page.page_path}
                initialTitle={page.title}
                initialDesc={page.description}
                initialKeywords={page.keywords}
                onSave={handleSavePage}
              />
            ))}
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">Ilce Sayfalari</h2>
              <Badge variant="secondary">{districtSeoPages.length}</Badge>
            </div>
            {districtSeoPages.map((page) => (
              <SeoCard
                key={page.id}
                id={page.id}
                label={page.page_label}
                path={page.page_path}
                initialTitle={page.title}
                initialDesc={page.description}
                initialKeywords={page.keywords}
                onSave={handleSavePage}
              />
            ))}
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Blog Yazilari</h2>
              <Badge variant="secondary">{blogPosts.length}</Badge>
            </div>
            {blogPosts.map((post) => (
              <SeoCard
                key={post.id}
                id={post.id}
                label={post.title}
                path={`/blog/${post.slug}`}
                initialTitle={post.meta_title || post.title}
                initialDesc={post.meta_description || ''}
                initialKeywords={(post.meta_keywords || []).join(', ')}
                onSave={handleSaveBlog}
              />
            ))}
            {blogPosts.length === 0 && (
              <p className="text-sm text-muted-foreground px-2">Yayinlanmis blog yazisi yok.</p>
            )}
          </section>
        </>
      )}
    </div>
  )
}
