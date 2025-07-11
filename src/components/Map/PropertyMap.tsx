
import React, { useState } from 'react';
import { MapPin, List, Grid, X } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '../Property/PropertyCard';
import PropertyMapPopup from './PropertyMapPopup';
import DropdownFilters from './DropdownFilters';
import { Button } from '@/components/ui/button';

const PropertyMap: React.FC = () => {
  const { filteredProperties } = useProperty();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header with controls */}
      <div className="bg-white border-b border-gray-200 p-4 z-20 relative shadow-sm">
        <div className="flex items-center justify-between mb-4">
          
          
        {/* Dropdown Filters */}
        <DropdownFilters />
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showSidebar ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className={showSidebar 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }
            >
              <List size={16} className="mr-2" />
              Lista
            </Button>
            
          </div>
        </div>

      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map/List View */}
        <div className={`${showSidebar ? 'flex-1' : 'w-full'} relative h-full`}>
          {viewMode === 'map' ? (
            <div className="h-full relative">
              {/* Google Maps */}
              <div className="absolute inset-0 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61507.84!2d-58.0036!3d-15.1217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939b0a7f5e5c5555%3A0x5555555555555555!2sMutum%2C%20MT!5e0!3m2!1spt!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Property pins */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredProperties.map((property, index) => {
                  const positions = [
                    { left: '35%', top: '40%' },
                    { left: '45%', top: '35%' },
                    { left: '55%', top: '45%' },
                    { left: '40%', top: '50%' },
                    { left: '60%', top: '40%' },
                    { left: '50%', top: '55%' }
                  ];
                  
                  const position = positions[index % positions.length];
                  
                  return (
                    <div
                      key={property.id}
                      className="absolute pointer-events-auto"
                      style={position}
                    >
                      <button
                        onClick={() => setSelectedProperty(property.id)}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transform transition-all hover:scale-110 shadow-lg ${
                          property.isHighlighted 
                            ? 'bg-yellow-500 border-2 border-yellow-300' 
                            : property.type === 'venda' 
                              ? 'bg-blue-600 border-2 border-blue-400' 
                              : 'bg-green-600 border-2 border-green-400'
                        }`}
                      >
                        <MapPin size={16} />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-gray-900 rounded-full text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Property popup */}
              {selectedProperty && (
                <PropertyMapPopup 
                  propertyId={selectedProperty}
                  onClose={() => setSelectedProperty(null)}
                />
              )}
            </div>
          ) : (
            /* List View */
            <div className="h-full overflow-y-auto bg-gray-50 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Properties Sidebar */}
        {showSidebar && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-900">
                Imóveis ({filteredProperties.length})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
                className="text-gray-700 hover:bg-gray-100"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  onClick={() => setSelectedProperty(property.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="aspect-video bg-gray-200 rounded mb-3 overflow-hidden">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900 font-semibold text-sm">{property.title}</h3>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {property.location.address}<br />
                    {property.location.neighborhood}, {property.location.city} - {property.location.state}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
                    <div className="flex space-x-2">
                      <span>Quartos: {property.bedrooms}</span>
                      <span>Suíte: {property.bathrooms}</span>
                      <span>Vaga: {property.parkingSpaces || 1}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    Área privativa: {property.area}m²
                  </div>
                  
                  <div className="text-green-600 font-bold text-sm">
                    Valor inicial: R$ {property.price.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMap;
