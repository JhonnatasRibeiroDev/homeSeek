
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PublicHeader from './PublicHeader';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Só mostra o header público se o usuário não estiver logado */}
      {!user && <PublicHeader />}
      <main>
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
