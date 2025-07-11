
import React from 'react';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import PropertyMap from '@/components/Map/PropertyMap';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { useState } from 'react';

const MapPage: React.FC = () => {
  const { filteredProperties, properties } = useProperty();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('MapPage - Total properties:', properties.length);
  console.log('MapPage - Filtered properties:', filteredProperties.length);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Se o usuário está logado, renderizar com sidebar e header
  if (user) {
    return (
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={handleMenuClick} />
          
          {/* Área principal do mapa - sem scroll */}
          <main className="flex-1 relative overflow-hidden">
            <PropertyMap />
            
            {/* No results message */}
            {filteredProperties.length === 0 && properties.length > 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center max-w-md z-10">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Nenhum imóvel encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Nenhum imóvel foi encontrado com os filtros aplicados. Tente ajustar os critérios de busca.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Dicas:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Amplie a faixa de preço</li>
                    <li>• Remova alguns filtros</li>
                    <li>• Tente uma localização diferente</li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // Se o usuário não está logado, renderizar apenas o mapa sem scroll
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Área principal do mapa - sem scroll */}
      <main className="flex-1 relative overflow-hidden">
        <PropertyMap />
        
        {/* No results message */}
        {filteredProperties.length === 0 && properties.length > 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center max-w-md z-10">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Nenhum imóvel foi encontrado com os filtros aplicados. Tente ajustar os critérios de busca.
            </p>
            <div className="text-sm text-gray-500">
              <p>Dicas:</p>
              <ul className="mt-1 space-y-1">
                <li>• Amplie a faixa de preço</li>
                <li>• Remova alguns filtros</li>
                <li>• Tente uma localização diferente</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapPage;
