
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de autenticação - será substituído pela integração Supabase
    const checkAuth = async () => {
      try {
        // Aqui será implementada a verificação real do Supabase
        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Implementação do login com Supabase
    console.log('Login:', email);
    return { error: null };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    // Implementação do cadastro com Supabase
    console.log('Cadastro:', email, userData);
    return { error: null };
  };

  const signOut = async () => {
    // Implementação do logout com Supabase
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email: string) => {
    // Implementação da recuperação de senha com Supabase
    console.log('Recuperação de senha:', email);
    return { error: null };
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
