
import React, { useState } from 'react';
import { Plus, Building2, Eye, Edit, Trash2, Copy, ExternalLink, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyFormWizard from '@/components/Property/PropertyFormWizard';
import DevelopmentFormWizard from '@/components/Property/DevelopmentWizard/DevelopmentFormWizard';

const CadastroPage: React.FC = () => {
  const { user } = useAuth();
  const { properties } = useProperty();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [showDevelopmentForm, setShowDevelopmentForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | undefined>();

  const canCreateProperties = user?.role === 'imobiliaria' || user?.role === 'construtora' || user?.role === 'incorporadora' || user?.role === 'admin';
  const canUseDevelopmentMode = user?.role === 'imobiliaria';

  if (!canCreateProperties) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600">Apenas imobiliárias, construtoras e incorporadoras podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  const userProperties = properties.filter(p => p.company === user?.company);
  const canUseBulkMode = user?.role === 'incorporadora' || user?.role === 'construtora';

  const handleEdit = (propertyId: string) => {
    setEditingPropertyId(propertyId);
    setShowPropertyForm(true);
  };

  const handleClone = (property: any) => {
    console.log('Clonando imóvel:', property.id);
  };

  const handleDelete = (propertyId: string) => {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      console.log('Excluindo imóvel:', propertyId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meus Imóveis</h1>
            <p className="text-gray-600">Gerencie seus imóveis e empreendimentos cadastrados</p>
          </div>
          
          <div className="flex space-x-3">
            {canUseDevelopmentMode && (
              <Button 
                onClick={() => setShowDevelopmentForm(true)}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Building2 size={16} className="mr-2" />
                Espelho de Unidades
              </Button>
            )}
            {canUseBulkMode && (
              <Button 
                onClick={() => setShowBulkForm(true)}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Upload size={16} className="mr-2" />
                Cadastro em Lote
              </Button>
            )}
            <Button 
              onClick={() => setShowPropertyForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Novo Imóvel
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Imóveis</p>
                <p className="text-2xl font-bold text-gray-900">{userProperties.length}</p>
              </div>
              <Building2 className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Disponíveis</p>
                <p className="text-2xl font-bold text-gray-900">{userProperties.filter(p => p.status === 'disponivel').length}</p>
              </div>
              <Building2 className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Em Destaque</p>
                <p className="text-2xl font-bold text-gray-900">{userProperties.filter(p => p.isHighlighted).length}</p>
              </div>
              <Building2 className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Visualizações</p>
                <p className="text-2xl font-bold text-gray-900">2.4k</p>
              </div>
              <Eye className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => setShowPropertyForm(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Plus size={24} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">Novo</p>
                <p className="text-blue-100">Imóvel</p>
              </div>
            </div>
            <p className="text-sm text-blue-100">
              Cadastre um imóvel individual com todas as informações necessárias
            </p>
          </div>

          {canUseDevelopmentMode && (
            <div 
              onClick={() => setShowDevelopmentForm(true)}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white cursor-pointer hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Espelho</p>
                  <p className="text-green-100">de Unidades</p>
                </div>
              </div>
              <p className="text-sm text-green-100">
                Gerencie empreendimentos com múltiplas unidades de forma organizada
              </p>
            </div>
          )}

          {canUseBulkMode && (
            <div 
              onClick={() => setShowBulkForm(true)}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Lote</p>
                  <p className="text-purple-100">de Imóveis</p>
                </div>
              </div>
              <p className="text-sm text-purple-100">
                Cadastre múltiplos imóveis de uma vez usando planilhas
              </p>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Property image */}
              <div className="relative aspect-video bg-gray-100">
                {property.images?.[0] ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span>Foto do imóvel</span>
                  </div>
                )}
                
                {/* Status badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {property.isHighlighted && (
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
                      Destaque
                    </span>
                  )}
                  <span className={`px-2 py-1 text-white text-xs rounded ${
                    property.status === 'disponivel' ? 'bg-green-600' :
                    property.status === 'reservado' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {property.status === 'disponivel' ? 'Disponível' :
                     property.status === 'reservado' ? 'Reservado' : 'Vendido'}
                  </span>
                </div>
              </div>

              {/* Property info */}
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{property.location.address}</p>
                
                {/* Property details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="text-gray-900 capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Área:</span>
                    <span className="text-gray-900">{property.area}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span className="text-green-600 font-semibold">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye size={14} className="mr-1" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="p-2"
                    onClick={() => handleEdit(property.id)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="p-2"
                    onClick={() => handleClone(property)}
                  >
                    <Copy size={14} />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <ExternalLink size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="p-2 text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <PropertyFormWizard 
          onClose={() => {
            setShowPropertyForm(false);
            setEditingPropertyId(undefined);
          }}
          propertyId={editingPropertyId}
          isBulkMode={showBulkForm}
        />
      )}

      {/* Bulk Form Modal */}
      {showBulkForm && (
        <PropertyFormWizard 
          onClose={() => setShowBulkForm(false)}
          isBulkMode={true}
        />
      )}

      {/* Development Form Modal */}
      {showDevelopmentForm && (
        <DevelopmentFormWizard 
          onClose={() => setShowDevelopmentForm(false)}
        />
      )}
    </div>
  );
};

export default CadastroPage;
