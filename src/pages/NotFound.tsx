
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button className="bg-red-600 hover:bg-red-700">
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
