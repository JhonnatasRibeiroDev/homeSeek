
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Undo2, Filter } from 'lucide-react';
import { PropertyDevelopment } from '@/types/property';

interface SalesTableStepProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const SalesTableStep: React.FC<SalesTableStepProps> = ({ formData, setFormData }) => {
  const [filters, setFilters] = React.useState({
    tower: '',
    floor: '',
    status: ''
  });

  const mockUnits = [
    { id: '1', tower: 'A', floor: 1, unit: '101', typology: '2Q', area: 65, parking: 1, status: 'disponivel', price: 450000 },
    { id: '2', tower: 'A', floor: 1, unit: '102', typology: '2Q', area: 65, parking: 1, status: 'reservado', price: 450000 },
    { id: '3', tower: 'A', floor: 2, unit: '201', typology: '3Q', area: 85, parking: 2, status: 'disponivel', price: 550000 },
    { id: '4', tower: 'A', floor: 2, unit: '202', typology: '3Q', area: 85, parking: 2, status: 'vendido', price: 550000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'text-green-600 bg-green-50';
      case 'reservado': return 'text-yellow-600 bg-yellow-50';
      case 'vendido': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'reservado': return 'Reservado';
      case 'vendido': return 'Vendido';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gestão de Tabela de Vendas</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Undo2 className="w-4 h-4 mr-2" />
                Desfazer
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Filtros:</span>
              <Select value={filters.tower} onValueChange={(value) => setFilters(prev => ({ ...prev, tower: value }))}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Torre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="A">Torre A</SelectItem>
                  <SelectItem value="B">Torre B</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="disponivel">Disponível</SelectItem>
                  <SelectItem value="reservado">Reservado</SelectItem>
                  <SelectItem value="vendido">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sales Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Torre</TableHead>
                  <TableHead>Andar</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Tipologia</TableHead>
                  <TableHead>Área (m²)</TableHead>
                  <TableHead>Vagas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor (R$)</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.tower}</TableCell>
                    <TableCell>{unit.floor}º</TableCell>
                    <TableCell>{unit.unit}</TableCell>
                    <TableCell>{unit.typology}</TableCell>
                    <TableCell>{unit.area}</TableCell>
                    <TableCell>{unit.parking}</TableCell>
                    <TableCell>
                      <Select defaultValue={unit.status}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disponivel">Disponível</SelectItem>
                          <SelectItem value="reservado">Reservado</SelectItem>
                          <SelectItem value="vendido">Vendido</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        defaultValue={unit.price}
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Observações..."
                        className="w-40"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>💡 <strong>Dica:</strong> Você pode copiar e colar múltiplas células desta tabela diretamente do Excel.</p>
            <p>📊 Total de unidades: {mockUnits.length} | Disponíveis: {mockUnits.filter(u => u.status === 'disponivel').length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesTableStep;
