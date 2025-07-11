
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropertyUnit } from '@/types/property';
import { Plus, Upload, Copy, Edit, Trash2, ExternalLink } from 'lucide-react';

interface BulkPropertyFormProps {
  onClose: () => void;
}

const BulkPropertyForm: React.FC<BulkPropertyFormProps> = ({ onClose }) => {
  const [units, setUnits] = useState<PropertyUnit[]>([
    {
      id: '1',
      unitNumber: '1001',
      tower: 'A',
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 2,
      privateArea: 85,
      price: 450000,
      status: 'disponivel',
      downPayment: 90000,
      installments: { quantity: 60, value: 6000 },
      observations: ''
    },
    {
      id: '2',
      unitNumber: '1002',
      tower: 'A',
      bedrooms: 3,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 2,
      privateArea: 85,
      price: 450000,
      status: 'disponivel',
      downPayment: 90000,
      installments: { quantity: 60, value: 6000 },
      observations: ''
    }
  ]);

  const addUnit = () => {
    const newUnit: PropertyUnit = {
      id: Date.now().toString(),
      unitNumber: '',
      tower: '',
      bedrooms: 0,
      suites: 0,
      bathrooms: 0,
      parkingSpaces: 0,
      privateArea: 0,
      price: 0,
      status: 'disponivel',
      observations: ''
    };
    setUnits([...units, newUnit]);
  };

  const cloneUnit = (unit: PropertyUnit) => {
    const clonedUnit: PropertyUnit = {
      ...unit,
      id: Date.now().toString(),
      unitNumber: unit.unitNumber + '_copia'
    };
    setUnits([...units, clonedUnit]);
  };

  const removeUnit = (id: string) => {
    setUnits(units.filter(unit => unit.id !== id));
  };

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
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Unidades do Empreendimento</h3>
          <p className="text-sm text-gray-600">Gerencie as unidades individuais</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar CSV
          </Button>
          <Button onClick={addUnit} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Unidade
          </Button>
        </div>
      </div>

      {/* Units Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Torre</TableHead>
                  <TableHead>Quartos</TableHead>
                  <TableHead>Suítes</TableHead>
                  <TableHead>Vagas</TableHead>
                  <TableHead>Área (m²)</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Parcelas</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell>
                      <Input
                        value={unit.unitNumber}
                        onChange={(e) => {
                          const updatedUnits = units.map(u => 
                            u.id === unit.id ? { ...u, unitNumber: e.target.value } : u
                          );
                          setUnits(updatedUnits);
                        }}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={unit.tower || ''}
                        onChange={(e) => {
                          const updatedUnits = units.map(u => 
                            u.id === unit.id ? { ...u, tower: e.target.value } : u
                          );
                          setUnits(updatedUnits);
                        }}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>{unit.bedrooms}</TableCell>
                    <TableCell>{unit.suites}</TableCell>
                    <TableCell>{unit.parkingSpaces}</TableCell>
                    <TableCell>{unit.privateArea}m²</TableCell>
                    <TableCell>R$ {unit.price.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(unit.status)}`}>
                        {getStatusText(unit.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {unit.downPayment ? `R$ ${unit.downPayment.toLocaleString('pt-BR')}` : '-'}
                    </TableCell>
                    <TableCell>
                      {unit.installments ? `${unit.installments.quantity}x R$ ${unit.installments.value.toLocaleString('pt-BR')}` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => cloneUnit(unit)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeUnit(unit.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
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
    </div>
  );
};

export default BulkPropertyForm;
