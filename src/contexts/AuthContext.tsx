import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'cliente' | 'corretor' | 'imobiliaria' | 'construtora' | 'incorporadora' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  phone?: string;
  isActive: boolean;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários simulados expandidos
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'cliente@homeseek.com',
    role: 'cliente',
    company: 'Particular',
    phone: '(47) 99999-0001',
    isActive: true
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'corretor@homeseek.com',
    role: 'corretor',
    company: 'Imobiliária Prime',
    phone: '(47) 99999-0002',
    isActive: true
  },
  {
    id: '3',
    name: 'Carlos Pereira',
    email: 'imobiliaria@homeseek.com',
    role: 'imobiliaria',
    company: 'Imobiliária Litoral',
    phone: '(47) 99999-0003',
    isActive: true
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'construtora@homeseek.com',
    role: 'construtora',
    company: 'Construtora Atlântico',
    phone: '(47) 99999-0004',
    isActive: true
  },
  {
    id: '5',
    name: 'Roberto Admin',
    email: 'admin@homeseek.com',
    role: 'admin',
    company: 'HomeSeek',
    phone: '(47) 99999-0005',
    isActive: true
  },
  {
    id: '6',
    name: 'Patricia Incorporadora',
    email: 'incorporadora@homeseek.com',
    role: 'incorporadora',
    company: 'Grupo Incorporador SC',
    phone: '(47) 99999-0006',
    isActive: true
  },
  {
    id: '7',
    name: 'Fernando Corretor',
    email: 'fernando.corretor@homeseek.com',
    role: 'corretor',
    company: 'Corretora Premium',
    phone: '(47) 99999-0007',
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de sessão
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar credenciais (senha padrão: 123456)
      const foundUser = mockUsers.find(u => u.email === email && u.isActive);
      
      if (foundUser && password === '123456') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        console.log('Login realizado com sucesso:', foundUser);
        return true;
      }
      
      console.log('Credenciais inválidas');
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('Logout realizado');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
