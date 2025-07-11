import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '@/contexts/PropertyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Car, User, MessageCircle, FileText, Phone, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactModal from '@/components/Forms/ContactModal';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperty();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('fotos');
  const [isFavorited, setIsFavorited] = useState(false);
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    type: 'chat' | 'whatsapp' | 'proposal';
  }>({
    isOpen: false,
    type: 'chat'
  });

  const property = getPropertyById(id || '');

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Imóvel não encontrado</h2>
          <Link to="/mapa">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Voltar ao mapa
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Check if it's a development with units - using title keywords or apartment type
  const hasUnits = property.title.toLowerCase().includes('empreendimento') || 
                   property.title.toLowerCase().includes('residencial') ||
                   property.propertyType === 'condominio' ||
                   property.propertyType === 'loteamento';

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  const handleFavorite = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para favoritar imóveis",
        variant: "destructive",
      });
      return;
    }
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorited ? "Imóvel removido da sua lista de favoritos" : "Imóvel salvo na sua lista de favoritos",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link do imóvel foi copiado para a área de transferência",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    }
  };

  const handleContactClick = (type: 'chat' | 'whatsapp' | 'proposal') => {
    setContactModal({ isOpen: true, type });
  };

  const handleAgentRequest = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para solicitar vinculação",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de vinculação foi enviada para análise",
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/mapa">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{property.title}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-900"
            >
              <Share2 size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavorite}
              className={`${isFavorited ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
            >
              <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Image Gallery and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery */}
          <div className="lg:col-span-2">
            {/* Media Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger value="fotos" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700">Fotos</TabsTrigger>
                <TabsTrigger value="plantas" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700">Plantas</TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700">Vídeos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fotos">
                <div className="relative aspect-video bg-white rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ›
                  </button>
                  
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="plantas">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  {property.floorPlan ? (
                    <img src={property.floorPlan} alt="Planta baixa" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <FileText size={48} className="mx-auto mb-2" />
                      <p>Plantas em breve</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                    </div>
                    <p>Vídeos em breve</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Property Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {formatPrice(property.price)}
                </div>
                <div className="text-sm text-gray-500">
                  {property.type === 'venda' ? 'Valor de venda' : 'Valor mensal'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                  property.status === 'disponivel' ? 'bg-green-100 text-green-800' :
                  property.status === 'reservado' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {property.status === 'disponivel' ? 'Disponível' :
                   property.status === 'reservado' ? 'Reservado' : 'Vendido'}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Bed size={16} className="mr-1" />
                  <span>{property.bedrooms} Dorm.</span>
                </div>
                <div className="flex items-center">
                  <Bath size={16} className="mr-1" />
                  <span>{property.bathrooms} Suítes</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Square size={16} className="mr-1" />
                  <span>{property.area}m²</span>
                </div>
                <div className="flex items-center">
                  <Car size={16} className="mr-1" />
                  <span>{property.parkingSpaces || 2} Vagas</span>
                </div>
              </div>

              {/* Botão Ver Unidades - só aparece se for empreendimento */}
              {hasUnits && (
                <div className="border-t border-gray-200 pt-4">
                  <Link to={`/imovel/${id}/unidades`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Eye size={16} className="mr-2" />
                      Ver Unidades Disponíveis
                    </Button>
                  </Link>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Entrada:</span>
                    <span className="text-gray-900 font-semibold">{formatPrice(property.price * 0.3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Parcelamento:</span>
                    <span className="text-gray-900">60x {formatPrice((property.price * 0.7) / 60)}</span>
                  </div>
                  {property.deliveryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entrega:</span>
                      <span className="text-gray-900">{property.deliveryDate.toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {property.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{property.agent}</p>
                    <p className="text-gray-500 text-sm">{property.company}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleContactClick('chat')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Conversar
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleContactClick('whatsapp')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Phone size={16} className="mr-1" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={() => handleContactClick('proposal')}
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <FileText size={16} className="mr-1" />
                      Proposta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Description and Features */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre o empreendimento</h2>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-500">Tipo:</span>
                  <span className="text-gray-900 ml-2 capitalize">{property.propertyType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className="text-gray-900 ml-2 capitalize">{property.status}</span>
                </div>
                <div>
                  <span className="text-gray-500">Área privativa:</span>
                  <span className="text-gray-900 ml-2">{property.area}m²</span>
                </div>
                <div>
                  <span className="text-gray-500">Dormitórios:</span>
                  <span className="text-gray-900 ml-2">{property.bedrooms}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características do empreendimento</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Corretores Vinculados */}
            {property.agents && property.agents.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Corretores vinculados a este imóvel</h3>
                <div className="space-y-4">
                  {property.agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold">{agent.name}</p>
                          <p className="text-gray-500 text-sm">{agent.company}</p>
                          <p className="text-gray-500 text-xs">{agent.phone}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleContactClick('chat')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <MessageCircle size={14} className="mr-1" />
                          Chat
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleContactClick('whatsapp')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Phone size={14} className="mr-1" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {user?.role === 'corretor' && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                      <div className="text-center">
                        <p className="text-gray-500 mb-3">Interessado em divulgar este imóvel?</p>
                        <Button 
                          size="sm" 
                          onClick={handleAgentRequest}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <User size={16} className="mr-2" />
                          Solicitar Vinculação
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Location */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Localização</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-900">{property.location.address}</p>
                  <p className="text-gray-500 text-sm">
                    {property.location.neighborhood}, {property.location.city} - {property.location.state}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Embedded Google Maps for location */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.location.lat},${property.location.lng}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal(prev => ({ ...prev, isOpen: false }))}
        type={contactModal.type}
        propertyTitle={property.title}
        agentName={property.agent}
        agentPhone="5547999999999"
      />
    </div>
  );
};

export default PropertyDetailPage;
