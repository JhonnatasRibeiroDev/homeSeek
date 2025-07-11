import React, { useState } from 'react';
import { Plus, Edit, Eye, Settings, CheckCircle, XCircle, User, Trash2, Building2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import { Link } from 'react-router-dom';
import PropertyFormWizard from '@/components/Property/PropertyFormWizard';
import DevelopmentFormWizard from '@/components/Property/DevelopmentWizard/DevelopmentFormWizard';

interface BrokerRequest {
  id: string;
  brokerName: string;
  brokerCompany: string;
  propertyId: string;
  message: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MeusImoveisPage: React.FC = () => {
  const { user } = useAuth();
  const { properties } = useProperty();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [showDevelopmentForm, setShowDevelopmentForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<string | null>(null);

  const canCreateProperties = user?.role === 'imobiliaria' || user?.role === 'construtora' || user?.role === 'incorporadora' || user?.role === 'admin';
  const canUseDevelopmentMode = user?.role === 'imobiliaria';
  const canUseBulkMode = user?.role === 'incorporadora' || user?.role === 'construtora';

  // Mock broker requests data
  const [brokerRequests] = useState<BrokerRequest[]>([
    {
      id: '1',
      brokerName: 'Maria Santos',
      brokerCompany: 'Imobiliária Prime',
      propertyId: '1',
      message: 'Gostaria de divulgar este imóvel para meus clientes.',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      brokerName: 'Fernando Corretor',
      brokerCompany: 'Corretora Premium',
      propertyId: '1',
      message: 'Tenho interesse em trabalhar com este empreendimento.',
      date: '2024-01-14',
      status: 'pending'
    }
  ]);

  // Filter properties by current user's company
  const userProperties = properties.filter(property => 
    property.company === user?.company
  );

  const handleApproveRequest = (requestId: string) => {
    console.log('Aprovando solicitação:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejeitando solicitação:', requestId);
  };

  const handleDeleteProperty = (propertyId: string) => {
    console.log('Excluindo imóvel:', propertyId);
  };

  const handleEditProperty = (propertyId: string) => {
    setEditingProperty(propertyId);
    setShowPropertyForm(true);
  };

  const handleClone = (property: any) => {
    console.log('Clonando imóvel:', property.id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disponivel':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Disponível</span>;
      case 'reservado':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Reservado</span>;
      case 'vendido':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Vendido</span>;
      default:
        return null;
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
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

        {/* Stats */}
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
                <p className="text-gray-600 text-sm">Solicitações Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{brokerRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <User className="text-purple-500" size={24} />
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
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Properties List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Meus Imóveis Cadastrados</h2>
            
            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-md transition-shadow">
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
                      {getStatusBadge(property.status)}
                    </div>
                  </div>

                  {/* Property info */}
                  <CardContent className="p-4">
                    <h3 className="text-gray-900 font-semibold mb-2">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{property.location?.address}</p>
                    
                    {/* Property details */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Tipo:</span>
                        <span className="text-gray-900 capitalize">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Área:</span>
                        <span className="text-gray-900">{property.area || 'N/A'}m²</span>
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
                      <Link to={`/imovel/${property.id}`}>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye size={14} className="mr-1" />
                          Ver
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-2"
                        onClick={() => handleEditProperty(property.id)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-2 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    
                    {/* Broker requests count */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {brokerRequests.filter(r => r.propertyId === property.id && r.status === 'pending').length} solicitações de corretores pendentes
                        </span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => setSelectedProperty(property.id)}
                        >
                          Ver solicitações
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Broker Requests Panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Solicitações de Corretores</h2>
            
            {brokerRequests
              .filter(request => !selectedProperty || request.propertyId === selectedProperty)
              .map((request) => (
              <Card key={request.id} className="border-l-4 border-l-yellow-400">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {request.brokerName.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{request.brokerName}</h4>
                        <span className="text-xs text-gray-500">{request.date}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{request.brokerCompany}</p>
                      <p className="text-sm text-gray-700 mb-3">{request.message}</p>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <XCircle size={14} className="mr-1" />
                          Recusar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {brokerRequests.filter(request => !selectedProperty || request.propertyId === selectedProperty).length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <User size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma solicitação</h3>
                  <p className="text-gray-600">
                    Quando corretores se interessarem pelos seus imóveis, as solicitações aparecerão aqui.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <PropertyFormWizard 
          onClose={() => {
            setShowPropertyForm(false);
            setEditingProperty(null);
          }}
          propertyId={editingProperty}
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

export default MeusImoveisPage;
