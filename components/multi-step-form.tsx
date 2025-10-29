"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FormData, LocationData, formatWhatsAppMessage, createWhatsAppUrl } from '@/lib/utils'
import { supabase, District, Neighborhood } from '@/lib/supabase'
import { MessageCircle, MapPin, Package, Clock, ChevronRight, ChevronLeft, Weight } from 'lucide-react'
import MapComponent from './map-component'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Kargo türü bilgilendirmeleri
const cargoTypeInfo: Record<string, string> = {
  'envelope': 'A4 zarflar, belgeler, evraklar için ideal. Hafif ve küçük boyutlu gönderiler.',
  'small-package': 'Küçük hediyeler, elektronik aksesuarlar, kitaplar gibi küçük ürünler için uygundur.',
  'medium-package': 'Ayakkabı kutusu, küçük cihazlar, orta boy hediye paketleri için idealdir.',
  'large-package': 'Büyük elektronik ürünler, hacimli paketler için uygundur.',
  'oversized-package': 'Çanta boyutunu aşan, büyük ve ağır yükler için özel kurye hizmeti.',
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    locationFrom: null,
    locationTo: null,
    cargoType: '',
    cargoWeight: '',
    cargoDetails: '',
    timePreference: '',
    scheduledDate: undefined
  })

  // Districts and neighborhoods from Supabase
  const [districts, setDistricts] = useState<District[]>([])
  const [fromDistrict, setFromDistrict] = useState<string>('')
  const [toDistrict, setToDistrict] = useState<string>('')
  const [fromNeighborhoods, setFromNeighborhoods] = useState<Neighborhood[]>([])
  const [toNeighborhoods, setToNeighborhoods] = useState<Neighborhood[]>([])
  const [selectedFromNeighborhood, setSelectedFromNeighborhood] = useState<string>('')
  const [selectedToNeighborhood, setSelectedToNeighborhood] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Auto-animate ref for smooth height transitions
  const [animateRef] = useAutoAnimate<HTMLDivElement>()

  // Load districts on mount
  useEffect(() => {
    loadDistricts()
  }, [])

  // Load "from" neighborhoods when district changes
  useEffect(() => {
    if (fromDistrict) {
      loadNeighborhoods(fromDistrict, 'from')
    } else {
      setFromNeighborhoods([])
      setSelectedFromNeighborhood('')
    }
  }, [fromDistrict])

  // Load "to" neighborhoods when district changes
  useEffect(() => {
    if (toDistrict) {
      loadNeighborhoods(toDistrict, 'to')
    } else {
      setToNeighborhoods([])
      setSelectedToNeighborhood('')
    }
  }, [toDistrict])

  async function loadDistricts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('districts')
      .select('*')
      .order('name')

    if (!error && data) {
      setDistricts(data)
    }
    setLoading(false)
  }

  async function loadNeighborhoods(districtId: string, type: 'from' | 'to') {
    const { data, error } = await supabase
      .from('neighborhoods')
      .select('*')
      .eq('district_id', districtId)
      .order('name')

    if (!error && data) {
      if (type === 'from') {
        setFromNeighborhoods(data)
      } else {
        setToNeighborhoods(data)
      }
    }
  }

  const handleFromNeighborhoodChange = (neighborhoodId: string) => {
    setSelectedFromNeighborhood(neighborhoodId)
    const neighborhood = fromNeighborhoods.find(n => n.id === neighborhoodId)
    const district = districts.find(d => d.id === fromDistrict)

    if (neighborhood && district) {
      setFormData({
        ...formData,
        locationFrom: {
          district: district.name,
          neighborhood: neighborhood.name,
          coordinates: [neighborhood.center_lng, neighborhood.center_lat],
          geometry: neighborhood.geometry,
          bbox: neighborhood.bbox
        }
      })
    }
  }

  const handleToNeighborhoodChange = (neighborhoodId: string) => {
    setSelectedToNeighborhood(neighborhoodId)
    const neighborhood = toNeighborhoods.find(n => n.id === neighborhoodId)
    const district = districts.find(d => d.id === toDistrict)

    if (neighborhood && district) {
      setFormData({
        ...formData,
        locationTo: {
          district: district.name,
          neighborhood: neighborhood.name,
          coordinates: [neighborhood.center_lng, neighborhood.center_lat],
          geometry: neighborhood.geometry,
          bbox: neighborhood.bbox
        }
      })
    }
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleWhatsAppSend = () => {
    const message = formatWhatsAppMessage(formData)
    const url = createWhatsAppUrl(message)
    window.open(url, '_blank')
  }

  const progress = (step / 5) * 100

  // Validation logic
  const canProceedStep1 = formData.locationFrom && formData.locationTo
  const canProceedStep2 = formData.cargoType !== ''
  const canProceedStep3 = formData.cargoWeight !== ''
  const canProceedStep4 = formData.timePreference !== ''

  return (
    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              {step === 1 && <MapPin className="h-6 w-6 text-primary" />}
              {step === 2 && <Package className="h-6 w-6 text-primary" />}
              {step === 3 && <Weight className="h-6 w-6 text-primary" />}
              {step === 4 && <Clock className="h-6 w-6 text-primary" />}
              {step === 5 && <MessageCircle className="h-6 w-6 text-primary" />}
              
              Adım {step} / 5: {
                step === 1 ? 'Konum Bilgileri' :
                step === 2 ? 'Kargo Türü' :
                step === 3 ? 'Ağırlık' :
                step === 4 ? 'Zamanlama' : 'Onay ve Gönderim'
              }
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Tamamlandı
            </div>
          </div>
          <Progress value={progress} />
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Area */}
            <div ref={animateRef} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Kargo nereye gidecek?</h3>

                    {/* From Location */}
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Nereden</Label>
                        <select
                          value={fromDistrict}
                          onChange={(e) => {
                            setFromDistrict(e.target.value)
                            setFormData({ ...formData, locationFrom: null })
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          disabled={loading}
                        >
                          <option value="">İlçe seçin...</option>
                          {districts.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {fromDistrict && (
                        <div className="space-y-2">
                          <Label className="text-gray-700">Mahalle</Label>
                          <select
                            value={selectedFromNeighborhood}
                            onChange={(e) => handleFromNeighborhoodChange(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          >
                            <option value="">Mahalle seçin...</option>
                            {fromNeighborhoods.map((n) => (
                              <option key={n.id} value={n.id}>
                                {n.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* To Location */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Nereye</Label>
                        <select
                          value={toDistrict}
                          onChange={(e) => {
                            setToDistrict(e.target.value)
                            setFormData({ ...formData, locationTo: null })
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          disabled={loading}
                        >
                          <option value="">İlçe seçin...</option>
                          {districts.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {toDistrict && (
                        <div className="space-y-2">
                          <Label className="text-gray-700">Mahalle</Label>
                          <select
                            value={selectedToNeighborhood}
                            onChange={(e) => handleToNeighborhoodChange(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          >
                            <option value="">Mahalle seçin...</option>
                            {toNeighborhoods.map((n) => (
                              <option key={n.id} value={n.id}>
                                {n.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Kargo türünü seçin</h3>
                    <RadioGroup
                      className="grid w-full grid-cols-1 gap-3"
                      value={formData.cargoType}
                      onValueChange={(value) => setFormData({ ...formData, cargoType: value as 'envelope' | 'small-package' | 'medium-package' | 'large-package' | 'oversized-package' })}
                    >
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="envelope" id="envelope" />
                        <Label htmlFor="envelope" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Evrak / Zarf</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="small-package" id="small-package" />
                        <Label htmlFor="small-package" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Küçük Paket</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="medium-package" id="medium-package" />
                        <Label htmlFor="medium-package" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Orta Paket</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="large-package" id="large-package" />
                        <Label htmlFor="large-package" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Büyük Paket</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="oversized-package" id="oversized-package" />
                        <Label htmlFor="oversized-package" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Çanta Aşan Paket</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.cargoType && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Bilgi:</strong> {cargoTypeInfo[formData.cargoType]}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Kargo detayları (opsiyonel)</Label>
                    <Textarea
                      value={formData.cargoDetails}
                      onChange={(e) => setFormData({ ...formData, cargoDetails: e.target.value })}
                      placeholder="Kargonuz hakkında ek bilgi verebilirsiniz..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Ağırlık seçin</h3>
                    <RadioGroup
                      className="grid w-full grid-cols-1 gap-3"
                      value={formData.cargoWeight}
                      onValueChange={(value) => setFormData({ ...formData, cargoWeight: value as '1-2kg' | '2-5kg' | '5-10kg' | '10-15kg' | '15-20kg' | '20kg+' })}
                    >
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="1-2kg" id="1-2kg" />
                        <Label htmlFor="1-2kg" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">1-2 kg</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="2-5kg" id="2-5kg" />
                        <Label htmlFor="2-5kg" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">2-5 kg</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="5-10kg" id="5-10kg" />
                        <Label htmlFor="5-10kg" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">5-10 kg</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="10-15kg" id="10-15kg" />
                        <Label htmlFor="10-15kg" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">10-15 kg</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="15-20kg" id="15-20kg" />
                        <Label htmlFor="15-20kg" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">15-20 kg</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="20kg+" id="20kg+" />
                        <Label htmlFor="20kg+" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Weight className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">20 kg üstü yük</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Teslimat hızını seçin</h3>
                    <RadioGroup
                      className="grid w-full grid-cols-1 gap-3"
                      value={formData.timePreference}
                      onValueChange={(value) => setFormData({ ...formData, timePreference: value as 'vip' | 'express' | 'standard' })}
                    >
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="vip" id="vip" />
                        <Label htmlFor="vip" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <span className="font-medium block">VIP Teslimat</span>
                            <span className="text-sm text-gray-500">1 saat içinde</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <span className="font-medium block">Ekspres Teslimat</span>
                            <span className="text-sm text-gray-500">1-2 saat içinde</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer flex items-center gap-2 flex-1">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <span className="font-medium block">Normal Teslimat</span>
                            <span className="text-sm text-gray-500">2-4 saat içinde</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Sipariş Özeti</h3>
                  
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Konum</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.locationFrom?.district} - {formData.locationFrom?.neighborhood} 
                          → {formData.locationTo?.district} - {formData.locationTo?.neighborhood}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Package className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Kargo Türü</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.cargoType === 'envelope' ? 'Evrak / Zarf' :
                           formData.cargoType === 'small-package' ? 'Küçük Paket' :
                           formData.cargoType === 'medium-package' ? 'Orta Paket' :
                           formData.cargoType === 'large-package' ? 'Büyük Paket' :
                           formData.cargoType === 'oversized-package' ? 'Çanta Aşan Paket' : ''}
                          {formData.cargoDetails && ` - ${formData.cargoDetails}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Weight className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Ağırlık</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.cargoWeight === '1-2kg' ? '1-2 kg' :
                           formData.cargoWeight === '2-5kg' ? '2-5 kg' :
                           formData.cargoWeight === '5-10kg' ? '5-10 kg' :
                           formData.cargoWeight === '10-15kg' ? '10-15 kg' :
                           formData.cargoWeight === '15-20kg' ? '15-20 kg' :
                           formData.cargoWeight === '20kg+' ? '20 kg üstü' : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Zamanlama</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.timePreference === 'vip' ? 'VIP Teslimat (1 saat)' :
                           formData.timePreference === 'express' ? 'Ekspres Teslimat (1-2 saat)' :
                           formData.timePreference === 'standard' ? 'Normal Teslimat (2-4 saat)' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleWhatsAppSend}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Kurye Çağır (WhatsApp)
                  </Button>
                </div>
              )}
            </div>

            {/* Map Area */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <MapComponent 
                fromLocation={formData.locationFrom}
                toLocation={formData.locationTo}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Önceki
            </Button>
            
            {step < 5 && (
              <Button
                onClick={nextStep}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3) ||
                  (step === 4 && !canProceedStep4)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sonraki
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}