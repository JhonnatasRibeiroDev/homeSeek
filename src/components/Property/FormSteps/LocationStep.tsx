
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PropertyFormData } from '@/types/property';

interface LocationStepProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  isBulkMode?: boolean;
  isDevelopmentMode?: boolean;
  setIsDevelopmentMode?: (value: boolean) => void;
  userRole?: string;
}

const LocationStep: React.FC<LocationStepProps> = ({ formData, setFormData, isBulkMode }) => {
  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Localização do Imóvel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.location.address}
                onChange={(e) => handleLocationChange('address', e.target.value)}
                placeholder="Rua, número"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                value={formData.location.neighborhood}
                onChange={(e) => handleLocationChange('neighborhood', e.target.value)}
                placeholder="Nome do bairro"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.location.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                placeholder="Nome da cidade"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.location.state}
                onChange={(e) => handleLocationChange('state', e.target.value)}
                placeholder="SC"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="reference">Ponto de Referência</Label>
            <Textarea
              id="reference"
              value={formData.location.reference || ''}
              onChange={(e) => handleLocationChange('reference', e.target.value)}
              placeholder="Próximo ao shopping, escola, etc."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationStep;
