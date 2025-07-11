import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types/property';

export interface OptionsStepProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  isBulkMode?: boolean;
  isDevelopmentMode?: boolean;
  setIsDevelopmentMode?: (value: boolean) => void;
  userRole?: string;
}

const OptionsStep: React.FC<OptionsStepProps> = ({ formData, setFormData, isBulkMode }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Visibilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibilidade</Label>
            <Select
              value={formData.visibility}
              onValueChange={(value: 'publica' | 'privada') => 
                setFormData(prev => ({ ...prev, visibility: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a visibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publica">Pública</SelectItem>
                <SelectItem value="privada">Privada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value: 'novos' | 'terceiros' | 'exclusivos' | 'aluguel') => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novos">Novos</SelectItem>
                <SelectItem value="terceiros">Terceiros</SelectItem>
                <SelectItem value="exclusivos">Exclusivos</SelectItem>
                <SelectItem value="aluguel">Aluguel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opções Especiais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="highlighted"
              checked={formData.isHighlighted}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, isHighlighted: !!checked }))
              }
            />
            <Label htmlFor="highlighted">Destacar imóvel</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="brokerLink"
              checked={formData.allowBrokerLink}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, allowBrokerLink: !!checked }))
              }
            />
            <Label htmlFor="brokerLink">Permitir link de corretor</Label>
          </div>
        </CardContent>
      </Card>

      {isBulkMode && (
        <Card>
          <CardHeader>
            <CardTitle>Modo Empreendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Este imóvel será cadastrado como um empreendimento com múltiplas unidades.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OptionsStep;
