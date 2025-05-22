
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Permission, createPermissionGuard } from '@/utils/permissionsSystem';
import { supabase } from '@/utils/supabaseClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  can: (permission: Permission) => boolean;
  canAccess: (route: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  updateUser: async () => {},
  can: () => false,
  canAccess: () => false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock user for development
const MOCK_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@nogperformance.com',
  role: 'admin',
  companyId: '1'
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In production this would check with Supabase
        // For development we'll use localStorage
        const savedUser = localStorage.getItem('nog_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Use mock user for development
          setUser(MOCK_USER);
          localStorage.setItem('nog_user', JSON.stringify(MOCK_USER));
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would authenticate with Supabase
      // For now, we'll just set our mock user
      setUser(MOCK_USER);
      localStorage.setItem('nog_user', JSON.stringify(MOCK_USER));
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production, this would sign out with Supabase
      setUser(null);
      localStorage.removeItem('nog_user');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, this would create a user in Supabase
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        companyId: '1'
      };
      
      setUser(newUser);
      localStorage.setItem('nog_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user function
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production, this would update the user in Supabase
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('nog_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create permission guard for current user
  const permissionGuard = user ? createPermissionGuard(user) : {
    can: () => false,
    canAccess: () => false,
    getPermissions: () => []
  };

  // Permission check methods
  const can = (permission: Permission) => permissionGuard.can(permission);
  const canAccess = (route: string) => permissionGuard.canAccess(route);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      register,
      updateUser,
      can,
      canAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
