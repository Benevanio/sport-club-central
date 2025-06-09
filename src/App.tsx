
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import { Alunos } from "./pages/Alunos";
import { Funcionarios } from "./pages/Funcionarios";
import { Planos } from "./pages/Planos";
import { Pagamentos } from "./pages/Pagamentos";
import { Auth } from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route 
                path="/auth" 
                element={
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alunos" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Alunos />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/funcionarios" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Funcionarios />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/planos" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Planos />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pagamentos" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Pagamentos />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
