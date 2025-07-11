
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyDevelopment } from '@/types/property';

interface BasicInfoStepProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Empreendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Empreendimento</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Residencial Solar das Águas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição do empreendimento..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Empreendimento</Label>
              <Select
                value={formData.type || 'torre'}
                onValueChange={(value: 'torre' | 'condominio' | 'loteamento' | 'empreendimento') => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="torre">Torre/Edifício</SelectItem>
                  <SelectItem value="condominio">Condomínio Horizontal</SelectItem>
                  <SelectItem value="loteamento">Loteamento</SelectItem>
                  <SelectItem value="empreendimento">Empreendimento Misto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Segmento</Label>
              <Select
                value={formData.category || 'novos'}
                onValueChange={(value: 'novos' | 'terceiros' | 'exclusivos' | 'aluguel') => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novos">Econômico</SelectItem>
                  <SelectItem value="terceiros">Médio Padrão</SelectItem>
                  <SelectItem value="exclusivos">Alto Padrão</SelectItem>
                  <SelectItem value="aluguel">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.location?.address || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                location: { ...prev.location, address: e.target.value } 
              }))}
              placeholder="Rua, número"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.location?.neighborhood || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, neighborhood: e.target.value } 
                }))}
                placeholder="Bairro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.location?.city || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, city: e.target.value } 
                }))}
                placeholder="Cidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select
                value={formData.location?.state || 'SC'}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, state: value } 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SC">Santa Catarina</SelectItem>
                  <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Ponto de Referência</Label>
            <Input
              id="reference"
              value={formData.location?.reference || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                location: { ...prev.location, reference: e.target.value } 
              }))}
              placeholder="Ponto de referência (opcional)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoStep;
