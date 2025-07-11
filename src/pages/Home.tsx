
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';
import PublicLayout from '@/components/Layout/PublicLayout';
import Dashboard from './Dashboard';
import PublicHome from './PublicHome';

const Home: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  // Se o usuário estiver logado, exibir o Dashboard com MainLayout
  if (user) {
    return (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    );
  }

  // Se não estiver logado, exibir a Home pública com PublicLayout
  return (
    <PublicLayout>
      <PublicHome />
    </PublicLayout>
  );
};

export default Home;
