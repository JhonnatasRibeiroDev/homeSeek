
import React, { useState } from 'react';
import { Plus, Play, Eye, Download, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  videoUrl: string;
  views: number;
  leads: number;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
  isPinned: boolean;
}

const StoriesPage: React.FC = () => {
  const { user } = useAuth();
  const [stories] = useState<Story[]>([
    {
      id: '1',
      title: 'Torre23 - Lançamento',
      description: 'Novo empreendimento em Itapema com vista para o mar',
      coverImage: '/api/placeholder/200/200',
      videoUrl: '/api/placeholder/video',
      views: 1542,
      leads: 23,
      createdAt: new Date('2023-12-01'),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      isActive: true,
      isPinned: false
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const canCreateStories = user?.role === 'imobiliaria' || user?.role === 'construtora' || user?.role === 'admin';

  if (!canCreateStories) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Acesso Negado</h2>
          <p className="text-gray-400">Apenas imobiliárias e construtoras podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Stories Corporativos</h1>
            <p className="text-gray-400">Compartilhe vídeos dos seus empreendimentos</p>
          </div>
          
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Novo Story
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Stories Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{stories.filter(s => s.isActive).length}</p>
              </div>
              <Play className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Views</p>
                <p className="text-2xl font-bold text-gray-900">{stories.reduce((acc, s) => acc + s.views, 0)}</p>
              </div>
              <Eye className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Leads Gerados</p>
                <p className="text-2xl font-bold text-gray-900">{stories.reduce((acc, s) => acc + s.leads, 0)}</p>
              </div>
              <Download className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Taxa Conversão</p>
                <p className="text-2xl font-bold text-gray-900">1.5%</p>
              </div>
              <Archive className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-gray-200 rounded-lg border border-gray-200 overflow-hidden">
              {/* Story preview */}
              <div className="relative aspect-video bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={48} className="text-gray-500" />
                </div>
                
                {/* Status badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {story.isActive && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Ativo</span>
                  )}
                  {story.isPinned && (
                    <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">Fixado</span>
                  )}
                </div>

                {/* Time remaining */}
                <div className="absolute bottom-3 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded">
                  Expira em 12h
                </div>
              </div>

              {/* Story info */}
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Download size={14} className="mr-1" />
                      <span>{story.leads} leads</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-800">
                    <Eye size={14} className="mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-800 p-2">
                    <Archive size={14} />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-800 p-2">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Create new story card */}
          <div 
            onClick={() => setShowCreateModal(true)}
            className="bg-white rounded-lg border border-gray-200 border-dashed hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <Plus size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Criar novo story</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Story Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-200 w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Criar Novo Story</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Título</label>
                <input 
                  type="text"
                  className="w-full bg-gray-50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Nome do empreendimento"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Descrição</label>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  rows={3}
                  placeholder="Descreva o empreendimento..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Vídeo (máx. 30s)</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Plus size={32} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">Clique para enviar vídeo</p>
                  <p className="text-xs text-gray-500 mt-1">MP4, MOV até 50MB</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-800"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Publicar Story
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
