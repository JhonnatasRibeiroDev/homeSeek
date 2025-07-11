
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'chat' | 'whatsapp' | 'proposal';
  propertyTitle: string;
  agentName?: string;
  agentPhone?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  propertyTitle, 
  agentName,
  agentPhone 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    proposalValue: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envio do formulário
    console.log('Form submitted:', { type, formData, propertyTitle });
    
    if (type === 'whatsapp' && agentPhone) {
      const message = `Olá! Me interessei pelo imóvel ${propertyTitle}. Meu nome é ${formData.name} e meu telefone é ${formData.phone}.`;
      const whatsappUrl = `https://wa.me/${agentPhone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    toast({
      title: type === 'proposal' ? "Proposta enviada!" : "Mensagem enviada!",
      description: type === 'proposal' 
        ? "Sua proposta foi enviada com sucesso. O responsável entrará em contato em breve."
        : "Seu interesse foi registrado. O responsável entrará em contato em breve.",
    });
    
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'chat': return 'Iniciar Conversa';
      case 'whatsapp': return 'Contato via WhatsApp';
      case 'proposal': return 'Enviar Proposta';
      default: return 'Contato';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'chat': return <MessageCircle size={24} className="text-blue-600" />;
      case 'whatsapp': return <Phone size={24} className="text-green-600" />;
      case 'proposal': return <MessageCircle size={24} className="text-purple-600" />;
      default: return <MessageCircle size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          {getIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
            <p className="text-sm text-gray-600">{propertyTitle}</p>
            {agentName && (
              <p className="text-sm text-gray-500">Responsável: {agentName}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone/WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          {type === 'proposal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor da proposta
              </label>
              <input
                type="text"
                value={formData.proposalValue}
                onChange={(e) => setFormData(prev => ({ ...prev, proposalValue: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="R$ 0,00"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem (opcional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Deixe sua mensagem..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${
                type === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' :
                type === 'proposal' ? 'bg-purple-600 hover:bg-purple-700' :
                'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {type === 'proposal' ? 'Enviar Proposta' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
