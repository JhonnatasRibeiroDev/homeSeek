
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyDevelopment, UNIT_STATUS_CONFIG, UnitStatus } from '@/types/property';
import UnitModal from './UnitModal';

interface UnitGridProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const UnitGrid: React.FC<UnitGridProps> = ({ formData, setFormData }) => {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [showUnitModal, setShowUnitModal] = useState(false);

  const towers = ['A', 'B'];
  const floors = Array.from({ length: 9 }, (_, i) => 9 - i);
  const unitsPerFloor = 6;

  const getUnitStatus = (tower: string, floor: number, unit: number): UnitStatus => {
    const random = Math.random();
    if (random < 0.4) return 'disponivel';
    if (random < 0.5) return 'pre-reserva';
    if (random < 0.65) return 'reservado';
    if (random < 0.75) return 'reserva-permanente';
    if (random < 0.9) return 'vendido';
    return 'indisponivel';
  };

  const handleUnitClick = (tower: string, floor: number, unit: number, status: UnitStatus) => {
    setSelectedUnit({
      tower,
      floor,
      unit: `${floor}0${unit}`,
      status,
      typology: unit <= 2 ? '2 Quartos' : '3 Quartos',
      area: unit <= 2 ? 65 : 85,
      parking: unit <= 2 ? 1 : 2,
      price: unit <= 2 ? 450000 : 550000
    });
    setShowUnitModal(true);
  };

  return (
    <div className="space-y-8">
      {towers.map((tower) => (
        <div key={tower} className="border rounded-lg p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4 text-center">Torre {tower}</h3>
          
          <div className="grid grid-cols-8 gap-2">
            <div className="text-center font-medium text-sm text-gray-600">Andar</div>
            {Array.from({ length: unitsPerFloor }, (_, i) => (
              <div key={i} className="text-center font-medium text-sm text-gray-600">
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
            <div className="text-center font-medium text-sm text-gray-600">Corredor</div>

            {floors.map((floor) => (
              <React.Fragment key={floor}>
                <div className="flex items-center justify-center font-medium text-sm bg-gray-100 rounded p-2">
                  {floor}º
                </div>
                {Array.from({ length: unitsPerFloor }, (_, unitIndex) => {
                  const unitNumber = unitIndex + 1;
                  const status = getUnitStatus(tower, floor, unitNumber);
                  const statusConfig = UNIT_STATUS_CONFIG[status];
                  return (
                    <Button
                      key={unitNumber}
                      variant="outline"
                      className={`h-12 text-xs text-white ${statusConfig.bgColor} hover:opacity-80 border-0`}
                      onClick={() => handleUnitClick(tower, floor, unitNumber, status)}
                    >
                      {floor}0{unitNumber}
                    </Button>
                  );
                })}
                <div className="flex items-center justify-center text-xs text-gray-400 bg-gray-50 rounded p-2">
                  ||
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Legenda atualizada */}
          <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm">
            {Object.entries(UNIT_STATUS_CONFIG).map(([key, config]) => (
              <div key={key} className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${config.bgColor} rounded`}></div>
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showUnitModal && selectedUnit && (
        <UnitModal
          unit={selectedUnit}
          onClose={() => setShowUnitModal(false)}
          onSave={(updatedUnit) => {
            console.log('Salvando unidade:', updatedUnit);
            setShowUnitModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UnitGrid;
