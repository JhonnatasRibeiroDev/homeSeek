import React, { useMemo } from 'react';
import { useProperty, PropertyFilters as FilterType } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

const PropertyFilters: React.FC = () => {
  const { filters, setFilters, properties } = useProperty();

  // Calcular valores disponíveis baseados nos dados existentes
  const availableValues = useMemo(() => {
    const types = [...new Set(properties.map(p => p.type))];
    const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
    const statuses = [...new Set(properties.map(p => p.status))];
    const bedrooms = [...new Set(properties.map(p => p.bedrooms))].sort((a, b) => a - b);
    const parkingSpaces = [...new Set(properties.map(p => p.parkingSpaces || 0))].sort((a, b) => a - b);
    const cities = [...new Set(properties.map(p => p.location.city))];
    
    return {
      types,
      propertyTypes,
      statuses,
      bedrooms,
      parkingSpaces,
      cities,
      minPrice: Math.min(...properties.map(p => p.price)),
      maxPrice: Math.max(...properties.map(p => p.price)),
      minArea: Math.min(...properties.map(p => p.area)),
      maxArea: Math.max(...properties.map(p => p.area))
    };
  }, [properties]);

  const handleFilterChange = (key: keyof FilterType, value: string | number | undefined) => {
    console.log('Filter change:', key, value);
    
    // Se value é undefined, null ou "all", remover o filtro
    if (value === undefined || value === null || value === "all") {
      const { [key]: removedKey, ...rest } = filters;
      setFilters(rest);
      return;
    }

    // Criar novo objeto de filtros com o valor atualizado
    const newFilters: FilterType = { ...filters };
    
    // Garantir que o valor seja do tipo correto para cada propriedade
    if (key === 'minPrice' || key === 'maxPrice' || key === 'minArea' || key === 'maxArea' || key === 'bedrooms' || key === 'parkingSpaces') {
      (newFilters as any)[key] = typeof value === 'string' ? Number(value) : value;
    } else {
      (newFilters as any)[key] = value;
    }
    
    setFilters(newFilters);
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    setFilters({});
  };

  const clearSingleFilter = (key: keyof FilterType) => {
    console.log('Clearing filter:', key);
    const { [key]: removedKey, ...rest } = filters;
    setFilters(rest);
  };

  const getTypeLabel = (type: string) => {
    return type === 'venda' ? 'Venda' : 'Aluguel';
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'apartamento': 'Apartamento',
      'casa': 'Casa',
      'terreno': 'Terreno',
      'comercial': 'Comercial',
      'loteamento': 'Loteamento',
      'condominio': 'Condomínio'
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'disponivel': 'Disponível',
      'reservado': 'Reservado',
      'vendido': 'Vendido'
    };
    return labels[status] || status;
  };

  return (
    <div className="p-4 space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        {Object.keys(filters).length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters} 
            className="text-gray-600 hover:bg-gray-100 border border-gray-300"
          >
            Limpar Todos
          </Button>
        )}
      </div>

      {/* Filtros ativos */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value === undefined || value === '') return null;
            
            const getLabel = () => {
              switch(key) {
                case 'type': return `Tipo: ${getTypeLabel(value as string)}`;
                case 'propertyType': return `Imóvel: ${getPropertyTypeLabel(value as string)}`;
                case 'minPrice': return `Min: R$${Number(value).toLocaleString('pt-BR')}`;
                case 'maxPrice': return `Max: R$${Number(value).toLocaleString('pt-BR')}`;
                case 'bedrooms': return `${value}+ quartos`;
                case 'city': return `Cidade: ${value}`;
                case 'minArea': return `Min: ${value}m²`;
                case 'maxArea': return `Max: ${value}m²`;
                case 'status': return `Status: ${getStatusLabel(value as string)}`;
                case 'parkingSpaces': return `${value}+ vagas`;
                default: return `${key}: ${value}`;
              }
            };

            return (
              <div 
                key={key} 
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                {getLabel()}
                <button 
                  onClick={() => clearSingleFilter(key as keyof FilterType)} 
                  className="ml-1 bg-blue-100 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tipo de transação */}
      {availableValues.types.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de transação</label>
          <Select value={filters.type || "all"} onValueChange={(value) => handleFilterChange('type', value === "all" ? undefined : value)}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Todos</SelectItem>
              {availableValues.types.map(type => (
                <SelectItem key={type} value={type}>{getTypeLabel(type)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Tipo de propriedade */}
      {availableValues.propertyTypes.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de imóvel</label>
          <Select value={filters.propertyType || "all"} onValueChange={(value) => handleFilterChange('propertyType', value === "all" ? undefined : value)}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Todos</SelectItem>
              {availableValues.propertyTypes.map(type => (
                <SelectItem key={type} value={type}>{getPropertyTypeLabel(type)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Status */}
      {availableValues.statuses.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Select value={filters.status || "all"} onValueChange={(value) => handleFilterChange('status', value === "all" ? undefined : value)}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Todos</SelectItem>
              {availableValues.statuses.map(status => (
                <SelectItem key={status} value={status}>{getStatusLabel(status)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Preço */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Preço (R${availableValues.minPrice.toLocaleString('pt-BR')} - R${availableValues.maxPrice.toLocaleString('pt-BR')})
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={`Mín (${availableValues.minPrice.toLocaleString('pt-BR')})`}
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="input-modern"
          />
          <Input
            type="number"
            placeholder={`Máx (${availableValues.maxPrice.toLocaleString('pt-BR')})`}
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="input-modern"
          />
        </div>
      </div>

      {/* Metragem */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Metragem ({availableValues.minArea}m² - {availableValues.maxArea}m²)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={`Mín (${availableValues.minArea}m²)`}
            value={filters.minArea || ''}
            onChange={(e) => handleFilterChange('minArea', e.target.value ? Number(e.target.value) : undefined)}
            className="input-modern"
          />
          <Input
            type="number"
            placeholder={`Máx (${availableValues.maxArea}m²)`}
            value={filters.maxArea || ''}
            onChange={(e) => handleFilterChange('maxArea', e.target.value ? Number(e.target.value) : undefined)}
            className="input-modern"
          />
        </div>
      </div>

      {/* Dormitórios */}
      {availableValues.bedrooms.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Dormitórios</label>
          <Select value={filters.bedrooms?.toString() || "all"} onValueChange={(value) => handleFilterChange('bedrooms', value === "all" ? undefined : Number(value))}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Qualquer</SelectItem>
              {availableValues.bedrooms.map(bedroom => (
                <SelectItem key={bedroom} value={bedroom.toString()}>{bedroom}+ quartos</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Vagas de garagem */}
      {availableValues.parkingSpaces.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vagas de garagem</label>
          <Select value={filters.parkingSpaces?.toString() || "all"} onValueChange={(value) => handleFilterChange('parkingSpaces', value === "all" ? undefined : Number(value))}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Qualquer</SelectItem>
              {availableValues.parkingSpaces.filter(spaces => spaces > 0).map(spaces => (
                <SelectItem key={spaces} value={spaces.toString()}>{spaces}+ vagas</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Localização */}
      {availableValues.cities.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Cidade</label>
          <Select value={filters.city || "all"} onValueChange={(value) => handleFilterChange('city', value === "all" ? undefined : value)}>
            <SelectTrigger className="select-modern">
              <SelectValue placeholder="Todas as cidades" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all">Todas as cidades</SelectItem>
              {availableValues.cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
