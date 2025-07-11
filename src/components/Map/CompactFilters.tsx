
import React from 'react';
import { useProperty, PropertyFilters as FilterType } from '@/contexts/PropertyContext';
import { Checkbox } from '@/components/ui/checkbox';

const CompactFilters: React.FC = () => {
  const { filters, setFilters } = useProperty();

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

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-4">
        {/* Tipo de Imóvel */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Tipo de imóvel</span>
          <div className="flex gap-1">
            {['apartamento', 'casa', 'terreno'].map((type) => (
              <label key={type} className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  checked={isChecked('propertyType', type)}
                  onCheckedChange={(checked) => handleFilterChange('propertyType', checked ? type : false)}
                />
                {type === 'apartamento' ? 'Apartamento' : type === 'casa' ? 'Casa' : 'Terreno'}
              </label>
            ))}
          </div>
        </div>

        {/* Características */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Características</span>
          <div className="flex gap-1">
            {/* Quartos */}
            {[1, 2, 3, 4].map((num) => (
              <label key={`quartos-${num}`} className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  checked={isChecked('bedrooms', num)}
                  onCheckedChange={(checked) => handleFilterChange('bedrooms', checked ? num : false)}
                />
                {num}
              </label>
            ))}
            <span className="text-xs text-gray-500 mx-1">Quartos</span>
            
            {/* Vagas */}
            {[1, 2, 3].map((num) => (
              <label key={`vagas-${num}`} className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  checked={isChecked('parkingSpaces', num)}
                  onCheckedChange={(checked) => handleFilterChange('parkingSpaces', checked ? num : false)}
                />
                {num}
              </label>
            ))}
            <span className="text-xs text-gray-500 mx-1">Vagas</span>
          </div>
        </div>

        {/* Preço */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Preço</span>
          <div className="flex gap-1">
            {[
              { label: '100k', value: 100000 },
              { label: '300k', value: 300000 },
              { label: '500k', value: 500000 },
              { label: '750k', value: 750000 },
              { label: '1M', value: 1000000 }
            ].map((price) => (
              <label key={`preco-${price.value}`} className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  checked={isChecked('maxPrice', price.value)}
                  onCheckedChange={(checked) => handleFilterChange('maxPrice', checked ? price.value : false)}
                />
                {price.label}
              </label>
            ))}
          </div>
        </div>

        {/* Metragem */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Metragem</span>
          <div className="flex gap-1">
            {[
              { label: '50m²', value: 50 },
              { label: '80m²', value: 80 },
              { label: '100m²', value: 100 },
              { label: '150m²', value: 150 }
            ].map((area) => (
              <label key={`area-${area.value}`} className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  checked={isChecked('minArea', area.value)}
                  onCheckedChange={(checked) => handleFilterChange('minArea', checked ? area.value : false)}
                />
                {area.label}+
              </label>
            ))}
          </div>
        </div>

        {/* Data de Entrega */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Data de entrega</span>
          <div className="flex gap-1">
            <label className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer hover:bg-gray-50">
              <Checkbox 
                checked={filters.deliveryDate !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange('deliveryDate', new Date('2025-12-31') as any);
                  } else {
                    const { deliveryDate, ...rest } = filters;
                    setFilters(rest);
                  }
                }}
              />
              2025
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactFilters;
