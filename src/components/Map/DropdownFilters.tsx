
import React, { useState } from 'react';
import { useProperty, PropertyFilters as FilterType } from '@/contexts/PropertyContext';
import { ChevronDown, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

const DropdownFilters: React.FC = () => {
  const { filters, setFilters } = useProperty();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterChange = (key: keyof FilterType, value: string | number | boolean) => {
    const newFilters = { ...filters };
    
    if (key === 'bedrooms' || key === 'parkingSpaces') {
      if (value === false) {
        delete newFilters[key];
      } else {
        newFilters[key] = Number(value);
      }
    } else if (key === 'minPrice' || key === 'maxPrice') {
      if (value === false) {
        delete newFilters[key];
      } else {
        newFilters[key] = Number(value);
      }
    } else if (key === 'minArea' || key === 'maxArea') {
      if (value === false) {
        delete newFilters[key];
      } else {
        newFilters[key] = Number(value);
      }
    } else {
      if (value === false) {
        delete newFilters[key];
      } else {
        (newFilters as any)[key] = value;
      }
    }
    
    setFilters(newFilters);
  };

  const isChecked = (key: keyof FilterType, value: string | number) => {
    return filters[key] === value;
  };

  const getFilterCount = (filterGroup: string) => {
    switch(filterGroup) {
      case 'propertyType':
        return filters.propertyType ? 1 : 0;
      case 'characteristics':
        let count = 0;
        if (filters.bedrooms) count++;
        if (filters.parkingSpaces) count++;
        return count;
      case 'price':
        return (filters.minPrice || filters.maxPrice) ? 1 : 0;
      case 'area':
        return (filters.minArea || filters.maxArea) ? 1 : 0;
      case 'delivery':
        return filters.deliveryDate ? 1 : 0;
      default:
        return 0;
    }
  };

  const clearFilter = (filterGroup: string) => {
    const newFilters = { ...filters };
    
    switch(filterGroup) {
      case 'propertyType':
        delete newFilters.propertyType;
        break;
      case 'characteristics':
        delete newFilters.bedrooms;
        delete newFilters.parkingSpaces;
        break;
      case 'price':
        delete newFilters.minPrice;
        delete newFilters.maxPrice;
        break;
      case 'area':
        delete newFilters.minArea;
        delete newFilters.maxArea;
        break;
      case 'delivery':
        delete newFilters.deliveryDate;
        break;
    }
    
    setFilters(newFilters);
  };

  const FilterButton = ({ label, filterGroup, children }: { 
    label: string; 
    filterGroup: string; 
    children: React.ReactNode; 
  }) => {
    const count = getFilterCount(filterGroup);
    const isOpen = openDropdown === filterGroup;
    
    return (
      <Popover open={isOpen} onOpenChange={(open) => setOpenDropdown(open ? filterGroup : null)}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium min-w-0">
            <span className="whitespace-nowrap">{label}</span>
            {count > 0 && (
              <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {count}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{label}</h3>
              {count > 0 && (
                <button
                  onClick={() => clearFilter(filterGroup)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              {children}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Tipo de imóvel */}
      <FilterButton label="Tipo de imóvel" filterGroup="propertyType">
        {['apartamento', 'casa', 'terreno'].map((type) => (
          <label key={type} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <Checkbox 
              checked={isChecked('propertyType', type)}
              onCheckedChange={(checked) => handleFilterChange('propertyType', checked ? type : false)}
            />
            <span className="text-gray-700">
              {type === 'apartamento' ? 'Apartamento' : type === 'casa' ? 'Casa' : 'Terreno'}
            </span>
          </label>
        ))}
      </FilterButton>

      {/* Características */}
      <FilterButton label="Características" filterGroup="characteristics">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Quartos</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <label key={`quartos-${num}`} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <Checkbox 
                    checked={isChecked('bedrooms', num)}
                    onCheckedChange={(checked) => handleFilterChange('bedrooms', checked ? num : false)}
                  />
                  <span className="text-gray-700 text-sm">{num}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Vagas</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <label key={`vagas-${num}`} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <Checkbox 
                    checked={isChecked('parkingSpaces', num)}
                    onCheckedChange={(checked) => handleFilterChange('parkingSpaces', checked ? num : false)}
                  />
                  <span className="text-gray-700 text-sm">{num}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterButton>

      {/* Preço */}
      <FilterButton label="Preço" filterGroup="price">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Preço máximo</p>
            <div className="space-y-2">
              {[
                { label: 'Até R$ 100 mil', value: 100000 },
                { label: 'Até R$ 300 mil', value: 300000 },
                { label: 'Até R$ 500 mil', value: 500000 },
                { label: 'Até R$ 750 mil', value: 750000 },
                { label: 'Até R$ 1 milhão', value: 1000000 }
              ].map((price) => (
                <label key={`preco-${price.value}`} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <Checkbox 
                    checked={isChecked('maxPrice', price.value)}
                    onCheckedChange={(checked) => handleFilterChange('maxPrice', checked ? price.value : false)}
                  />
                  <span className="text-gray-700 text-sm">{price.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterButton>

      {/* Metragem */}
      <FilterButton label="Metragem" filterGroup="area">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Área mínima</p>
            <div className="space-y-2">
              {[
                { label: 'A partir de 50m²', value: 50 },
                { label: 'A partir de 80m²', value: 80 },
                { label: 'A partir de 100m²', value: 100 },
                { label: 'A partir de 150m²', value: 150 }
              ].map((area) => (
                <label key={`area-${area.value}`} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <Checkbox 
                    checked={isChecked('minArea', area.value)}
                    onCheckedChange={(checked) => handleFilterChange('minArea', checked ? area.value : false)}
                  />
                  <span className="text-gray-700 text-sm">{area.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FilterButton>

      {/* Data de entrega */}
      <FilterButton label="Data de entrega" filterGroup="delivery">
        <div className="space-y-2">
          {[
            { label: '2024', value: new Date('2024-12-31') },
            { label: '2025', value: new Date('2025-12-31') },
            { label: '2026', value: new Date('2026-12-31') }
          ].map((delivery) => (
            <label key={`delivery-${delivery.label}`} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox 
                checked={filters.deliveryDate !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange('deliveryDate', delivery.value as any);
                  } else {
                    const { deliveryDate, ...rest } = filters;
                    setFilters(rest);
                  }
                }}
              />
              <span className="text-gray-700 text-sm">{delivery.label}</span>
            </label>
          ))}
        </div>
      </FilterButton>
    </div>
  );
};

export default DropdownFilters;
