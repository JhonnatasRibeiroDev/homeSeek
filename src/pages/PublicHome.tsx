
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '@/contexts/PropertyContext';
import PropertyCard from '@/components/Property/PropertyCard';
import { Search, MapPin, Home, Building2, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PublicHome: React.FC = () => {
  const { properties } = useProperty();
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBedrooms, setSearchBedrooms] = useState('');

  // Pegar alguns imóveis em destaque
  const featuredProperties = properties.slice(0, 6);
  const recentProperties = properties.slice(0, 8);

  const handleSearch = () => {
    // Aqui você pode implementar a lógica de busca
    console.log({ searchCity, searchType, searchBedrooms });
  };

  const features = [
    { icon: Search, title: 'Busca Inteligente', description: 'Encontre o imóvel ideal com nossos filtros avançados' },
    { icon: MapPin, title: 'Localização Precisa', description: 'Veja imóveis no mapa com informações detalhadas' },
    { icon: Building2, title: 'Grandes Incorporadoras', description: 'Parceria com as melhores construtoras da região' },
    { icon: Users, title: 'Atendimento Especializado', description: 'Corretores qualificados para te ajudar' }
  ];

  const stats = [
    { number: '2.000+', label: 'Imóveis Disponíveis' },
    { number: '50+', label: 'Incorporadoras Parceiras' },
    { number: '10.000+', label: 'Clientes Satisfeitos' },
    { number: '5+', label: 'Cidades Atendidas' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - 2 Colunas */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Encontre seu
                  <span className="text-blue-600"> imóvel ideal</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Descubra as melhores oportunidades imobiliárias com tecnologia avançada e atendimento personalizado.
                </p>
              </div>

              {/* Formulário de Busca */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Cidade</label>
                    <Select value={searchCity} onValueChange={setSearchCity}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mutum">Mutum - MT</SelectItem>
                        <SelectItem value="cuiaba">Cuiabá - MT</SelectItem>
                        <SelectItem value="varzea-grande">Várzea Grande - MT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo</label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Tipo do imóvel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="cobertura">Cobertura</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Quartos</label>
                    <Select value={searchBedrooms} onValueChange={setSearchBedrooms}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Nº quartos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 quarto</SelectItem>
                        <SelectItem value="2">2 quartos</SelectItem>
                        <SelectItem value="3">3 quartos</SelectItem>
                        <SelectItem value="4">4+ quartos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-medium"
                >
                  <Search size={20} className="mr-2" />
                  Buscar Imóveis
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Sem taxa de corretagem</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Atendimento 24h</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=500&fit=crop"
                  alt="Imóvel moderno"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Melhor Avaliado</div>
                    <div className="text-sm text-gray-600">4.9 ⭐ (2.500+ avaliações)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o HomeSeek?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência em busca de imóveis com tecnologia avançada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon size={32} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imóveis em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Imóveis em Destaque</h2>
              <p className="text-gray-600">Selecionamos as melhores oportunidades para você</p>
            </div>
            <Link to="/mapa">
              <Button variant="outline" className="border-gray-300">
                Ver Todos
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de pessoas que já encontraram o imóvel ideal conosco
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mapa">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Search size={20} className="mr-2" />
                Explorar Imóveis
              </Button>
            </Link>
            <Link to="/empresa/todas">
              <Button size="lg" variant="outline" className="border-white bg-blue text-white hover:bg-white hover:text-blue-600">
                <Building2 size={20} className="mr-2" />
                Ver Incorporadoras
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
