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
import { Card } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function LocationsPage() {
  const [districts, setDistricts] = useState<District[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<Neighborhood[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog states
  const [districtDialog, setDistrictDialog] = useState(false)
  const [neighborhoodDialog, setNeighborhoodDialog] = useState(false)
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null)
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null)

  // Form states
  const [districtForm, setDistrictForm] = useState({ name: '', center_lng: '', center_lat: '' })
  const [neighborhoodForm, setNeighborhoodForm] = useState({ name: '', district_id: '', center_lng: '', center_lat: '' })

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

  const getDistrictName = (districtId: string) => {
    return districts.find(d => d.id === districtId)?.name || 'Bilinmiyor'
  }

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  )

  if (loading) {
    return <div className="text-white">Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">İlçe & Mahalle Yönetimi</h1>
        <p className="text-slate-400">Lokasyon verilerini buradan yönetebilirsiniz</p>
      </div>

      <Tabs defaultValue="districts" className="w-full">
        <TabsList className="bg-slate-900 border-slate-800">
          <TabsTrigger value="districts" className="data-[state=active]:bg-slate-800">
            İlçeler ({districts.length})
          </TabsTrigger>
          <TabsTrigger value="neighborhoods" className="data-[state=active]:bg-slate-800">
            Mahalleler ({neighborhoods.length})
          </TabsTrigger>
        </TabsList>

        {/* Districts Tab */}
        <TabsContent value="districts">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="İlçe ara..."
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <Button onClick={() => openDistrictDialog()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Yeni İlçe
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">İlçe Adı</TableHead>
                  <TableHead className="text-slate-300">Mahalle Sayısı</TableHead>
                  <TableHead className="text-slate-300">Koordinat (Lng, Lat)</TableHead>
                  <TableHead className="text-right text-slate-300">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistricts.map((district) => (
                  <TableRow key={district.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-white">{district.name}</TableCell>
                    <TableCell className="text-slate-300">
                      <Badge variant="secondary">
                        {neighborhoods.filter(n => n.district_id === district.id).length} mahalle
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 font-mono text-sm">
                      {district.center_lng.toFixed(4)}, {district.center_lat.toFixed(4)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDistrictDialog(district)}
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDistrict(district.id)}
                          className="border-red-800 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Neighborhoods Tab */}
        <TabsContent value="neighborhoods">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Mahalle ara..."
                    value={neighborhoodSearch}
                    onChange={(e) => setNeighborhoodSearch(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Select value={selectedDistrictFilter} onValueChange={setSelectedDistrictFilter}>
                  <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="İlçe filtrele" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Tüm İlçeler</SelectItem>
                    {districts.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => openNeighborhoodDialog()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Mahalle
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Mahalle Adı</TableHead>
                  <TableHead className="text-slate-300">İlçe</TableHead>
                  <TableHead className="text-slate-300">Koordinat (Lng, Lat)</TableHead>
                  <TableHead className="text-right text-slate-300">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNeighborhoods.map((neighborhood) => (
                  <TableRow key={neighborhood.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-white">{neighborhood.name}</TableCell>
                    <TableCell className="text-slate-300">
                      <Badge>{getDistrictName(neighborhood.district_id)}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 font-mono text-sm">
                      {neighborhood.center_lng.toFixed(4)}, {neighborhood.center_lat.toFixed(4)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openNeighborhoodDialog(neighborhood)}
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNeighborhood(neighborhood.id)}
                          className="border-red-800 text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* District Dialog */}
      <Dialog open={districtDialog} onOpenChange={setDistrictDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingDistrict ? 'İlçe Düzenle' : 'Yeni İlçe Ekle'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              İlçe bilgilerini girin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="district-name">İlçe Adı</Label>
              <Input
                id="district-name"
                value={districtForm.name}
                onChange={(e) => setDistrictForm({ ...districtForm, name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district-lng">Longitude (Boylam)</Label>
                <Input
                  id="district-lng"
                  type="number"
                  step="0.0001"
                  value={districtForm.center_lng}
                  onChange={(e) => setDistrictForm({ ...districtForm, center_lng: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="district-lat">Latitude (Enlem)</Label>
                <Input
                  id="district-lat"
                  type="number"
                  step="0.0001"
                  value={districtForm.center_lat}
                  onChange={(e) => setDistrictForm({ ...districtForm, center_lat: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDistrictDialog(false)} className="border-slate-700">
              İptal
            </Button>
            <Button onClick={handleSaveDistrict} className="bg-blue-600 hover:bg-blue-700">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Neighborhood Dialog */}
      <Dialog open={neighborhoodDialog} onOpenChange={setNeighborhoodDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingNeighborhood ? 'Mahalle Düzenle' : 'Yeni Mahalle Ekle'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Mahalle bilgilerini girin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="neighborhood-name">Mahalle Adı</Label>
              <Input
                id="neighborhood-name"
                value={neighborhoodForm.name}
                onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="neighborhood-district">İlçe</Label>
              <Select
                value={neighborhoodForm.district_id}
                onValueChange={(value) => setNeighborhoodForm({ ...neighborhoodForm, district_id: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="İlçe seçin" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {districts.map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="neighborhood-lng">Longitude (Boylam)</Label>
                <Input
                  id="neighborhood-lng"
                  type="number"
                  step="0.0001"
                  value={neighborhoodForm.center_lng}
                  onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, center_lng: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="neighborhood-lat">Latitude (Enlem)</Label>
                <Input
                  id="neighborhood-lat"
                  type="number"
                  step="0.0001"
                  value={neighborhoodForm.center_lat}
                  onChange={(e) => setNeighborhoodForm({ ...neighborhoodForm, center_lat: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNeighborhoodDialog(false)} className="border-slate-700">
              İptal
            </Button>
            <Button onClick={handleSaveNeighborhood} className="bg-blue-600 hover:bg-blue-700">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
