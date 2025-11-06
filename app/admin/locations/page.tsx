'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { District, Neighborhood } from '@/lib/supabase'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

interface NeighborhoodInput {
  name: string
  center_lng: string
  center_lat: string
}

export default function LocationsPage() {
  const [districts, setDistricts] = useState<District[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<Neighborhood[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog states
  const [districtDialog, setDistrictDialog] = useState(false)
  const [neighborhoodDialog, setNeighborhoodDialog] = useState(false)
  const [bulkNeighborhoodDialog, setBulkNeighborhoodDialog] = useState(false)
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null)
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null)

  // Form states
  const [districtForm, setDistrictForm] = useState({ name: '', center_lng: '', center_lat: '' })
  const [neighborhoodForm, setNeighborhoodForm] = useState({ name: '', district_id: '', center_lng: '', center_lat: '' })
  
  // Bulk neighborhood form
  const [bulkDistrictId, setBulkDistrictId] = useState('')
  const [bulkNeighborhoods, setBulkNeighborhoods] = useState<NeighborhoodInput[]>([
    { name: '', center_lng: '', center_lat: '' }
  ])

  // Search
  const [districtSearch, setDistrictSearch] = useState('')
  const [neighborhoodSearch, setNeighborhoodSearch] = useState('')
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('all')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterNeighborhoods()
  }, [neighborhoods, neighborhoodSearch, selectedDistrictFilter])

  const fetchData = async () => {
    try {
      const [{ data: districtsData }, { data: neighborhoodsData }] = await Promise.all([
        supabase.from('districts').select('*').order('name'),
        supabase.from('neighborhoods').select('*').order('name'),
      ])

      setDistricts(districtsData || [])
      setNeighborhoods(neighborhoodsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterNeighborhoods = () => {
    let filtered = neighborhoods

    if (selectedDistrictFilter !== 'all') {
      filtered = filtered.filter(n => n.district_id === selectedDistrictFilter)
    }

    if (neighborhoodSearch) {
      filtered = filtered.filter(n =>
        n.name.toLowerCase().includes(neighborhoodSearch.toLowerCase())
      )
    }

    setFilteredNeighborhoods(filtered)
  }

  // District CRUD
  const openDistrictDialog = (district?: District) => {
    if (district) {
      setEditingDistrict(district)
      setDistrictForm({
        name: district.name,
        center_lng: district.center_lng.toString(),
        center_lat: district.center_lat.toString(),
      })
    } else {
      setEditingDistrict(null)
      setDistrictForm({ name: '', center_lng: '', center_lat: '' })
    }
    setDistrictDialog(true)
  }

  const handleSaveDistrict = async () => {
    try {
      const data = {
        name: districtForm.name,
        center_lng: parseFloat(districtForm.center_lng),
        center_lat: parseFloat(districtForm.center_lat),
      }

      if (editingDistrict) {
        await supabase.from('districts').update(data).eq('id', editingDistrict.id)
      } else {
        await supabase.from('districts').insert([data])
      }

      setDistrictDialog(false)
      fetchData()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  const handleDeleteDistrict = async (id: string) => {
    if (!confirm('Bu ilçeyi silmek istediğinizden emin misiniz? İlgili tüm mahalleler de silinecektir!')) return

    try {
      await supabase.from('districts').delete().eq('id', id)
      fetchData()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  // Neighborhood CRUD
  const openNeighborhoodDialog = (neighborhood?: Neighborhood) => {
    if (neighborhood) {
      setEditingNeighborhood(neighborhood)
      setNeighborhoodForm({
        name: neighborhood.name,
        district_id: neighborhood.district_id,
        center_lng: neighborhood.center_lng.toString(),
        center_lat: neighborhood.center_lat.toString(),
      })
    } else {
      setEditingNeighborhood(null)
      setNeighborhoodForm({ name: '', district_id: '', center_lng: '', center_lat: '' })
    }
    setNeighborhoodDialog(true)
  }

  const handleSaveNeighborhood = async () => {
    try {
      const data = {
        name: neighborhoodForm.name,
        district_id: neighborhoodForm.district_id,
        center_lng: parseFloat(neighborhoodForm.center_lng),
        center_lat: parseFloat(neighborhoodForm.center_lat),
      }

      if (editingNeighborhood) {
        await supabase.from('neighborhoods').update(data).eq('id', editingNeighborhood.id)
      } else {
        await supabase.from('neighborhoods').insert([data])
      }

      setNeighborhoodDialog(false)
      fetchData()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  const handleDeleteNeighborhood = async (id: string) => {
    if (!confirm('Bu mahalleyi silmek istediğinizden emin misiniz?')) return

    try {
      await supabase.from('neighborhoods').delete().eq('id', id)
      fetchData()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  // Bulk neighborhood functions
  const openBulkNeighborhoodDialog = () => {
    setBulkDistrictId('')
    setBulkNeighborhoods([{ name: '', center_lng: '', center_lat: '' }])
    setBulkNeighborhoodDialog(true)
  }

  const addBulkNeighborhoodRow = () => {
    setBulkNeighborhoods([...bulkNeighborhoods, { name: '', center_lng: '', center_lat: '' }])
  }

  const removeBulkNeighborhoodRow = (index: number) => {
    if (bulkNeighborhoods.length > 1) {
      setBulkNeighborhoods(bulkNeighborhoods.filter((_, i) => i !== index))
    }
  }

  const updateBulkNeighborhood = (index: number, field: keyof NeighborhoodInput, value: string) => {
    const updated = [...bulkNeighborhoods]
    updated[index][field] = value
    setBulkNeighborhoods(updated)
  }

  const handleSaveBulkNeighborhoods = async () => {
    if (!bulkDistrictId) {
      alert('Lütfen bir ilçe seçin')
      return
    }

    const validNeighborhoods = bulkNeighborhoods.filter(n => n.name.trim() !== '')
    
    if (validNeighborhoods.length === 0) {
      alert('En az bir mahalle adı girmelisiniz')
      return
    }

    try {
      const data = validNeighborhoods.map(n => ({
        name: n.name.trim(),
        district_id: bulkDistrictId,
        center_lng: n.center_lng ? parseFloat(n.center_lng) : 0,
        center_lat: n.center_lat ? parseFloat(n.center_lat) : 0,
      }))

      await supabase.from('neighborhoods').insert(data)
      setBulkNeighborhoodDialog(false)
      fetchData()
    } catch (error: any) {
      alert('Hata: ' + error.message)
    }
  }

  const getDistrictName = (districtId: string) => {
    return districts.find(d => d.id === districtId)?.name || 'Bilinmiyor'
  }

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  )

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lokasyon Yönetimi</h1>
        <p className="text-muted-foreground">
          İlçe ve mahalle verilerini yönetin
        </p>
      </div>

      <Tabs defaultValue="districts" className="w-full">
        <TabsList>
          <TabsTrigger value="districts">
            İlçeler ({districts.length})
          </TabsTrigger>
          <TabsTrigger value="neighborhoods">
            Mahalleler ({neighborhoods.length})
          </TabsTrigger>
        </TabsList>

        {/* Districts Tab */}
        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>İlçeler</CardTitle>
                  <CardDescription>Tüm ilçeleri görüntüle ve yönet</CardDescription>
                </div>
                <Button onClick={() => openDistrictDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni İlçe
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="İlçe ara..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İlçe Adı</TableHead>
                      <TableHead>Mahalle Sayısı</TableHead>
                      <TableHead>Koordinat (Lng, Lat)</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDistricts.map((district) => (
                      <TableRow key={district.id}>
                        <TableCell className="font-medium">{district.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {neighborhoods.filter(n => n.district_id === district.id).length} mahalle
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {district.center_lng.toFixed(4)}, {district.center_lat.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDistrictDialog(district)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDistrict(district.id)}
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Neighborhoods Tab */}
        <TabsContent value="neighborhoods" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mahalleler</CardTitle>
                  <CardDescription>Tüm mahalleleri görüntüle ve yönet</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => openBulkNeighborhoodDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Toplu Ekle
                  </Button>
                  <Button onClick={() => openNeighborhoodDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Mahalle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Mahalle ara..."
                    value={neighborhoodSearch}
                    onChange={(e) => setNeighborhoodSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedDistrictFilter} onValueChange={setSelectedDistrictFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="İlçe filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm İlçeler</SelectItem>
                    {districts.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mahalle Adı</TableHead>
                      <TableHead>İlçe</TableHead>
                      <TableHead>Koordinat (Lng, Lat)</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNeighborhoods.map((neighborhood) => (
                      <TableRow key={neighborhood.id}>
                        <TableCell className="font-medium">{neighborhood.name}</TableCell>
                        <TableCell>
                          <Badge>{getDistrictName(neighborhood.district_id)}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {neighborhood.center_lng.toFixed(4)}, {neighborhood.center_lat.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openNeighborhoodDialog(neighborhood)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteNeighborhood(neighborhood.id)}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* District Dialog */}
      <Dialog open={districtDialog} onOpenChange={setDistrictDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDistrict ? 'İlçe Düzenle' : 'Yeni İlçe Ekle'}</DialogTitle>
            <DialogDescription>
              İlçe bilgilerini girin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="district-name">İlçe Adı</Label>
              <Input
                id="district-name"
                value={districtForm.name}
                onChange={(e) => setDistrictForm({ ...districtForm, name: e.target.value })}
                placeholder="Örn: Kadıköy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district-lng">Longitude (Boylam)</Label>
                <Input
                  id="district-lng"
                  type="number"
                  step="0.0001"
                  value={districtForm.center_lng}
                  onChange={(e) => setDistrictForm({ ...districtForm, center_lng: e.target.value })}
                  placeholder="29.0123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district-lat">Latitude (Enlem)</Label>
                <Input
                  id="district-lat"
                  type="number"
                  step="0.0001"
                  value={districtForm.center_lat}
                  onChange={(e) => setDistrictForm({ ...districtForm, center_lat: e.target.value })}
                  placeholder="41.0123"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDistrictDialog(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveDistrict}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Neighborhood Dialog */}
      <Dialog open={neighborhoodDialog} onOpenChange={setNeighborhoodDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNeighborhood ? 'Mahalle Düzenle' : 'Yeni Mahalle Ekle'}</DialogTitle>
            <DialogDescription>
              Mahalle bilgilerini girin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood-name">Mahalle Adı</Label>
              <Input
                id="neighborhood-name"
                value={neighborhoodForm.name}
                onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, name: e.target.value })}
                placeholder="Örn: Moda"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood-district">İlçe</Label>
              <Select
                value={neighborhoodForm.district_id}
                onValueChange={(value) => setNeighborhoodForm({ ...neighborhoodForm, district_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="İlçe seçin" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="neighborhood-lng">Longitude (Boylam)</Label>
                <Input
                  id="neighborhood-lng"
                  type="number"
                  step="0.0001"
                  value={neighborhoodForm.center_lng}
                  onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, center_lng: e.target.value })}
                  placeholder="29.0123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood-lat">Latitude (Enlem)</Label>
                <Input
                  id="neighborhood-lat"
                  type="number"
                  step="0.0001"
                  value={neighborhoodForm.center_lat}
                  onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, center_lat: e.target.value })}
                  placeholder="41.0123"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNeighborhoodDialog(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveNeighborhood}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Neighborhood Dialog */}
      <Dialog open={bulkNeighborhoodDialog} onOpenChange={setBulkNeighborhoodDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Toplu Mahalle Ekle</DialogTitle>
            <DialogDescription>
              Bir ilçeye birden fazla mahalle ekleyin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>İlçe Seçin</Label>
              <Select value={bulkDistrictId} onValueChange={setBulkDistrictId}>
                <SelectTrigger>
                  <SelectValue placeholder="İlçe seçin" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Mahalleler</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBulkNeighborhoodRow}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Satır Ekle
                </Button>
              </div>

              {bulkNeighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex gap-2 items-start p-3 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Mahalle adı *"
                      value={neighborhood.name}
                      onChange={(e) => updateBulkNeighborhood(index, 'name', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="Lng (opsiyonel)"
                        value={neighborhood.center_lng}
                        onChange={(e) => updateBulkNeighborhood(index, 'center_lng', e.target.value)}
                      />
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="Lat (opsiyonel)"
                        value={neighborhood.center_lat}
                        onChange={(e) => updateBulkNeighborhood(index, 'center_lat', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBulkNeighborhoodRow(index)}
                    disabled={bulkNeighborhoods.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkNeighborhoodDialog(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveBulkNeighborhoods}>
              Tümünü Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
