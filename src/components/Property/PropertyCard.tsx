
import React, { useState } from 'react';
import { Heart, Bed, Bath, Square, MapPin, Share2, MessageCircle } from 'lucide-react';
import { Property } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  const getStatusBadge = () => {
    switch (property.status) {
      case 'disponivel':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Disponível</span>;
      case 'reservado':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Reservado</span>;
      case 'vendido':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">Vendido</span>;
      default:
        return null;
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorited ? "Imóvel removido da sua lista de favoritos" : "Imóvel salvo na sua lista de favoritos",
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/imovel/${property.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Confira este imóvel: ${property.title}`,
          url: url,
        });
      } catch (error) {
        // Fallback para clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link do imóvel foi copiado para a área de transferência",
        });
      }
    } else {
      // Fallback para clipboard
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link do imóvel foi copiado para a área de transferência",
      });
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Redirecionamento direto para o chat
    window.location.href = `/conversas?propertyId=${property.id}`;
    
    toast({
      title: "Chat iniciado",
      description: "Redirecionando para a conversa...",
    });
  };

  // Converter nome da empresa para formato de URL
  const companySlug = property.company.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/imovel/${property.id}`}>
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all group hover-scale cursor-pointer">
        {/* Image */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {property.isHighlighted && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                Destaque
              </span>
            )}
            {getStatusBadge()}
          </div>

          {/* Company badge */}
          <Link to={`/empresa/${companySlug}`} onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-colors">
              {property.company.charAt(0)}
            </div>
          </Link>

          {/* Action buttons */}
          <div className="absolute bottom-3 right-3 flex space-x-2">
            <button 
              onClick={handleShare}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-blue-600 transition-colors shadow-sm"
            >
              <Share2 size={16} />
            </button>
            <button 
              onClick={handleFavorite}
              className={`p-2 bg-white/90 backdrop-blur-sm rounded-full transition-colors shadow-sm ${
                isFavorited 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Last update */}
          <div className="absolute bottom-3 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            Atualizado em {property.createdAt.toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Company */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link to={`/empresa/${companySlug}`} onClick={(e) => e.stopPropagation()}>
                <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700 transition-colors">
                  {property.company.charAt(0)}
                </span>
              </Link>
              <Link to={`/empresa/${companySlug}`} onClick={(e) => e.stopPropagation()} className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                {property.company}
              </Link>
            </div>
            <h3 className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{property.location.neighborhood}, {property.location.city} - {property.location.state}</span>
          </div>

          {/* Features */}
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <Bed size={14} className="mr-1" />
              <span>{property.bedrooms} Quartos</span>
            </div>
            <div className="flex items-center">
              <Bath size={14} className="mr-1" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Suíte' : 'Suítes'}</span>
            </div>
            <div className="flex items-center">
              <Square size={14} className="mr-1" />
              <span>{property.parkingSpaces || 2} {property.parkingSpaces === 1 ? 'Vaga' : 'Vagas'}</span>
            </div>
          </div>

          {/* Area and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Square size={14} className="mr-1" />
              <span>{property.area}m² Privat.</span>
            </div>
            <div className="text-green-600 font-bold text-lg">
              {formatPrice(property.price)}
            </div>
          </div>

          {/* Type badge and Contact button */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              ({property.type === 'venda' ? 'Valor de venda' : 'Valor mensal'})
            </span>
            <Button 
              size="sm" 
              onClick={handleContact}
              className={cn("bg-blue-600 hover:bg-blue-700 text-white")}
            >
              <MessageCircle size={14} className="mr-1" />
              Conversar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
