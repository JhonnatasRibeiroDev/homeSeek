
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/Auth/LoginForm';

const PublicHeader: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">HomeSeek</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-auto mr-5">
              <Link to="/mapa" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Mapa de Imóveis
              </Link>
            </nav>

            {/* Login Button */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex"
              >
                <User size={16} className="mr-2" />
                Entrar
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              <Link 
                to="/mapa" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Mapa de Imóveis
              </Link>
              <Button 
                onClick={() => {
                  setShowLoginModal(true);
                  setShowMobileMenu(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <User size={16} className="mr-2" />
                Entrar
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <LoginForm onSuccess={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default PublicHeader;
