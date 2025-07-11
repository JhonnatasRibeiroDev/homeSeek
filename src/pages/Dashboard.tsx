
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '@/components/Property/PropertyCard';
import StoriesCarousel from '@/components/Stories/StoriesCarousel';
import StoriesModal from '@/components/Stories/StoriesModal';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { Building2, TrendingUp, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { properties } = useProperty();
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  // Se for admin, mostrar dashboard administrativo
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  const highlightedProperties = properties.filter(p => p.isHighlighted);

  // Stories de exemplo
  const stories = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=700&fit=crop',
      company: 'Construtora Atlântico',
      title: 'Novo Lançamento - Vista Mar'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=700&fit=crop',
      company: 'Imobiliária Litoral',
      title: 'Casa dos Sonhos Disponível'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=700&fit=crop',
      company: 'Grupo Incorporador SC',
      title: 'Apartamento de Luxo'
    }
  ];

  const stats = [
    { icon: Building2, label: 'Imóveis Ativos', value: '297', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: 'Vendas Mês', value: '43', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Users, label: 'Novos Leads', value: '128', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: Eye, label: 'Visualizações', value: '2.4k', color: 'text-purple-500', bg: 'bg-purple-50' }
  ];

  const canCreateProperties = ['imobiliaria', 'construtora', 'incorporadora', 'admin'].includes(user?.role || '');
  const canCreateStories = ['imobiliaria', 'construtora', 'incorporadora', 'admin'].includes(user?.role || '');

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setShowStoriesModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stories */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(index)}
                className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-blue-500 p-0.5 hover-scale"
              >
                <img
                  src={story.image}
                  alt={story.company}
                  className="w-full h-full rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao HomeSeek, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades e oportunidades.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`${stat.color}`} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Properties */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Imóveis em Destaque</h2>
              <Link to="/mapa" className="text-blue-600 hover:text-blue-500 transition-colors font-medium">
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlightedProperties.map((property, index) => (
                <div key={property.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Stories Modal */}
      {showStoriesModal && (
        <StoriesModal
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setShowStoriesModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
