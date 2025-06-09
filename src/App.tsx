
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Auth } from "@/pages/Auth";
import { Dashboard } from "@/pages/Dashboard";
import { Alunos } from "@/pages/Alunos";
import { Funcionarios } from "@/pages/Funcionarios";
import { Planos } from "@/pages/Planos";
import { Pagamentos } from "@/pages/Pagamentos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Para demonstração, sempre permitir acesso (remover quando Supabase estiver configurado)
  return <Layout>{children}</Layout>;
  
  // Descomentar quando Supabase estiver configurado:
  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }
  // return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/alunos" element={
        <ProtectedRoute>
          <Alunos />
        </ProtectedRoute>
      } />
      <Route path="/funcionarios" element={
        <ProtectedRoute>
          <Funcionarios />
        </ProtectedRoute>
      } />
      <Route path="/planos" element={
        <ProtectedRoute>
          <Planos />
        </ProtectedRoute>
      } />
      <Route path="/pagamentos" element={
        <ProtectedRoute>
          <Pagamentos />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
