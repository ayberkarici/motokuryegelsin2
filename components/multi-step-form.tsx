"use client"
import { Combobox } from './ui/combobox'

import React, { useState, useEffect } from 'react'
import { FormData, LocationData, loadDistricts, loadNeighborhoods, formatWhatsAppMessage, createWhatsAppUrl, DistrictOption, NeighborhoodOption } from '@/lib/utils'
import { MessageCircle, MapPin, Package, Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import MapComponent from './map-component'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// ...existing code...

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [districts, setDistricts] = useState<DistrictOption[]>([])
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodOption[]>([])
  const [formData, setFormData] = useState<FormData>({
    locationFrom: null,
    locationTo: null,
    cargoType: '',
    cargoDetails: '',
    timePreference: '',
    scheduledDate: undefined
  })
  
  const [selectedFromLocation, setSelectedFromLocation] = useState('')
  const [selectedToLocation, setSelectedToLocation] = useState('')

  useEffect(() => {
    loadDistricts().then(setDistricts)
    loadNeighborhoods().then(setNeighborhoods)
  }, [])

  const handleFromLocationChange = (value: string) => {
    setSelectedFromLocation(value)
    const neighborhood = neighborhoods.find(n => n.value === value)
    if (neighborhood) {
      setFormData({ 
        ...formData, 
        locationFrom: {
          district: neighborhood.district,
          neighborhood: neighborhood.label.split(' (')[0],
          coordinates: neighborhood.coordinates
        }
      })
    }
  }

  const handleToLocationChange = (value: string) => {
    setSelectedToLocation(value)
    const neighborhood = neighborhoods.find(n => n.value === value)
    if (neighborhood) {
      setFormData({ 
        ...formData, 
        locationTo: {
          district: neighborhood.district,
          neighborhood: neighborhood.label.split(' (')[0],
          coordinates: neighborhood.coordinates
        }
      })
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleWhatsAppSend = () => {
    const message = formatWhatsAppMessage(formData)
    const url = createWhatsAppUrl(message)
    window.open(url, '_blank')
  }

  const progress = (step / 4) * 100

  // Validation logic
  const canProceedStep1 = formData.locationFrom && formData.locationTo
  const canProceedStep2 = formData.cargoType !== ''
  const canProceedStep3 = formData.timePreference !== ''

  return (
    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              {step === 1 && <MapPin className="h-6 w-6 text-primary" />}
              {step === 2 && <Package className="h-6 w-6 text-primary" />}
              {step === 3 && <Clock className="h-6 w-6 text-primary" />}
              {step === 4 && <MessageCircle className="h-6 w-6 text-primary" />}
              
              Adım {step} / 4: {
                step === 1 ? 'Konum Bilgileri' :
                step === 2 ? 'Kargo Detayları' :
                step === 3 ? 'Zamanlama' : 'Onay ve Gönderim'
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
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Kargo nereye gidecek?</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700">Nereden (Mahalle)</Label>
                        <Combobox
                          options={neighborhoods.map(n => ({ value: n.value, label: n.label }))}
                          value={selectedFromLocation}
                          onSelect={handleFromLocationChange}
                          placeholder="Mahalle seçin..."
                          searchPlaceholder="Mahalle ara (en az 3 harf)..."
                          emptyMessage="Mahalle bulunamadı"
                          minSearchLength={3}
                        />
                        {formData.locationFrom && (
                          <p className="text-sm text-muted-foreground">
                            {formData.locationFrom.district} - {formData.locationFrom.neighborhood}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-700">Nereye (Mahalle)</Label>
                        <Combobox
                          options={neighborhoods.map(n => ({ value: n.value, label: n.label }))}
                          value={selectedToLocation}
                          onSelect={handleToLocationChange}
                          placeholder="Mahalle seçin..."
                          searchPlaceholder="Mahalle ara (en az 3 harf)..."
                          emptyMessage="Mahalle bulunamadı"
                          minSearchLength={3}
                        />
                        {formData.locationTo && (
                          <p className="text-sm text-muted-foreground">
                            {formData.locationTo.district} - {formData.locationTo.neighborhood}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Kargo türünü seçin</h3>
                    <RadioGroup
                      className="grid w-full grid-cols-1 sm:grid-cols-2 gap-3"
                      value={formData.cargoType}
                      onValueChange={(value) => setFormData({ ...formData, cargoType: value as 'envelope' | 'package' })}
                    >
                      <Label className="cursor-pointer">
                        <RadioGroupItem value="envelope" className="mr-3" />
                        <span className="font-medium flex items-center gap-2"><Package className="h-5 w-5" />Zarf / Döküman</span>
                      </Label>
                      <Label className="cursor-pointer">
                        <RadioGroupItem value="package" className="mr-3" />
                        <span className="font-medium flex items-center gap-2"><Package className="h-5 w-5" />Kutu / Paket</span>
                      </Label>
                    </RadioGroup>
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
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Ne zaman gönderilsin?</h3>
                    <RadioGroup
                      className="grid w-full grid-cols-1 sm:grid-cols-2 gap-3"
                      value={formData.timePreference}
                      onValueChange={(value) => setFormData({ ...formData, timePreference: value as 'asap' | 'today' | 'later' })}
                    >
                      <Label className="cursor-pointer">
                        <RadioGroupItem value="asap" className="mr-3" />
                        <span className="font-medium flex items-center gap-2"><Clock className="h-5 w-5" />Hemen (En Kısa Sürede)</span>
                      </Label>
                      <Label className="cursor-pointer">
                        <RadioGroupItem value="today" className="mr-3" />
                        <span className="font-medium flex items-center gap-2"><Clock className="h-5 w-5" />Bugün İçinde</span>
                      </Label>
                    </RadioGroup>
                  </div>
                  {formData.timePreference === 'later' && (
                    <div className="space-y-2">
                      <Label className="text-gray-700">Tarih ve saat seçin</Label>
                      <Input
                        type="datetime-local"
                        placeholder=""
                        value={formData.scheduledDate?.toISOString().slice(0, -8) || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          scheduledDate: e.target.value ? new Date(e.target.value) : undefined 
                        })}
                      />
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
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
                        <p className="font-medium">Kargo</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.cargoType === 'envelope' ? 'Zarf / Döküman' : 'Kutu / Paket'}
                          {formData.cargoDetails && ` - ${formData.cargoDetails}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Zamanlama</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.timePreference === 'asap' ? 'Hemen (En Kısa Sürede)' :
                           formData.timePreference === 'today' ? 'Bugün İçinde' :
                           formData.scheduledDate ? formData.scheduledDate.toLocaleString('tr-TR') : ''}
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
            
            {step < 4 && (
              <Button
                onClick={nextStep}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3)
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