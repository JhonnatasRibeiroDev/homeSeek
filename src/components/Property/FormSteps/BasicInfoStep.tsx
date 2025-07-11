
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { PropertyFormData } from '@/types/property';
import { Home, DollarSign, Maximize, Bed, Bath, Car, Building2 } from 'lucide-react';

interface BasicInfoStepProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
  isBulkMode?: boolean;
  isDevelopmentMode?: boolean;
  setIsDevelopmentMode?: (value: boolean) => void;
  userRole?: string;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ 
  formData, 
  setFormData, 
  isBulkMode,
  isDevelopmentMode = false,
  setIsDevelopmentMode,
  userRole
}) => {
  const handleChange = (field: keyof PropertyFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDevelopmentModeChange = (checked: boolean | 'indeterminate') => {
    if (setIsDevelopmentMode) {
      setIsDevelopmentMode(checked === true);
    }
  };

  const canUseDevelopmentMode = userRole === 'imobiliaria';

  return (
    <div className="space-y-6">
      {canUseDevelopmentMode && !isBulkMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Tipo de Cadastro</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="developmentMode"
                checked={isDevelopmentMode}
                onCheckedChange={handleDevelopmentModeChange}
              />
              <label htmlFor="developmentMode" className="text-sm font-medium text-gray-700">
                Este imóvel é um empreendimento com múltiplas unidades (Espelho de Unidades)
              </label>
            </div>
            {isDevelopmentMode && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Modo Empreendimento ativado:</strong> Você poderá cadastrar múltiplas unidades 
                  de forma organizada usando o sistema de espelho de vendas.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-blue-600" />
            <span>Informações Básicas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isDevelopmentMode 
                ? 'Nome do Empreendimento *' 
                : isBulkMode 
                  ? 'Nome do Empreendimento *' 
                  : 'Título do Imóvel *'
              }
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder={
                isDevelopmentMode 
                  ? "Ex: Residencial Vista Mar Torre A" 
                  : isBulkMode 
                    ? "Ex: Residencial Vista Mar" 
                    : "Ex: Apartamento 3 quartos"
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel *</label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="loteamento">Loteamento</SelectItem>
                  <SelectItem value="condominio">Condomínio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isDevelopmentMode ? 'Finalidade *' : 'Status *'}
              </label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isDevelopmentMode ? (
                    <>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="aluguel">Aluguel</SelectItem>
                      <SelectItem value="lancamento">Lançamento</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="disponivel">Disponível</SelectItem>
                      <SelectItem value="reservado">Reservado</SelectItem>
                      <SelectItem value="vendido">Vendido</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isDevelopmentMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Segmento *</label>
                <Select onValueChange={(value) => handleChange('segment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economico">Econômico</SelectItem>
                    <SelectItem value="medio-padrao">Médio Padrão</SelectItem>
                    <SelectItem value="alto-padrao">Alto Padrão</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status da Obra *</label>
                <Select onValueChange={(value) => handleChange('constructionStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pronto">Pronto</SelectItem>
                    <SelectItem value="em-construcao">Em Construção</SelectItem>
                    <SelectItem value="na-planta">Na Planta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Completa *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder={
                isDevelopmentMode 
                  ? "Descreva o empreendimento, suas características principais, localização privilegiada..."
                  : "Descreva detalhadamente o imóvel..."
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      {!isDevelopmentMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span>Valor e Características</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor de Venda (R$) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', Number(e.target.value))}
                    className="pl-10"
                    placeholder="850000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Área Privativa (m²) *</label>
                <div className="relative">
                  <Maximize className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    value={formData.privateArea}
                    onChange={(e) => handleChange('privateArea', Number(e.target.value))}
                    className="pl-10"
                    placeholder="120"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dormitórios *</label>
                <Select value={formData.bedrooms.toString()} onValueChange={(value) => handleChange('bedrooms', Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Suítes *</label>
                <Select value={formData.suites.toString()} onValueChange={(value) => handleChange('suites', Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Nenhuma</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banheiros *</label>
                <Select value={formData.bathrooms.toString()} onValueChange={(value) => handleChange('bathrooms', Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vagas de Garagem *</label>
                <Select value={formData.parkingSpaces.toString()} onValueChange={(value) => handleChange('parkingSpaces', Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Nenhuma</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BasicInfoStep;
