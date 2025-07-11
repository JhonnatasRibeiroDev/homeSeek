
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UNIT_STATUS_CONFIG } from '@/types/property';

interface UnitModalProps {
  unit: any;
  onClose: () => void;
  onSave: (unit: any) => void;
}

const UnitModal: React.FC<UnitModalProps> = ({ unit, onClose, onSave }) => {
  const [formData, setFormData] = useState(unit);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Unidade {formData.unit}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Disponibilidade</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(UNIT_STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 ${config.bgColor} rounded`}></div>
                        <span>{config.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Metragem</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: parseFloat(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tower">Torre</Label>
              <Input
                id="tower"
                value={formData.tower}
                onChange={(e) => setFormData(prev => ({ ...prev, tower: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unidade</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="typology">Tipologia</Label>
              <Select
                value={formData.typology}
                onValueChange={(value) => setFormData(prev => ({ ...prev, typology: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Quarto">1 Quarto</SelectItem>
                  <SelectItem value="2 Quartos">2 Quartos</SelectItem>
                  <SelectItem value="3 Quartos">3 Quartos</SelectItem>
                  <SelectItem value="4 Quartos">4 Quartos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parking">Vagas Garagem</Label>
              <Input
                id="parking"
                type="number"
                value={formData.parking}
                onChange={(e) => setFormData(prev => ({ ...prev, parking: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Valor (R$)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              placeholder="Cozinha, Jantar, Sala de TV, Circulação, Quarto 1, 1 Banheiro"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Excluir
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnitModal;
