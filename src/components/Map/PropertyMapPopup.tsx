
import React from 'react';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, Bed, Bath, Car, Square } from 'lucide-react';

interface PropertyMapPopupProps {
  propertyId: string;
  onClose: () => void;
}

const PropertyMapPopup: React.FC<PropertyMapPopupProps> = ({ propertyId, onClose }) => {
  const { getPropertyById } = useProperty();
  const property = getPropertyById(propertyId);

  if (!property) return null;

  return (
    <div className="absolute top-4 right-4 w-96 bg-white rounded-lg border border-gray-200 shadow-xl z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={16} />
        </button>
        
        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-semibold text-lg">{property.title}</h3>
          <div className={`px-2 py-1 rounded text-xs text-white ${
            property.status === 'disponivel' ? 'bg-green-600' :
            property.status === 'reservado' ? 'bg-yellow-600' : 'bg-gray-600'
          }`}>
            {property.status === 'disponivel' ? 'Disponível' :
             property.status === 'reservado' ? 'Reservado' : 'Vendido'}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <strong className="text-gray-900">Endereço:</strong><br />
          {property.location.address}<br />
          {property.location.neighborhood}, {property.location.city} – {property.location.state}
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div className="flex items-center">
            <Bed size={14} className="mr-2 text-blue-600" />
            <span>Quartos: {property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath size={14} className="mr-2 text-blue-600" />
            <span>Suíte: {property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Car size={14} className="mr-2 text-gray-600" />
            <span>Vaga: {property.parkingSpaces || 1}</span>
          </div>
          <div className="flex items-center">
            <Square size={14} className="mr-2 text-green-600" />
            <span>Área: {property.area}m²</span>
          </div>
        </div>
        
        <div className="text-blue-600 font-bold text-xl mb-4">
          Valor inicial: R$ {property.price.toLocaleString('pt-BR')}
        </div>
        
        <Link to={`/imovel/${property.id}`}>
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Ver mais detalhes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyMapPopup;
