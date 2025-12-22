'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Plus, 
  X, 
  Loader2, 
  Eye, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Copy,
  FileText,
  MapPin,
  Zap,
  Wand2,
  ChevronDown
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

// İstanbul İlçeleri
const ISTANBUL_DISTRICTS = [
  // Anadolu Yakası
  { name: 'Adalar', region: 'Anadolu' },
  { name: 'Ataşehir', region: 'Anadolu' },
  { name: 'Beykoz', region: 'Anadolu' },
  { name: 'Çekmeköy', region: 'Anadolu' },
  { name: 'Kadıköy', region: 'Anadolu' },
  { name: 'Kartal', region: 'Anadolu' },
  { name: 'Maltepe', region: 'Anadolu' },
  { name: 'Pendik', region: 'Anadolu' },
  { name: 'Sancaktepe', region: 'Anadolu' },
  { name: 'Sultanbeyli', region: 'Anadolu' },
  { name: 'Şile', region: 'Anadolu' },
  { name: 'Tuzla', region: 'Anadolu' },
  { name: 'Ümraniye', region: 'Anadolu' },
  { name: 'Üsküdar', region: 'Anadolu' },
  // Avrupa Yakası
  { name: 'Arnavutköy', region: 'Avrupa' },
  { name: 'Avcılar', region: 'Avrupa' },
  { name: 'Bağcılar', region: 'Avrupa' },
  { name: 'Bahçelievler', region: 'Avrupa' },
  { name: 'Bakırköy', region: 'Avrupa' },
  { name: 'Başakşehir', region: 'Avrupa' },
  { name: 'Bayrampaşa', region: 'Avrupa' },
  { name: 'Beşiktaş', region: 'Avrupa' },
  { name: 'Beylikdüzü', region: 'Avrupa' },
  { name: 'Beyoğlu', region: 'Avrupa' },
  { name: 'Büyükçekmece', region: 'Avrupa' },
  { name: 'Çatalca', region: 'Avrupa' },
  { name: 'Esenler', region: 'Avrupa' },
  { name: 'Esenyurt', region: 'Avrupa' },
  { name: 'Eyüpsultan', region: 'Avrupa' },
  { name: 'Fatih', region: 'Avrupa' },
  { name: 'Gaziosmanpaşa', region: 'Avrupa' },
  { name: 'Güngören', region: 'Avrupa' },
  { name: 'Kağıthane', region: 'Avrupa' },
  { name: 'Küçükçekmece', region: 'Avrupa' },
  { name: 'Sarıyer', region: 'Avrupa' },
  { name: 'Silivri', region: 'Avrupa' },
  { name: 'Sultangazi', region: 'Avrupa' },
  { name: 'Şişli', region: 'Avrupa' },
  { name: 'Zeytinburnu', region: 'Avrupa' },
]

