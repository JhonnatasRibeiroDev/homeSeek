
import React from 'react';
import { useProperty, PropertyFilters as FilterType } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, MapPin } from 'lucide-react';

const TopFilters: React.FC = () => {
  const { filters, setFilters, properties } = useProperty();

  // Calcular valores disponíveis baseados nos dados existentes
  const availableValues = React.useMemo(() => {
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
    if (value === undefined || value === null || value === "all") {
      const { [key]: removedKey, ...rest } = filters;
      setFilters(rest);
      return;
    }

    const newFilters: FilterType = { ...filters };
    
    if (key === 'minPrice' || key === 'maxPrice' || key === 'minArea' || key === 'maxArea' || key === 'bedrooms' || key === 'parkingSpaces') {
      (newFilters as any)[key] = typeof value === 'string' ? Number(value) : value;
    } else {
      (newFilters as any)[key] = value;
    }
    
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearSingleFilter = (key: keyof FilterType) => {
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
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Filtros ativos */}
        {Object.keys(filters).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="text-gray-600 hover:bg-gray-100 border border-gray-300"
            >
              Limpar Todos
            </Button>
          </div>
        )}

        {/* Filtros principais em linha horizontal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {/* Localização */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
              <MapPin size={12} />
              Cidade
            </label>
            <Select value={filters.city || "all"} onValueChange={(value) => handleFilterChange('city', value === "all" ? undefined : value)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Todas as cidades</SelectItem>
                {availableValues.cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de transação */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tipo</label>
            <Select value={filters.type || "all"} onValueChange={(value) => handleFilterChange('type', value === "all" ? undefined : value)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Todos</SelectItem>
                {availableValues.types.map(type => (
                  <SelectItem key={type} value={type}>{getTypeLabel(type)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de imóvel */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Imóvel</label>
            <Select value={filters.propertyType || "all"} onValueChange={(value) => handleFilterChange('propertyType', value === "all" ? undefined : value)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Todos</SelectItem>
                {availableValues.propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>{getPropertyTypeLabel(type)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quartos */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Quartos</label>
            <Select value={filters.bedrooms?.toString() || "all"} onValueChange={(value) => handleFilterChange('bedrooms', value === "all" ? undefined : Number(value))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Qualquer</SelectItem>
                {availableValues.bedrooms.map(bedroom => (
                  <SelectItem key={bedroom} value={bedroom.toString()}>{bedroom}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vagas */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vagas</label>
            <Select value={filters.parkingSpaces?.toString() || "all"} onValueChange={(value) => handleFilterChange('parkingSpaces', value === "all" ? undefined : Number(value))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Qualquer</SelectItem>
                {availableValues.parkingSpaces.filter(spaces => spaces > 0).map(spaces => (
                  <SelectItem key={spaces} value={spaces.toString()}>{spaces}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preço Mín */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Preço Min</label>
            <Select value={filters.minPrice?.toString() || "all"} onValueChange={(value) => handleFilterChange('minPrice', value === "all" ? undefined : Number(value))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Mínimo" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="100000">R$ 100k</SelectItem>
                <SelectItem value="300000">R$ 300k</SelectItem>
                <SelectItem value="500000">R$ 500k</SelectItem>
                <SelectItem value="750000">R$ 750k</SelectItem>
                <SelectItem value="1000000">R$ 1M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preço Máx */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Preço Max</label>
            <Select value={filters.maxPrice?.toString() || "all"} onValueChange={(value) => handleFilterChange('maxPrice', value === "all" ? undefined : Number(value))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Máximo" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Qualquer</SelectItem>
                <SelectItem value="500000">R$ 500k</SelectItem>
                <SelectItem value="750000">R$ 750k</SelectItem>
                <SelectItem value="1000000">R$ 1M</SelectItem>
                <SelectItem value="1500000">R$ 1.5M</SelectItem>
                <SelectItem value="2000000">R$ 2M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Status</label>
            <Select value={filters.status || "all"} onValueChange={(value) => handleFilterChange('status', value === "all" ? undefined : value)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">Todos</SelectItem>
                {availableValues.statuses.map(status => (
                  <SelectItem key={status} value={status}>{getStatusLabel(status)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFilters;
