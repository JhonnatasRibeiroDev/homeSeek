
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UNIT_STATUS_CONFIG, DevelopmentUnit, UnitStatus } from '@/types/property';
import { Building2, Filter, MessageCircle, Phone } from 'lucide-react';

interface PublicUnitsViewProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  units: DevelopmentUnit[];
}

interface UnitFilters {
  tower: string;
  floor: string;
  status: string;
  typology: string;
  minPrice: string;
  maxPrice: string;
}

const PublicUnitsView: React.FC<PublicUnitsViewProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  units
}) => {
  const [selectedUnit, setSelectedUnit] = useState<DevelopmentUnit | null>(null);
  const [showUnitDetails, setShowUnitDetails] = useState(false);
  const [filters, setFilters] = useState<UnitFilters>({
    tower: '',
    floor: '',
    status: '',
    typology: '',
    minPrice: '',
    maxPrice: ''
  });

  // Mock data para demonstração quando não há unidades
  const mockUnits: DevelopmentUnit[] = useMemo(() => {
    if (units && units.length > 0) return units;
    
    const generatedUnits: DevelopmentUnit[] = [];
    const towers = ['A', 'B'];
    const floors = Array.from({ length: 9 }, (_, i) => 9 - i);
    const unitsPerFloor = 6;

    towers.forEach(tower => {
      floors.forEach(floor => {
        Array.from({ length: unitsPerFloor }, (_, unitIndex) => {
          const unitNumber = unitIndex + 1;
          const random = Math.random();
          let status: UnitStatus = 'disponivel';
          
          if (random < 0.4) status = 'disponivel';
          else if (random < 0.5) status = 'pre-reserva';
          else if (random < 0.65) status = 'reservado';
          else if (random < 0.75) status = 'reserva-permanente';
          else if (random < 0.9) status = 'vendido';
          else status = 'indisponivel';

          generatedUnits.push({
            id: `${tower}-${floor}-${unitNumber}`,
            tower,
            floor,
            unitNumber: `${floor}0${unitNumber}`,
            position: `${unitNumber}`,
            status,
            typology: unitNumber <= 2 ? '2 Quartos' : '3 Quartos',
            area: unitNumber <= 2 ? 65 : 85,
            parking: unitNumber <= 2 ? 1 : 2,
            price: unitNumber <= 2 ? 450000 : 550000,
            observation: 'Unidade padrão com excelente vista',
            developmentId: 'dev-1'
          });
        });
      });
    });

    return generatedUnits;
  }, [units]);

  // Filtrar unidades
  const filteredUnits = useMemo(() => {
    return mockUnits.filter(unit => {
      if (filters.tower && unit.tower !== filters.tower) return false;
      if (filters.floor && unit.floor.toString() !== filters.floor) return false;
      if (filters.status && unit.status !== filters.status) return false;
      if (filters.typology && !unit.typology.toLowerCase().includes(filters.typology.toLowerCase())) return false;
      if (filters.minPrice && unit.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && unit.price > parseInt(filters.maxPrice)) return false;
      return true;
    });
  }, [mockUnits, filters]);

  // Organizar unidades por torre e andar
  const unitsByTowerAndFloor = useMemo(() => {
    const organized: { [tower: string]: { [floor: number]: DevelopmentUnit[] } } = {};
    
    filteredUnits.forEach(unit => {
      if (!organized[unit.tower]) organized[unit.tower] = {};
      if (!organized[unit.tower][unit.floor]) organized[unit.tower][unit.floor] = [];
      organized[unit.tower][unit.floor].push(unit);
    });

    return organized;
  }, [filteredUnits]);

  const handleUnitClick = (unit: DevelopmentUnit) => {
    setSelectedUnit(unit);
    setShowUnitDetails(true);
  };

  const clearFilters = () => {
    setFilters({
      tower: '',
      floor: '',
      status: '',
      typology: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  const towers = [...new Set(mockUnits.map(unit => unit.tower))].sort();
  const floors = [...new Set(mockUnits.map(unit => unit.floor))].sort((a, b) => b - a);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Unidades Disponíveis - {propertyTitle}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 overflow-y-auto max-h-[80vh]">
            {/* Filtros */}
            <div className="bg-gray-50 p-4 rounded-lg sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
              
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <Label className="text-xs">Torre</Label>
                  <Select value={filters.tower} onValueChange={(value) => setFilters(prev => ({ ...prev, tower: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas</SelectItem>
                      {towers.map(tower => (
                        <SelectItem key={tower} value={tower}>Torre {tower}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs">Andar</Label>
                  <Select value={filters.floor} onValueChange={(value) => setFilters(prev => ({ ...prev, floor: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      {floors.map(floor => (
                        <SelectItem key={floor} value={floor.toString()}>{floor}º Andar</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      {Object.entries(UNIT_STATUS_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs">Tipologia</Label>
                  <Select value={filters.typology} onValueChange={(value) => setFilters(prev => ({ ...prev, typology: value }))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas</SelectItem>
                      <SelectItem value="2">2 Quartos</SelectItem>
                      <SelectItem value="3">3 Quartos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs">Valor Mín.</Label>
                  <Input 
                    className="h-8" 
                    placeholder="R$ 0" 
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label className="text-xs">Valor Máx.</Label>
                  <Input 
                    className="h-8" 
                    placeholder="R$ 999.999" 
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Espelho de Unidades */}
            <TooltipProvider>
              <div className="space-y-8">
                {Object.entries(unitsByTowerAndFloor).map(([tower, floorData]) => (
                  <div key={tower} className="border rounded-lg p-6 bg-white">
                    <h3 className="text-lg font-semibold mb-4 text-center">Torre {tower}</h3>
                    
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-8 gap-2 min-w-max">
                        <div className="text-center font-medium text-sm text-gray-600 p-2">Andar</div>
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className="text-center font-medium text-sm text-gray-600 p-2">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                        ))}
                        <div className="text-center font-medium text-sm text-gray-600 p-2">Corredor</div>

                        {Object.keys(floorData)
                          .map(Number)
                          .sort((a, b) => b - a)
                          .map((floor) => (
                          <React.Fragment key={floor}>
                            <div className="flex items-center justify-center font-medium text-sm bg-gray-100 rounded p-2">
                              {floor}º
                            </div>
                            {Array.from({ length: 6 }, (_, unitIndex) => {
                              const unitNumber = unitIndex + 1;
                              const unit = floorData[floor]?.find(u => 
                                parseInt(u.position) === unitNumber
                              );
                              
                              if (!unit) {
                                return (
                                  <div key={unitNumber} className="h-12 bg-gray-100 rounded border-2 border-gray-200 opacity-50"></div>
                                );
                              }

                              const statusConfig = UNIT_STATUS_CONFIG[unit.status];
                              
                              return (
                                <Tooltip key={unitNumber}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={`h-12 text-xs text-white ${statusConfig.bgColor} hover:opacity-80 border-0 cursor-pointer`}
                                      onClick={() => handleUnitClick(unit)}
                                    >
                                      {unit.unitNumber}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-gray-900 text-white p-3">
                                    <div className="space-y-1 text-sm">
                                      <div className="font-semibold">Torre {unit.tower}, {unit.floor}º Andar</div>
                                      <div>{unit.typology} • {unit.area}m²</div>
                                      <div className="text-green-400">R$ {unit.price.toLocaleString('pt-BR')}</div>
                                      <div className="text-yellow-400">{statusConfig.label}</div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              );
                            })}
                            <div className="flex items-center justify-center text-xs text-gray-400 bg-gray-50 rounded p-2">
                              ||
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>

            {/* Legenda Fixa */}
            <div className="bg-gray-50 p-4 rounded-lg sticky bottom-0 z-10">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Legenda de Status</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(UNIT_STATUS_CONFIG).map(([key, config]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 ${config.bgColor} rounded`}></div>
                    <span className="text-sm text-gray-600">{config.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes da Unidade */}
      {showUnitDetails && selectedUnit && (
        <Dialog open={showUnitDetails} onOpenChange={setShowUnitDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Unidade {selectedUnit.unitNumber} - Torre {selectedUnit.tower}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Andar:</span>
                  <span className="ml-2 text-gray-900">{selectedUnit.floor}º</span>
                </div>
                <div>
                  <span className="text-gray-500">Posição:</span>
                  <span className="ml-2 text-gray-900">{selectedUnit.position}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tipologia:</span>
                  <span className="ml-2 text-gray-900">{selectedUnit.typology}</span>
                </div>
                <div>
                  <span className="text-gray-500">Área:</span>
                  <span className="ml-2 text-gray-900">{selectedUnit.area}m²</span>
                </div>
                <div>
                  <span className="text-gray-500">Vagas:</span>
                  <span className="ml-2 text-gray-900">{selectedUnit.parking}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full text-white ${UNIT_STATUS_CONFIG[selectedUnit.status].bgColor}`}>
                    {UNIT_STATUS_CONFIG[selectedUnit.status].label}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-2xl font-bold text-green-600">
                  R$ {selectedUnit.price.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-gray-500">Valor da unidade</div>
              </div>
              
              {selectedUnit.observation && (
                <div>
                  <span className="text-gray-500 text-sm">Observações:</span>
                  <p className="text-gray-900 text-sm mt-1">{selectedUnit.observation}</p>
                </div>
              )}
              
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Entrar em Contato
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PublicUnitsView;
