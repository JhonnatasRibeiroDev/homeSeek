
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Upload, X, Calendar, Home, DollarSign, Maximize, Bed, Bath, Car } from 'lucide-react';

interface PropertyFormProps {
  onClose: () => void;
  propertyId?: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onClose, propertyId }) => {
  const { addProperty, properties, updateProperty } = useProperty();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Find the property to edit if propertyId is provided
  const existingProperty = propertyId ? properties.find(p => p.id === propertyId) : null;
  
  const [formData, setFormData] = useState({
    title: existingProperty?.title || '',
    description: existingProperty?.description || '',
    price: existingProperty?.price?.toString() || '',
    type: (existingProperty?.type || 'venda') as 'venda' | 'aluguel',
    propertyType: (existingProperty?.propertyType || 'apartamento') as 'apartamento' | 'casa' | 'terreno' | 'comercial' | 'loteamento' | 'condominio',
    bedrooms: existingProperty?.bedrooms?.toString() || '',
    bathrooms: existingProperty?.bathrooms?.toString() || '',
    area: existingProperty?.area?.toString() || '',
    parkingSpaces: existingProperty?.parkingSpaces?.toString() || '',
    address: existingProperty?.location?.address || '',
    city: existingProperty?.location?.city || '',
    state: existingProperty?.location?.state || 'SC',
    neighborhood: existingProperty?.location?.neighborhood || '',
    deliveryDate: existingProperty?.deliveryDate ? new Date(existingProperty.deliveryDate).toISOString().split('T')[0] : '',
    isHighlighted: existingProperty?.isHighlighted || false,
    workProgress: existingProperty?.workProgress || 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        propertyType: formData.propertyType,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        parkingSpaces: Number(formData.parkingSpaces) || 1,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          neighborhood: formData.neighborhood,
          lat: existingProperty?.location?.lat || -26.9063 + (Math.random() - 0.5) * 0.1,
          lng: existingProperty?.location?.lng || -48.6139 + (Math.random() - 0.5) * 0.1
        },
        images: existingProperty?.images || ['/api/placeholder/400/300'],
        features: existingProperty?.features || ['Nova construção'],
        company: user?.company || 'Empresa',
        agent: user?.name || 'Agente',
        status: existingProperty?.status || 'disponivel' as const,
        isHighlighted: formData.isHighlighted,
        deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate) : undefined
      };

      if (propertyId && existingProperty) {
        updateProperty(propertyId, propertyData);
      } else {
        addProperty(propertyData);
      }
      
      onClose();
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyTypeOptions = () => {
    if (user?.role === 'incorporadora' || user?.role === 'construtora') {
      return [
        { value: 'apartamento', label: 'Apartamento' },
        { value: 'casa', label: 'Casa' },
        { value: 'loteamento', label: 'Loteamento' },
        { value: 'condominio', label: 'Condomínio' },
        { value: 'comercial', label: 'Comercial' }
      ];
    }
    
    return [
      { value: 'apartamento', label: 'Apartamento' },
      { value: 'casa', label: 'Casa' },
      { value: 'terreno', label: 'Terreno' },
      { value: 'comercial', label: 'Comercial' }
    ];
  };

  return (
    <div className="max-h-[85vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {propertyId ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
              </h2>
              <p className="text-sm text-gray-600">Preencha as informações do imóvel</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
                <Home className="w-5 h-5 text-blue-600" />
                <span>Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Empreendimento *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: Torre23 Residencial"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Descreva o imóvel..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Transação *</label>
                  <Select value={formData.type} onValueChange={(value: 'venda' | 'aluguel') => setFormData({...formData, type: value})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="aluguel">Aluguel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel *</label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value as any})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      {getPropertyTypeOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price and Details */}
          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span>Preço e Características</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="bg-white border-gray-300 text-gray-900 pl-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="850000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Área (m²) *</label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="bg-white border-gray-300 text-gray-900 pl-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dormitórios</label>
                  <Select value={formData.bedrooms} onValueChange={(value) => setFormData({...formData, bedrooms: value})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="0">Studio</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suítes</label>
                  <Select value={formData.bathrooms} onValueChange={(value) => setFormData({...formData, bathrooms: value})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="0">Nenhuma</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vagas de Garagem</label>
                  <Select value={formData.parkingSpaces} onValueChange={(value) => setFormData({...formData, parkingSpaces: value})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="0">Nenhuma</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Entrega Prevista</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                      className="bg-white border-gray-300 text-gray-900 pl-10 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Localização</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo *</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: Rua das Palmeiras, 123"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Itapema"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                  <Input
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                    className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Centro"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-gray-200 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Imagens</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Clique para enviar imagens</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG até 5MB cada</p>
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="pt-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHighlighted}
                  onChange={(e) => setFormData({...formData, isHighlighted: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Marcar como imóvel em destaque</span>
              </label>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? 'Salvando...' : propertyId ? 'Atualizar Imóvel' : 'Cadastrar Imóvel'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
