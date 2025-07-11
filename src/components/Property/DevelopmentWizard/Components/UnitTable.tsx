
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Copy, Trash2 } from 'lucide-react';
import { PropertyDevelopment, UNIT_STATUS_CONFIG, UnitStatus } from '@/types/property';

interface UnitTableProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const UnitTable: React.FC<UnitTableProps> = ({ formData, setFormData }) => {
  const mockUnits = [
    { id: '1', tower: 'A', floor: 9, unit: '901', typology: '3Q', area: 85, parking: 2, status: 'disponivel' as UnitStatus, price: 550000 },
    { id: '2', tower: 'A', floor: 9, unit: '902', typology: '2Q', area: 65, parking: 1, status: 'pre-reserva' as UnitStatus, price: 450000 },
    { id: '3', tower: 'A', floor: 8, unit: '801', typology: '3Q', area: 85, parking: 2, status: 'reservado' as UnitStatus, price: 550000 },
    { id: '4', tower: 'A', floor: 8, unit: '802', typology: '2Q', area: 65, parking: 1, status: 'vendido' as UnitStatus, price: 450000 },
    { id: '5', tower: 'A', floor: 7, unit: '701', typology: '3Q', area: 85, parking: 2, status: 'reserva-permanente' as UnitStatus, price: 550000 },
    { id: '6', tower: 'A', floor: 7, unit: '702', typology: '2Q', area: 65, parking: 1, status: 'indisponivel' as UnitStatus, price: 450000 },
  ];

  return (
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
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUnits.map((unit) => {
            const statusConfig = UNIT_STATUS_CONFIG[unit.status];
            return (
              <TableRow key={unit.id}>
                <TableCell className="font-medium">{unit.tower}</TableCell>
                <TableCell>{unit.floor}º</TableCell>
                <TableCell>{unit.unit}</TableCell>
                <TableCell>{unit.typology}</TableCell>
                <TableCell>{unit.area}</TableCell>
                <TableCell>{unit.parking}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${statusConfig.bgColor}`}>
                    {statusConfig.label}
                  </span>
                </TableCell>
                <TableCell>R$ {unit.price.toLocaleString('pt-BR')}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnitTable;
