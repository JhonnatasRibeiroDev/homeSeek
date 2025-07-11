
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, MapPin, Phone, Mail, MessageCircle, Globe } from 'lucide-react';
import PropertyCard from '@/components/Property/PropertyCard';

const CompanyPage: React.FC = () => {
  const { company: companyName } = useParams<{ company: string }>();
  const { properties } = useProperty();

  // Filtrar imóveis da empresa
  const companyProperties = properties.filter(property => 
    property.company.toLowerCase().replace(/\s+/g, '-') === companyName
  );

  const company = companyProperties.length > 0 ? companyProperties[0].company : '';

  // Dados simulados da empresa baseados no nome
  const getCompanyData = (name: string) => {
    const companies = {
      'construtora-atlantico': {
        name: 'Construtora Atlântico',
        description: 'Há mais de 20 anos no mercado, a Construtora Atlântico é referência em empreendimentos de alto padrão na região. Nossa missão é criar espaços únicos que combinam qualidade, inovação e sustentabilidade.',
        logo: 'CA',
        color: 'bg-blue-600',
        phone: '(47) 3333-4444',
        email: 'contato@atlantico.com.br',
        website: 'www.atlantico.com.br',
        address: 'Rua das Palmeiras, 123 - Centro, Itapema - SC',
        specialties: ['Apartamentos de Alto Padrão', 'Coberturas Exclusivas', 'Projetos Sustentáveis'],
        stats: {
          anos: 20,
          obras: 45,
          unidades: 1200
        }
      },
      'grupo-incorporador-sc': {
        name: 'Grupo Incorporador SC',
        description: 'Grupo especializado em incorporações imobiliárias com foco em inovação e qualidade. Desenvolvemos projetos que valorizam o investimento e proporcionam qualidade de vida.',
        logo: 'GI',
        color: 'bg-green-600',
        phone: '(47) 3333-5555',
        email: 'contato@grupoincorporador.com.br',
        website: 'www.grupoincorporador.com.br',
        address: 'Av. Brasil, 456 - Meia Praia, Itapema - SC',
        specialties: ['Lançamentos', 'Pré-lançamentos', 'Apartamentos Compactos'],
        stats: {
          anos: 15,
          obras: 32,
          unidades: 890
        }
      }
    };

    return companies[companyName as keyof typeof companies] || {
      name: company,
      description: 'Empresa especializada no mercado imobiliário com foco em qualidade e atendimento diferenciado.',
      logo: company.charAt(0),
      color: 'bg-blue-600',
      phone: '(47) 3333-0000',
      email: 'contato@empresa.com.br',
      website: 'www.empresa.com.br',
      address: 'Endereço da empresa',
      specialties: ['Imóveis Residenciais', 'Atendimento Personalizado'],
      stats: {
        anos: 10,
        obras: 20,
        unidades: 500
      }
    };
  };

  const companyData = getCompanyData(companyName || '');

  if (companyProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Empresa não encontrada</h2>
          <Link to="/mapa">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Voltar ao mapa
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/mapa">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Company Header */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 flex items-end space-x-4">
              <div className={`w-20 h-20 ${companyData.color} rounded-lg flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg`}>
                {companyData.logo}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{companyData.name}</h1>
                <div className="flex items-center mt-2 space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building2 size={16} className="mr-1" />
                    {companyData.stats.anos} anos no mercado
                  </span>
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {companyData.stats.obras} obras entregues
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre a empresa</h2>
                <p className="text-gray-600 mb-6">{companyData.description}</p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">Especialidades</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {companyData.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">{companyData.stats.anos}</div>
                    <div className="text-gray-500 text-sm">Anos de mercado</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">{companyData.stats.obras}</div>
                    <div className="text-gray-500 text-sm">Obras entregues</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">{companyData.stats.unidades}</div>
                    <div className="text-gray-500 text-sm">Unidades vendidas</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 h-fit">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações de contato</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-3 text-green-500" />
                    <span>{companyData.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-3 text-blue-500" />
                    <span>{companyData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe size={16} className="mr-3 text-purple-500" />
                    <span>{companyData.website}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin size={16} className="mr-3 text-red-500 mt-1" />
                    <span>{companyData.address}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Phone size={16} className="mr-2" />
                    Ligar
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Mail size={16} className="mr-2" />
                    E-mail
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Properties */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Imóveis da {companyData.name} ({companyProperties.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