// Blog Konu Şablonları
const BLOG_TEMPLATES = [
  {
    id: 'district-general',
    name: '🏍️ İlçe Kurye Hizmeti',
    description: 'Seçilen ilçe için genel kurye tanıtımı',
    generateKeywords: (district: string) => [
      `${district} kurye`,
      `${district} moto kurye`,
      `${district} hızlı teslimat`,
      `${district} motorlu kurye`,
      `${district} acil kurye`,
      'aynı gün teslimat'
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde moto kurye hizmeti hakkında detaylı bir blog yazısı. İlçenin özelliklerini, teslimat avantajlarını ve hizmet kapsamını anlat.`
  },
  {
    id: 'express-delivery',
    name: '⚡ Acil Teslimat',
    description: 'Acil ve express kurye hizmeti odaklı',
    generateKeywords: (district: string) => [
      `${district} acil kurye`,
      `${district} express teslimat`,
      `${district} hızlı kurye`,
      '1 saat teslimat',
      'aynı gün kurye',
      `${district} motorlu kurye`
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde acil kurye ve express teslimat hizmeti. VIP teslimat, 1 saat içinde teslimat garantisi ve hızlı çözümler hakkında yazı.`
  },
  {
    id: 'document-delivery',
    name: '📄 Döküman Teslimatı',
    description: 'Evrak ve belge teslimatı odaklı',
    generateKeywords: (district: string) => [
      `${district} evrak kurye`,
      `${district} döküman teslimat`,
      `${district} belge kurye`,
      'sözleşme teslimatı',
      'resmi evrak kurye',
      `${district} noter kurye`
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde döküman ve evrak teslimat hizmeti. Yasal belgeler, sözleşmeler, faturalar ve resmi evrakların güvenli teslimatı hakkında yazı.`
  },
  {
    id: 'package-delivery',
    name: '📦 Paket Teslimat',
    description: 'Paket ve kargo teslimatı odaklı',
    generateKeywords: (district: string) => [
      `${district} paket kurye`,
      `${district} kargo teslimat`,
      `${district} paket teslimat`,
      'küçük paket kurye',
      'e-ticaret teslimat',
      `${district} hızlı kargo`
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde paket ve kargo teslimat hizmeti. E-ticaret paketleri, hediye gönderimi ve özel paketlerin teslimatı hakkında yazı.`
  },
  {
    id: 'corporate',
    name: '🏢 Kurumsal Hizmet',
    description: 'Şirketler için kurye çözümleri',
    generateKeywords: (district: string) => [
      `${district} kurumsal kurye`,
      `${district} şirket kurye`,
      `${district} iş kurye`,
      'aylık kurye anlaşması',
      'toplu teslimat',
      `${district} filo kurye`
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde kurumsal kurye hizmeti. Şirketler için özel anlaşmalar, aylık kontratlar ve toplu teslimat çözümleri hakkında yazı.`
  },
  {
    id: 'night-delivery',
    name: '🌙 Gece Teslimat',
    description: 'Gece ve hafta sonu teslimat hizmeti',
    generateKeywords: (district: string) => [
      `${district} gece kurye`,
      `${district} 7/24 kurye`,
      `${district} hafta sonu kurye`,
      'gece teslimat',
      'acil gece kurye',
      `${district} geç saatte kurye`
    ],
    generateContext: (district: string) => 
      `${district} ilçesinde gece ve hafta sonu kurye hizmeti. 7/24 teslimat, geç saatlerde acil kurye ve esnek çalışma saatleri hakkında yazı.`
  }
]

interface GeneratedBlog {
  title: string
  slug: string
  excerpt: string
  content: string
  meta_title: string
  meta_description: string
  meta_keywords: string[]
}

export default function AIBlogGeneratorPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [currentKeyword, setCurrentKeyword] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlog | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)
  const [districtSearch, setDistrictSearch] = useState('')

  // İlçe veya şablon değiştiğinde otomatik doldur
  useEffect(() => {
    if (selectedDistrict && selectedTemplate) {
      const template = BLOG_TEMPLATES.find(t => t.id === selectedTemplate)
      if (template) {
        setKeywords(template.generateKeywords(selectedDistrict))
        setAdditionalContext(template.generateContext(selectedDistrict))
      }
    }
  }, [selectedDistrict, selectedTemplate])

  const filteredDistricts = ISTANBUL_DISTRICTS.filter(d => 
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  )

  const addKeyword = () => {
    const trimmed = currentKeyword.trim()
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 10) {
      setKeywords([...keywords, trimmed])
      setCurrentKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKeyword()
    }
  }

  const clearAll = () => {
    setSelectedDistrict('')
    setSelectedTemplate('')
    setKeywords([])
    setAdditionalContext('')
    setGeneratedBlog(null)
    setError(null)
  }

  const generateBlog = async () => {
    if (keywords.length < 2) {
      setError('En az 2 anahtar kelime gerekli.')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedBlog(null)
    setSaveSuccess(false)

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords,
          additionalContext: additionalContext || undefined,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Blog oluşturulamadı')
      }

      if (result.success && result.data) {
        setGeneratedBlog(result.data)
        setShowPreview(true)
      } else {
        throw new Error('Beklenmeyen yanıt formatı')
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const saveBlog = async (status: 'draft' | 'published') => {
    if (!generatedBlog) return

    setSaving(true)
    setError(null)

    try {
      const { data, error: supabaseError } = await supabase
        .from('blog_posts')
        .insert({
          title: generatedBlog.title,
          slug: generatedBlog.slug,
          excerpt: generatedBlog.excerpt,
          content: generatedBlog.content,
          meta_title: generatedBlog.meta_title,
          meta_description: generatedBlog.meta_description,
          meta_keywords: generatedBlog.meta_keywords,
          status,
          published_at: status === 'published' ? new Date().toISOString() : null,
          author_name: 'Elif Yılmaz',
        })
        .select()
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      setSaveSuccess(true)
      setTimeout(() => {
        clearAll()
        setSaveSuccess(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Kaydetme başarısız')
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const countWords = (html: string) => {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return text.split(' ').filter(w => w.length > 0).length
  }

  // Tek tıkla blog oluştur (ilçe + şablon seçiliyse)
  const quickGenerate = async (district: string, templateId: string) => {
    const template = BLOG_TEMPLATES.find(t => t.id === templateId)
    if (!template) return

    setSelectedDistrict(district)
    setSelectedTemplate(templateId)
    
    const newKeywords = template.generateKeywords(district)
    const newContext = template.generateContext(district)
    
    setKeywords(newKeywords)
    setAdditionalContext(newContext)
    
    // Kısa bir gecikme sonrası otomatik oluştur
    setTimeout(async () => {
      setLoading(true)
      setError(null)
      setGeneratedBlog(null)

      try {
        const response = await fetch('/api/generate-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keywords: newKeywords,
            additionalContext: newContext,
          }),
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Blog oluşturulamadı')
        
        if (result.success && result.data) {
          setGeneratedBlog(result.data)
          setShowPreview(true)
        }
      } catch (err: any) {
        setError(err.message || 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-600" />
            AI Blog Oluşturucu
          </h1>
          <p className="text-gray-500 mt-1">
            İlçe seçin, şablon belirleyin, tek tıkla blog oluşturun
          </p>
        </div>
        {(selectedDistrict || keywords.length > 0) && (
          <Button variant="outline" onClick={clearAll}>
            <X className="h-4 w-4 mr-2" />
            Temizle
          </Button>
        )}
      </div>

      {/* Quick Select Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* İlçe Seçimi */}
        <Card className="border-2 border-dashed hover:border-blue-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              1. İlçe Seçin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between h-12 text-left"
                onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              >
                {selectedDistrict ? (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {selectedDistrict}
                    <Badge variant="secondary" className="ml-2">
                      {ISTANBUL_DISTRICTS.find(d => d.name === selectedDistrict)?.region}
                    </Badge>
                  </span>
                ) : (
                  <span className="text-gray-400">İlçe seçin...</span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showDistrictDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-hidden">
                  <div className="p-2 border-b">
                    <Input
                      placeholder="İlçe ara..."
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {['Anadolu', 'Avrupa'].map(region => (
                      <div key={region}>
                        <div className="px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-500">
                          {region} Yakası
                        </div>
                        {filteredDistricts
                          .filter(d => d.region === region)
                          .map(district => (
                            <button
                              key={district.name}
                              className={`w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center gap-2 ${
                                selectedDistrict === district.name ? 'bg-blue-100' : ''
                              }`}
                              onClick={() => {
                                setSelectedDistrict(district.name)
                                setShowDistrictDropdown(false)
                                setDistrictSearch('')
                              }}
                            >
                              <MapPin className="h-3 w-3 text-gray-400" />
                              {district.name}
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Şablon Seçimi */}
        <Card className="border-2 border-dashed hover:border-purple-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              2. Konu Şablonu Seçin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {BLOG_TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedTemplate === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tek Tıkla Oluştur Butonu */}
      {selectedDistrict && selectedTemplate && !generatedBlog && (
        <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">🚀 Hazır!</h3>
                <p className="text-purple-100">
                  {selectedDistrict} için {BLOG_TEMPLATES.find(t => t.id === selectedTemplate)?.name} blog yazısı oluşturulacak
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={() => quickGenerate(selectedDistrict, selectedTemplate)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Tek Tıkla Oluştur
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Blog Parametreleri
              {selectedDistrict && selectedTemplate && (
                <Badge className="ml-2 bg-green-100 text-green-700">Otomatik Dolduruldu</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Parametreleri düzenleyebilir veya manuel ekleyebilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seçim Özeti */}
            {(selectedDistrict || selectedTemplate) && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                {selectedDistrict && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedDistrict}
                    <button onClick={() => setSelectedDistrict('')} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedTemplate && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {BLOG_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                    <button onClick={() => setSelectedTemplate('')} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Keywords Input */}
            <div className="space-y-3">
              <Label htmlFor="keyword">Anahtar Kelimeler ({keywords.length}/10)</Label>
              <div className="flex gap-2">
                <Input
                  id="keyword"
                  placeholder="Anahtar kelime ekle..."
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={keywords.length >= 10}
                />
                <Button 
                  onClick={addKeyword} 
                  disabled={!currentKeyword.trim() || keywords.length >= 10}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Keywords Tags */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-2"
                    >
                      {keyword}
                      <button 
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Context */}
            <div className="space-y-2">
              <Label htmlFor="context">Ek Bağlam / Yönergeler</Label>
              <Textarea
                id="context"
                placeholder="Blog konusu hakkında ek bilgiler..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Blog başarıyla kaydedildi!
              </div>
            )}

            {/* Generate Button */}
            <Button 
              onClick={generateBlog}
              disabled={keywords.length < 2 || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Blog Oluşturuluyor...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Blog Oluştur
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className={!generatedBlog ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Önizleme
              </span>
              {generatedBlog && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateBlog}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                    Yenile
                  </Button>
                </div>
              )}
            </CardTitle>
            {generatedBlog && (
              <CardDescription>
                Kelime sayısı: <strong className="text-green-600">{countWords(generatedBlog.content)}</strong>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!generatedBlog ? (
              <div className="text-center py-12 text-gray-400">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>İlçe ve şablon seçerek başlayın</p>
                <p className="text-sm mt-2">veya manuel anahtar kelimeler girin</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Meta Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-500">Başlık</Label>
                      <button onClick={() => copyToClipboard(generatedBlog.title)}>
                        <Copy className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                    <p className="font-medium">{generatedBlog.title}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-500">URL Slug</Label>
                      <button onClick={() => copyToClipboard(generatedBlog.slug)}>
                        <Copy className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                    <p className="text-sm text-blue-600">/blog/{generatedBlog.slug}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Meta Açıklama</Label>
                    <p className="text-sm">{generatedBlog.meta_description}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Anahtar Kelimeler</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generatedBlog.meta_keywords.map((kw, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="border rounded-lg">
                  <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">İçerik Önizleme</span>
                    <button 
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {showPreview ? 'HTML Göster' : 'Önizle'}
                    </button>
                  </div>
                  <div className="p-4 max-h-[500px] overflow-y-auto">
                    {showPreview ? (
                      <div 
                        className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:font-bold prose-h1:text-blue-800 prose-h1:border-b-2 prose-h1:border-blue-200 prose-h1:pb-2 prose-h2:text-xl prose-h2:font-semibold prose-h2:text-blue-700 prose-h2:mt-6 prose-h3:text-lg prose-h3:font-medium prose-h3:text-blue-600 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-4 prose-li:text-gray-700 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-hr:my-6"
                        dangerouslySetInnerHTML={{ __html: generatedBlog.content }}
                      />
                    ) : (
                      <pre className="text-xs whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded overflow-x-auto">
                        {generatedBlog.content}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Excerpt */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <Label className="text-xs text-blue-600">Özet (Excerpt)</Label>
                  <p className="text-sm mt-1">{generatedBlog.excerpt}</p>
                </div>

                {/* Save Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => saveBlog('draft')}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Taslak Kaydet
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => saveBlog('published')}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Yayınla
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Popüler İlçeler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">⚡ Hızlı Blog Oluştur</CardTitle>
          <CardDescription>
            Popüler ilçeler için tek tıkla blog oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['Kadıköy', 'Beşiktaş', 'Şişli', 'Ümraniye', 'Ataşehir', 'Bakırköy', 'Fatih', 'Üsküdar', 'Maltepe', 'Kartal', 'Beyoğlu', 'Sarıyer'].map(district => (
              <Button
                key={district}
                variant="outline"
                className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => {
                  setSelectedDistrict(district)
                  setSelectedTemplate('district-general')
                }}
                disabled={loading}
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{district}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
