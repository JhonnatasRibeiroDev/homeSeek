
import React from 'react';
import { Building2, TrendingUp, Users, Eye, Plus, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyCard from '@/components/Property/PropertyCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const { properties } = useProperty();

  // Filter highlighted properties for the featured section
  const highlightedProperties = properties.filter(p => p.isHighlighted).slice(0, 3);

  // Mock stats data based on user role
  const getStatsForUser = () => {
    if (user?.role === 'admin') {
      return [
        { title: 'Imóveis Ativos', value: '297', icon: Building2, color: 'text-blue-600' },
        { title: 'Vendas Mês', value: '43', icon: TrendingUp, color: 'text-green-600' },
        { title: 'Novos Leads', value: '128', icon: Users, color: 'text-yellow-600' },
        { title: 'Visualizações', value: '2.4k', icon: Eye, color: 'text-purple-600' }
      ];
    } else if (user?.role === 'imobiliaria' || user?.role === 'construtora' || user?.role === 'incorporadora') {
      return [
        { title: 'Meus Imóveis', value: properties.filter(p => p.company === user.company).length.toString(), icon: Building2, color: 'text-blue-600' },
        { title: 'Vendas Mês', value: '12', icon: TrendingUp, color: 'text-green-600' },
        { title: 'Leads Gerados', value: '34', icon: Users, color: 'text-yellow-600' },
        { title: 'Visualizações', value: '890', icon: Eye, color: 'text-purple-600' }
      ];
    } else {
      return [
        { title: 'Imóveis Favoritados', value: '5', icon: Building2, color: 'text-blue-600' },
        { title: 'Propostas Enviadas', value: '2', icon: TrendingUp, color: 'text-green-600' },
        { title: 'Conversas Ativas', value: '3', icon: MessageCircle, color: 'text-yellow-600' },
        { title: 'Visualizações', value: '24', icon: Eye, color: 'text-purple-600' }
      ];
    }
  };

  const stats = getStatsForUser();

  const getQuickActions = () => {
    if (user?.role === 'admin' || user?.role === 'imobiliaria' || user?.role === 'construtora' || user?.role === 'incorporadora') {
      return [
        { title: 'Novo Imóvel', href: '/cadastro', icon: Plus, color: 'bg-blue-600 hover:bg-blue-700' },
        { title: 'Novo Story', href: '/stories', icon: Eye, color: 'bg-yellow-500 hover:bg-yellow-600' },
        { title: 'Leads', href: '/conversas', icon: Users, color: 'bg-green-600 hover:bg-green-700' },
        { title: 'Relatórios', href: '/propostas', icon: TrendingUp, color: 'bg-purple-600 hover:bg-purple-700' }
      ];
    } else {
      return [
        { title: 'Buscar Imóveis', href: '/mapa', icon: Building2, color: 'bg-blue-600 hover:bg-blue-700' },
        { title: 'Meus Favoritos', href: '/conversas', icon: Eye, color: 'bg-yellow-500 hover:bg-yellow-600' },
        { title: 'Conversas', href: '/conversas', icon: MessageCircle, color: 'bg-green-600 hover:bg-green-700' },
        { title: 'Propostas', href: '/propostas', icon: TrendingUp, color: 'bg-purple-600 hover:bg-purple-700' }
      ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bem-vindo ao HomeSeek, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Aqui está um resumo das suas atividades e oportunidades.
            </p>
          </div>
          
          {/* Company Tags */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
              <span className="text-sm text-gray-600">Construtora Atlântico</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                I
              </div>
              <span className="text-sm text-gray-600">Imobiliária Litoral</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                G
              </div>
              <span className="text-sm text-gray-600">Grupo Incorporador SC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Properties Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Imóveis em Destaque</h2>
            <Link to="/mapa">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Ver todos
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Button 
                className={`w-full h-20 ${action.color} text-white flex flex-col items-center justify-center space-y-2`}
              >
                <action.icon size={24} />
                <span className="font-medium">{action.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
