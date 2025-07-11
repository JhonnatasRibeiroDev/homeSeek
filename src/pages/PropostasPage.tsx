
import React, { useState } from 'react';
import { FileText, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Proposal {
  id: string;
  property: string;
  client: string;
  amount: number;
  status: 'pendente' | 'aceita' | 'recusada';
  date: string;
  notes?: string;
}

const PropostasPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [proposals] = useState<Proposal[]>([]);

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'pendente':
        return <span className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full">Pendente</span>;
      case 'aceita':
        return <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">Aceita</span>;
      case 'recusada':
        return <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">Recusada</span>;
    }
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return proposals.length;
    return proposals.filter(p => p.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Minhas Propostas</h1>
          
        </div>

      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-yellow-200 p-6 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">1</div>
              <div className="text-gray-700">Pendentes de aprovação</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-700">Propostas aceitas</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">0</div>
              <div className="text-gray-700">Propostas recusadas</div>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {proposals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suas propostas aparecerão aqui.</h3>
              <p className="text-gray-600 text-center max-w-md">
                Quando você enviar propostas para imóveis ou receber propostas de clientes, 
                elas aparecerão nesta seção para acompanhamento.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {proposals
                .filter(proposal => filter === 'all' || proposal.status === filter)
                .map((proposal) => (
                  <div key={proposal.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-1">{proposal.property}</h3>
                        <p className="text-gray-600 text-sm mb-2">Cliente: {proposal.client}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Valor: R$ {proposal.amount.toLocaleString('pt-BR')}</span>
                          <span>Data: {proposal.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(proposal.status)}
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropostasPage;
