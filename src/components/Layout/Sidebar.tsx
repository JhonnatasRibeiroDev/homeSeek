
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, MessageCircle, FileText, LogOut, Building2, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', roles: ['cliente', 'corretor', 'imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: MapPin, label: 'Mapa de Imóveis', path: '/mapa', roles: ['cliente', 'corretor', 'imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: Building2, label: 'Meus Imóveis', path: '/meus-imoveis', roles: ['cliente', 'corretor', 'imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: MessageCircle, label: 'Conversas', path: '/conversas', roles: ['cliente', 'corretor', 'imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: FileText, label: 'Minhas propostas', path: '/propostas', roles: ['cliente', 'corretor', 'imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: Building2, label: 'Stories', path: '/stories', roles: ['imobiliaria', 'construtora', 'incorporadora', 'admin'] },
    { icon: Users, label: 'Usuários', path: '/usuarios', roles: ['admin'] }
  ];

  const visibleItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto lg:shadow-none"
      )}>
        {/* Logo */}
        
        <div className="flex items-center justify-center p-6 border-b border-gray-200">
          <div className="text-blue-600 font-bold text-xl">HomeSeek</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {visibleItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all hover-scale",
                location.pathname === item.path 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info and logout */}
        {user && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.company}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center space-x-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-400 transition-colors"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
