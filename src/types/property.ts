
export interface PropertyLocation {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  reference?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyFormData {
  title: string;
  type: string;
  status: string;
  price: number;
  privateArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  description: string;
  location: PropertyLocation;
  images: string[];
  floorPlans: string[];
  videos: string[];
  allowBrokerLink: boolean;
  isHighlighted: boolean;
  visibility: 'publica' | 'privada';
  category: 'novos' | 'usados' | 'aluguel' | 'terceiros' | 'exclusivos';
  segment?: string;
  constructionStatus?: string;
}

export interface PropertyUnit {
  id: string;
  unitNumber: string;
  tower?: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  privateArea: number;
  price: number;
  status: 'disponivel' | 'pre-reserva' | 'reservado' | 'reserva-permanente' | 'vendido' | 'indisponivel';
  downPayment?: number;
  installments?: {
    quantity: number;
    value: number;
  };
  observations?: string;
}

export interface DevelopmentUnit {
  id: string;
  tower: string;
  floor: number;
  unitNumber: string;
  position: string;
  status: 'disponivel' | 'pre-reserva' | 'reservado' | 'reserva-permanente' | 'vendido' | 'indisponivel';
  typology: string;
  area: number;
  parking: number;
  observation: string;
  price: number;
  developmentId: string;
}

export interface PropertyDevelopment {
  id: string;
  name: string;
  type: 'torre' | 'horizontal' | 'loteamento' | 'condominio' | 'empreendimento';
  location: PropertyLocation;
  description: string;
  generalImages: string[];
  units: DevelopmentUnit[];
  company: string;
  agent: string;
  isActive: boolean;
  visibility: 'publica' | 'privada';
  category: 'novos' | 'usados' | 'aluguel' | 'terceiros' | 'exclusivos';
  allowBrokerLink: boolean;
  isHighlighted: boolean;
  segment?: string;
  constructionStatus?: string;
  finalidade?: string;
  totalArea?: number;
  propertyTypes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DevelopmentStructure {
  type: 'vertical' | 'horizontal';
  towers: number;
  floorsPerTower: number;
  unitsPerFloor: number;
  hasBasement: boolean;
  basementFloors: number;
  showEmptyFloors: boolean;
  showGroundFloor: boolean;
  blocks?: number;
  lotsPerBlock?: number;
}

export type UnitStatus = 'disponivel' | 'pre-reserva' | 'reservado' | 'reserva-permanente' | 'vendido' | 'indisponivel';

export interface UnitStatusInfo {
  label: string;
  color: string;
  bgColor: string;
}

export const UNIT_STATUS_CONFIG: Record<UnitStatus, UnitStatusInfo> = {
  'disponivel': {
    label: 'Disponível',
    color: '#2ecc71',
    bgColor: 'bg-green-500'
  },
  'pre-reserva': {
    label: 'Pré-Reserva',
    color: '#5dade2',
    bgColor: 'bg-blue-400'
  },
  'reservado': {
    label: 'Reservado',
    color: '#f1c40f',
    bgColor: 'bg-yellow-500'
  },
  'reserva-permanente': {
    label: 'Reserva Permanente',
    color: '#e67e22',
    bgColor: 'bg-orange-500'
  },
  'vendido': {
    label: 'Vendido',
    color: '#9b59b6',
    bgColor: 'bg-purple-500'
  },
  'indisponivel': {
    label: 'Indisponível',
    color: '#95a5a6',
    bgColor: 'bg-gray-500'
  }
};
