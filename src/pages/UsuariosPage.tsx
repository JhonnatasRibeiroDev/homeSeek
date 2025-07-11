
import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, User, UserRole } from '@/contexts/AuthContext';

const UsuariosPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock users data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'André Augusto Barbosa',
      email: 'andre@HomeSeek.com',
      phone: '(47) 99999-9999',
      role: 'admin',
      company: 'HomeSeek Loteamentos',
      isActive: true
    },
    {
      id: '2',
      name: 'Fernando Vieira',
      email: 'fernando@fvieira.com',
      phone: '(47) 98888-8888',
      role: 'corretor',
      company: 'FVieira Imóveis',
      isActive: true
    },
    {
      id: '3',
      name: 'Maria Silva',
      email: 'maria@c2construtora.com',
      phone: '(47) 97777-7777',
      role: 'construtora',
      company: 'C2 Construtora',
      isActive: true
    },
    {
      id: '4',
      name: 'Patricia Incorporadora',
      email: 'patricia@gruposc.com',
      phone: '(47) 96666-6666',
      role: 'incorporadora',
      company: 'Grupo Incorporador SC',
      isActive: true
    }
  ]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600">Apenas administradores podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    const roleColors = {
      admin: 'bg-red-600',
      construtora: 'bg-purple-600',
      incorporadora: 'bg-indigo-600',
      imobiliaria: 'bg-blue-600',
      corretor: 'bg-green-600',
      cliente: 'bg-gray-600'
    };

    const roleLabels = {
      admin: 'Admin',
      construtora: 'Construtora',
      incorporadora: 'Incorporadora',
      imobiliaria: 'Imobiliária',
      corretor: 'Corretor',
      cliente: 'Cliente'
    };

    return (
      <span className={`px-2 py-1 ${roleColors[role]} text-white text-xs rounded`}>
        {roleLabels[role]}
      </span>
    );
  };

  const roleStats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    construtora: users.filter(u => u.role === 'construtora').length,
    incorporadora: users.filter(u => u.role === 'incorporadora').length,
    imobiliaria: users.filter(u => u.role === 'imobiliaria').length,
    corretor: users.filter(u => u.role === 'corretor').length,
    cliente: users.filter(u => u.role === 'cliente').length,
    active: users.filter(u => u.isActive).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciamento de Usuários</h1>
            <p className="text-gray-600">Administre usuários, permissões e acessos do sistema</p>
          </div>
          
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary bg-blue-600"
          >
            <Plus size={16} className="mr-2" />
            Novo Usuário
          </Button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 border border-gray-300  rounded-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-modern border border-gray-300  rounded-lg"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 select-modern border border-gray-300  rounded-lg">
              <SelectValue placeholder="Filtrar por perfil" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300  rounded-lg">
              <SelectItem value="all">Todos os perfis</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="incorporadora">Incorporadora</SelectItem>
              <SelectItem value="construtora">Construtora</SelectItem>
              <SelectItem value="imobiliaria">Imobiliária</SelectItem>
              <SelectItem value="corretor">Corretor</SelectItem>
              <SelectItem value="cliente">Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">

        {/* Users table */}
        <div className="card-modern">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Usuários ({filteredUsers.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-gray-700 p-4 font-medium">Usuário</th>
                  <th className="text-left text-gray-700 p-4 font-medium">Perfil</th>
                  <th className="text-left text-gray-700 p-4 font-medium">Empresa</th>
                  <th className="text-left text-gray-700 p-4 font-medium">Status</th>
                  <th className="text-left text-gray-700 p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-gray-900 font-medium">{user.name}</div>
                          <div className="text-gray-500 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-4 text-gray-700">{user.company}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="btn-secondary">
                          <Edit size={14} />
                        </Button>
                        <Button size="sm" variant="outline" className="btn-secondary">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 w-full max-w-md shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Criar Novo Usuário</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                <Input className="input-modern border border-gray-300  rounded-lg" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" className="input-modern border border-gray-300  rounded-lg" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <Input className="input-modern border border-gray-300  rounded-lg" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perfil</label>
                <Select>
                  <SelectTrigger className="select-modern border border-gray-300  rounded-lg">
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300  rounded-lg">
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="corretor">Corretor</SelectItem>
                    <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                    <SelectItem value="construtora">Construtora</SelectItem>
                    <SelectItem value="incorporadora">Incorporadora</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                <Input className="input-modern border border-gray-300  rounded-lg" />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1 btn-primary bg-blue-600">
                Criar Usuário
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
