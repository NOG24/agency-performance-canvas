
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'manager' | 'analyst';
  agencyId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: User['role']) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('nog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock login - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      email,
      name: email.includes('admin') ? 'Admin User' : 'Client User',
      role: email.includes('admin') ? 'admin' : 'client',
      agencyId: email.includes('admin') ? 'agency-1' : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('nog_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: User['role']) => {
    setLoading(true);
    
    // Mock registration
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      agencyId: role === 'admin' ? 'agency-1' : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('nog_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('nog_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
