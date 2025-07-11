import React, { createContext, useContext, useState, useMemo } from 'react';

export interface PropertyAgent {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'venda' | 'aluguel';
  propertyType: 'apartamento' | 'casa' | 'terreno' | 'comercial' | 'loteamento' | 'condominio';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpaces?: number;
  location: {
    address: string;
    city: string;
    state: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  images: string[];
  floorPlan?: string;
  features: string[];
  company: string;
  agent: string;
  agents?: PropertyAgent[];
  status: 'disponivel' | 'reservado' | 'vendido';
  isHighlighted: boolean;
  workProgress?: number;
  deliveryDate?: Date;
  createdAt: Date;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, property: Omit<Property, 'id' | 'createdAt'>) => void;
  getPropertyById: (id: string) => Property | undefined;
  addAgentToProperty: (propertyId: string, agentId: string) => void;
}

export interface PropertyFilters {
  type?: 'venda' | 'aluguel';
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  minArea?: number;
  maxArea?: number;
  status?: 'disponivel' | 'reservado' | 'vendido';
  parkingSpaces?: number;
  deliveryDate?: Date;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([
    // Imóveis em Mutum - MT com fotos reais
    {
      id: '1',
      title: 'Residencial Águas Claras',
      description: 'Apartamento moderno com vista privilegiada em localização central de Mutum',
      price: 485000,
      type: 'venda',
      propertyType: 'apartamento',
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      parkingSpaces: 2,
      location: {
        address: 'Rua das Palmeiras, 890',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'Centro',
        lat: -15.1217,
        lng: -58.0036
      },
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617104678533-b5eaadcdf899?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      features: ['Piscina', 'Academia', 'Sacada Gourmet', 'Elevador', 'Portaria 24h', 'Playground'],
      company: 'Construtora Atlântico',
      agent: 'Marina Silva',
      agents: [
        {
          id: '2',
          name: 'Maria Santos',
          company: 'Imobiliária Prime',
          phone: '(65) 99999-0002',
          email: 'maria@homeseek.com',
          isActive: true
        },
        {
          id: '7',
          name: 'Fernando Corretor',
          company: 'Corretora Premium',
          phone: '(65) 99999-0007',
          email: 'fernando@homeseek.com',
          isActive: true
        }
      ],
      status: 'disponivel',
      isHighlighted: true,
      workProgress: 85,
      deliveryDate: new Date('2025-08-01'),
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Ilha dos Açores II – Pré-lançamento',
      description: 'Lançamento exclusivo com acabamento premium no centro de Mutum',
      price: 320000,
      type: 'venda',
      propertyType: 'apartamento',
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      parkingSpaces: 1,
      location: {
        address: 'Rua 410 Nº 639',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'São José',
        lat: -15.1250,
        lng: -58.0100
      },
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617104678533-b5eaadcdf899?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566908829473-0f071eb2b61b?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1584952461963-d4a04e15c92d?w=600&h=400&fit=crop',
      features: ['Piscina', 'Churrasqueira', 'Playground', 'Salão de Festas'],
      company: 'Grupo Incorporador SC',
      agent: 'Patricia Incorporadora',
      agents: [
        {
          id: '2',
          name: 'Maria Santos',
          company: 'Imobiliária Prime',
          phone: '(65) 99999-0002',
          email: 'maria@homeseek.com',
          isActive: true
        }
      ],
      status: 'disponivel',
      isHighlighted: false,
      workProgress: 45,
      deliveryDate: new Date('2025-12-01'),
      createdAt: new Date('2024-02-01')
    },
    {
      id: '3',
      title: 'Residencial Torre Privilege',
      description: 'Alto padrão com vista panorâmica da cidade de Mutum',
      price: 750000,
      type: 'venda',
      propertyType: 'apartamento',
      bedrooms: 4,
      bathrooms: 3,
      area: 120,
      parkingSpaces: 2,
      location: {
        address: 'Rua Copacabana, 150',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'Centro',
        lat: -15.1200,
        lng: -58.0020
      },
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop',
      features: ['SPA', 'Wine Bar', 'Rooftop', 'Concierge', 'Piscina Infinita'],
      company: 'Construtora Oceano',
      agent: 'Patricia Costa',
      status: 'disponivel',
      isHighlighted: true,
      workProgress: 70,
      deliveryDate: new Date('2025-10-01'),
      createdAt: new Date('2024-01-20')
    },
    {
      id: '4',
      title: 'Casa Térrea Jardim Europa',
      description: 'Casa familiar em condomínio fechado com amplo jardim em Mutum',
      price: 580000,
      type: 'venda',
      propertyType: 'casa',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      parkingSpaces: 2,
      location: {
        address: 'Rua das Flores, 445',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'Jardim Europa',
        lat: -15.1280,
        lng: -58.0080
      },
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      features: ['Piscina', 'Jardim', 'Churrasqueira', 'Garagem Coberta'],
      company: 'Imobiliária Prime',
      agent: 'Roberto Alves',
      status: 'disponivel',
      isHighlighted: false,
      createdAt: new Date('2024-02-10')
    },
    {
      id: '5',
      title: 'Apartamento Vista Vale',
      description: 'Vista privilegiada com móveis planejados em Mutum',
      price: 3500,
      type: 'aluguel',
      propertyType: 'apartamento',
      bedrooms: 2,
      bathrooms: 1,
      area: 70,
      parkingSpaces: 1,
      location: {
        address: 'Av. Central, 1200',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'Vila Nova',
        lat: -15.1180,
        lng: -58.0060
      },
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566908829473-0f071eb2b61b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop',
      features: ['Mobiliado', 'Vista Vale', 'Ar Condicionado', 'Internet'],
      company: 'Imobiliária Litoral',
      agent: 'Ana Carolina',
      status: 'disponivel',
      isHighlighted: false,
      createdAt: new Date('2024-02-05')
    },
    {
      id: '6',
      title: 'Cobertura Duplex Premium',
      description: 'Cobertura exclusiva com terraço e jacuzzi em Mutum',
      price: 950000,
      type: 'venda',
      propertyType: 'apartamento',
      bedrooms: 4,
      bathrooms: 4,
      area: 200,
      parkingSpaces: 3,
      location: {
        address: 'Rua Beira Rio, 88',
        city: 'Mutum',
        state: 'MT',
        neighborhood: 'Centro',
        lat: -15.1230,
        lng: -58.0040
      },
      images: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600563438938-a42d0164d41e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
      ],
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      features: ['Jacuzzi', 'Terraço', 'Lareira', 'Home Theater', 'Adega'],
      company: 'Imobiliária Exclusive',
      agent: 'Fernando Santos',
      status: 'reservado',
      isHighlighted: true,
      createdAt: new Date('2024-01-25')
    }
  ]);

  const [filters, setFilters] = useState<PropertyFilters>({});

  // Usar useMemo para otimizar o cálculo dos filtros
  const filteredProperties = useMemo(() => {
    console.log('Filtering properties with filters:', filters);
    console.log('Total properties:', properties.length);
    
    const filtered = properties.filter(property => {
      // Verificar cada filtro individualmente
      if (filters.type && property.type !== filters.type) {
        console.log(`Property ${property.id} filtered out by type: ${property.type} !== ${filters.type}`);
        return false;
      }
      
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        console.log(`Property ${property.id} filtered out by propertyType: ${property.propertyType} !== ${filters.propertyType}`);
        return false;
      }
      
      if (filters.minPrice !== undefined && property.price < filters.minPrice) {
        console.log(`Property ${property.id} filtered out by minPrice: ${property.price} < ${filters.minPrice}`);
        return false;
      }
      
      if (filters.maxPrice !== undefined && property.price > filters.maxPrice) {
        console.log(`Property ${property.id} filtered out by maxPrice: ${property.price} > ${filters.maxPrice}`);
        return false;
      }
      
      if (filters.bedrooms !== undefined && property.bedrooms < filters.bedrooms) {
        console.log(`Property ${property.id} filtered out by bedrooms: ${property.bedrooms} < ${filters.bedrooms}`);
        return false;
      }
      
      if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) {
        console.log(`Property ${property.id} filtered out by city: ${property.location.city} doesn't include ${filters.city}`);
        return false;
      }
      
      if (filters.minArea !== undefined && property.area < filters.minArea) {
        console.log(`Property ${property.id} filtered out by minArea: ${property.area} < ${filters.minArea}`);
        return false;
      }
      
      if (filters.maxArea !== undefined && property.area > filters.maxArea) {
        console.log(`Property ${property.id} filtered out by maxArea: ${property.area} > ${filters.maxArea}`);
        return false;
      }
      
      if (filters.status && property.status !== filters.status) {
        console.log(`Property ${property.id} filtered out by status: ${property.status} !== ${filters.status}`);
        return false;
      }
      
      if (filters.parkingSpaces !== undefined && (property.parkingSpaces || 0) < filters.parkingSpaces) {
        console.log(`Property ${property.id} filtered out by parkingSpaces: ${property.parkingSpaces || 0} < ${filters.parkingSpaces}`);
        return false;
      }
      
      return true;
    });
    
    console.log('Filtered properties:', filtered.length);
    return filtered;
  }, [properties, filters]);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProperties(prev => [...prev, newProperty]);
    console.log('Imóvel adicionado:', newProperty);
  };

  const updateProperty = (id: string, propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    setProperties(prev => prev.map(property => 
      property.id === id 
        ? { ...propertyData, id, createdAt: property.createdAt }
        : property
    ));
    console.log('Imóvel atualizado:', id);
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const addAgentToProperty = (propertyId: string, agentId: string) => {
    setProperties(prev => prev.map(property => {
      if (property.id === propertyId) {
        const mockAgent: PropertyAgent = {
          id: agentId,
          name: 'Novo Corretor',
          company: 'Imobiliária Nova',
          phone: '(65) 99999-9999',
          email: 'novo@corretor.com',
          isActive: true
        };
        
        return {
          ...property,
          agents: [...(property.agents || []), mockAgent]
        };
      }
      return property;
    }));
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      setFilters,
      addProperty,
      updateProperty,
      getPropertyById,
      addAgentToProperty
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
