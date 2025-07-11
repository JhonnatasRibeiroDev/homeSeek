
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PropertyDevelopment } from '@/types/property';

interface StructureStepProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const StructureStep: React.FC<StructureStepProps> = ({ formData, setFormData }) => {
  const [developmentType, setDevelopmentType] = React.useState<'vertical' | 'horizontal'>('vertical');
  const [floors, setFloors] = React.useState(1);
  const [towers, setTowers] = React.useState(1);
  const [unitsPerFloor, setUnitsPerFloor] = React.useState(1);
  const [hasBasement, setHasBasement] = React.useState(false);
  const [basementFloors, setBasementFloors] = React.useState(0);
  const [showEmptyFloors, setShowEmptyFloors] = React.useState(true);
  const [showGroundFloor, setShowGroundFloor] = React.useState(true);

  const handleDevelopmentTypeChange = (value: string) => {
    setDevelopmentType(value as 'vertical' | 'horizontal');
  };

  const handleBasementChange = (checked: boolean | 'indeterminate') => {
    setHasBasement(checked === true);
  };

  const handleShowGroundFloorChange = (checked: boolean | 'indeterminate') => {
    setShowGroundFloor(checked === true);
  };

  const handleShowEmptyFloorsChange = (checked: boolean | 'indeterminate') => {
    setShowEmptyFloors(checked === true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Empreendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={developmentType} onValueChange={handleDevelopmentTypeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical" id="vertical" />
              <Label htmlFor="vertical">Disponibilidade Vertical (Torres, andares e apartamentos)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Disponibilidade Horizontal (Lotes, quadras, casas)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {developmentType === 'vertical' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuração Vertical</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="towers">Quantidade de Torres</Label>
                <Input
                  id="towers"
                  type="number"
                  min="1"
                  value={towers}
                  onChange={(e) => setTowers(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="floors">Quantidade de Andares</Label>
                <Input
                  id="floors"
                  type="number"
                  min="1"
                  value={floors}
                  onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitsPerFloor">Unidades por Andar</Label>
                <Input
                  id="unitsPerFloor"
                  type="number"
                  min="1"
                  value={unitsPerFloor}
                  onChange={(e) => setUnitsPerFloor(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="basement"
                  checked={hasBasement}
                  onCheckedChange={handleBasementChange}
                />
                <Label htmlFor="basement">Possui Subsolo?</Label>
              </div>

              {hasBasement && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="basementFloors">Quantidade de Subsolos</Label>
                  <Input
                    id="basementFloors"
                    type="number"
                    min="1"
                    className="w-32"
                    value={basementFloors}
                    onChange={(e) => setBasementFloors(parseInt(e.target.value) || 0)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showGroundFloor"
                  checked={showGroundFloor}
                  onCheckedChange={handleShowGroundFloorChange}
                />
                <Label htmlFor="showGroundFloor">Exibir Térreo?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showEmptyFloors"
                  checked={showEmptyFloors}
                  onCheckedChange={handleShowEmptyFloorsChange}
                />
                <Label htmlFor="showEmptyFloors">Ocultar Andares Vazios?</Label>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Resumo da Estrutura</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• {towers} torre(s)</p>
                <p>• {floors} andar(es) por torre</p>
                <p>• {unitsPerFloor} unidade(s) por andar</p>
                <p>• Total de unidades: <strong>{towers * floors * unitsPerFloor}</strong></p>
                {hasBasement && <p>• {basementFloors} subsolo(s)</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {developmentType === 'horizontal' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuração Horizontal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blocks">Quantidade de Quadras</Label>
                <Input
                  id="blocks"
                  type="number"
                  min="1"
                  placeholder="Ex: 4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lotsPerBlock">Lotes por Quadra</Label>
                <Input
                  id="lotsPerBlock"
                  type="number"
                  min="1"
                  placeholder="Ex: 12"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StructureStep;
