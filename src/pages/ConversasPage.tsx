
import React, { useState } from 'react';
import { Search, Plus, Phone, Video, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Conversation {
  id: string;
  contact: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const ConversasPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ativas' | 'arquivadas'>('ativas');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      contact: 'Maria Santos - Apartamento Vista Vale',
      lastMessage: 'Olá! Gostaria de agendar uma visita.',
      timestamp: '14:30',
      unread: true
    },
    {
      id: '2',
      contact: 'João Silva - Casa Térrea Jardim Europa',
      lastMessage: 'Muito obrigado pelas informações!',
      timestamp: '12:15',
      unread: false
    }
  ]);

  const [messages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1',
        sender: 'Maria Santos',
        content: 'Olá! Vi o anúncio do apartamento Vista Vale e gostaria de mais informações.',
        timestamp: '14:25',
        isOwn: false
      },
      {
        id: '2',
        sender: 'Você',
        content: 'Olá Maria! Fico feliz com seu interesse. O apartamento possui 2 quartos, 1 suíte, 70m² e uma vista incrível.',
        timestamp: '14:27',
        isOwn: true
      },
      {
        id: '3',
        sender: 'Maria Santos',
        content: 'Gostaria de agendar uma visita. Qual seria o melhor horário?',
        timestamp: '14:30',
        isOwn: false
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'João Silva',
        content: 'Bom dia! Tenho interesse na casa do Jardim Europa.',
        timestamp: '12:10',
        isOwn: false
      },
      {
        id: '2',
        sender: 'Você',
        content: 'Bom dia João! A casa possui 3 quartos, 2 banheiros, 180m² e fica em um condomínio fechado.',
        timestamp: '12:12',
        isOwn: true
      },
      {
        id: '3',
        sender: 'João Silva',
        content: 'Muito obrigado pelas informações!',
        timestamp: '12:15',
        isOwn: false
      }
    ]
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const currentMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Conversas</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar mensagens ou contatos"
              className="pl-10 bg-white border-gray-300 text-gray-900"
            />
            <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2">
              <Plus size={16} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('ativas')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors ${
                activeTab === 'ativas' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ativas
            </button>
            <button
              onClick={() => setActiveTab('arquivadas')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors ${
                activeTab === 'arquivadas' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Arquivadas
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Phone size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">Você não possui conversas aqui</p>
                <p className="text-gray-500 text-sm">
                  Inicie uma conversa com seus leads e clientes
                </p>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {conversation.contact.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900 font-medium truncate">{conversation.contact}</p>
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversations.find(c => c.id === selectedConversation)?.contact.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {conversations.find(c => c.id === selectedConversation)?.contact}
                    </h3>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Phone size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Phone size={48} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Selecione uma conversa</h2>
              <p className="text-gray-600 max-w-md">
                Escolha uma conversa existente ou inicie uma nova para começar a interagir com seus leads e clientes.
              </p>
              
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={16} className="mr-2" />
                  Nova conversa
                </Button>                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversasPage;
