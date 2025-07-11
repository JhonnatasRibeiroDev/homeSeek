
import React, { useState } from 'react';
import { useProperty } from '@/contexts/PropertyContext';
import { Building2, TrendingUp, Users, Eye, MapPin, Filter, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { properties } = useProperty();
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mock para demonstração
  const stats = {
    totalProperties: properties.length,
    activeProperties: properties.filter(p => p.status === 'disponivel').length,
    soldProperties: properties.filter(p => p.status === 'vendido').length,
    totalViews: 15420,
    totalProposals: 89,
    companies: 8,
    realtors: 23
  };

  const propertiesByType = [
    { type: 'Apartamento', count: 45, percentage: 60 },
    { type: 'Casa', count: 20, percentage: 27 },
    { type: 'Comercial', count: 8, percentage: 11 },
    { type: 'Terreno', count: 2, percentage: 2 }
  ];

  const companiesPerformance = [
    { name: 'HomeSeek Loteamentos', properties: 25, views: 3420, proposals: 18 },
    { name: 'C2 Construtora', properties: 15, views: 2100, proposals: 12 },
    { name: 'Grupo Incorporador SC', properties: 12, views: 1850, proposals: 8 },
    { name: 'FVieira Imóveis', properties: 8, views: 980, proposals: 5 }
  ];

  const realtorsRanking = [
    { name: 'Fernando Vieira', leads: 45, proposals: 12, properties: 8 },
    { name: 'Ana Silva', leads: 38, proposals: 9, properties: 6 },
    { name: 'Carlos Santos', leads: 32, proposals: 7, properties: 5 },
    { name: 'Maria Costa', leads: 28, proposals: 6, properties: 4 }
  ];

  const chartData = [
    { month: 'Jan', properties: 12, proposals: 8 },
    { month: 'Fev', properties: 19, proposals: 12 },
    { month: 'Mar', properties: 15, proposals: 10 },
    { month: 'Abr', properties: 22, proposals: 15 },
    { month: 'Mai', properties: 18, proposals: 13 },
    { month: 'Jun', properties: 25, proposals: 18 }
  ];

  const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04'];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'all' || property.location.city === filterCity;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesCity && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Visão geral da plataforma e gestão de dados</p>
          </div>
          
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download size={16} className="mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Buscar por imóvel ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 bg-white border-gray-300 text-gray-900"
            />
          </div>
          
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="60">Últimos 60 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">Todas as cidades</SelectItem>
              <SelectItem value="Mutum">Mutum</SelectItem>
              <SelectItem value="Cuiabá">Cuiabá</SelectItem>
              <SelectItem value="Campo Grande">Campo Grande</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="disponivel">Disponível</SelectItem>
              <SelectItem value="reservado">Reservado</SelectItem>
              <SelectItem value="vendido">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalProperties}</div>
              <div className="text-sm text-gray-600">Total Imóveis</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.activeProperties}</div>
              <div className="text-sm text-gray-600">Disponíveis</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.soldProperties}</div>
              <div className="text-sm text-gray-600">Vendidos</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Visualizações</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.totalProposals}</div>
              <div className="text-sm text-gray-600">Propostas</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.companies}</div>
              <div className="text-sm text-gray-600">Empresas</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{stats.realtors}</div>
              <div className="text-sm text-gray-600">Corretores</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cadastros e Propostas por Mês</h3>
            <ChartContainer
              config={{
                properties: { label: "Imóveis", color: "#2563eb" },
                proposals: { label: "Propostas", color: "#16a34a" }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="properties" fill="#2563eb" />
                  <Bar dataKey="proposals" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imóveis por Tipo</h3>
            <ChartContainer
              config={{
                count: { label: "Quantidade" }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertiesByType}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({type, percentage}) => `${type} (${percentage}%)`}
                  >
                    {propertiesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Companies Performance */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Desempenho das Empresas</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Imóveis</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Propostas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companiesPerformance.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.properties}</TableCell>
                    <TableCell>{company.views.toLocaleString()}</TableCell>
                    <TableCell>{company.proposals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Realtors Ranking */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ranking de Corretores</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Corretor</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Propostas</TableHead>
                  <TableHead>Imóveis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {realtorsRanking.map((realtor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{realtor.name}</TableCell>
                    <TableCell>{realtor.leads}</TableCell>
                    <TableCell>{realtor.proposals}</TableCell>
                    <TableCell>{realtor.properties}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Todos os Imóveis Cadastrados ({filteredProperties.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Propostas</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.slice(0, 10).map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        property.status === 'disponivel' ? 'bg-green-100 text-green-800' :
                        property.status === 'reservado' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status === 'disponivel' ? 'Disponível' :
                         property.status === 'reservado' ? 'Reservado' : 'Vendido'}
                      </span>
                    </TableCell>
                    <TableCell>{property.location.city}</TableCell>
                    <TableCell>R$ {property.price.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <Link to={`/imovel/${property.id}`}>
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
