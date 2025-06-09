
import React, { useState, useEffect } from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, TrendingUp, Users, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalAlunos: number;
  receitaMes: number;
  funcionariosAtivos: number;
  pagamentosPendentes: number;
}

interface RecentActivity {
  id: string;
  tipo: 'matricula' | 'pagamento' | 'funcionario';
  nome: string;
  data: string;
  valor?: number;
  status?: string;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAlunos: 0,
    receitaMes: 0,
    funcionariosAtivos: 0,
    pagamentosPendentes: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Buscar estatísticas
      const [alunosResult, funcionariosResult, pagamentosResult] = await Promise.all([
        supabase.from('alunos').select('id'),
        supabase.from('funcionarios').select('id').eq('status', 'ativo'),
        supabase.from('pagamentos').select('valor, status, data_pagamento')
      ]);

      // Calcular receita do mês atual
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const receitaMes = pagamentosResult.data
        ?.filter(p => {
          if (!p.data_pagamento || p.status !== 'pago') return false;
          const paymentDate = new Date(p.data_pagamento);
          return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
        })
        .reduce((sum, p) => sum + (p.valor || 0), 0) || 0;

      const pagamentosPendentes = pagamentosResult.data?.filter(p => p.status === 'pendente').length || 0;

      setStats({
        totalAlunos: alunosResult.data?.length || 0,
        receitaMes,
        funcionariosAtivos: funcionariosResult.data?.length || 0,
        pagamentosPendentes,
      });

      // Buscar atividades recentes (últimas matrículas)
      const { data: matriculasRecentes } = await supabase
        .from('matriculas')
        .select(`
          id,
          data_inicio,
          alunos (nome),
          planos (nome)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      const activities: RecentActivity[] = matriculasRecentes?.map(m => ({
        id: m.id,
        tipo: 'matricula' as const,
        nome: m.alunos?.nome || 'Aluno',
        data: new Date(m.data_inicio).toLocaleDateString('pt-BR'),
        status: m.planos?.nome || 'Plano'
      })) || [];

      setRecentActivities(activities);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Visão geral do seu negócio e métricas importantes
          </p>
        </div>
        {(userProfile?.tipo === 'admin' || userProfile?.tipo === 'funcionario') && (
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        )}
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalAlunos}</div>
            <p className="text-xs text-gray-500">Alunos cadastrados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receita do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              R$ {stats.receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500">Pagamentos recebidos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Funcionários Ativos</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.funcionariosAtivos}</div>
            <p className="text-xs text-gray-500">Em atividade</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pagamentos Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.pagamentosPendentes}</div>
            <p className="text-xs text-gray-500">Aguardando pagamento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-green-700">Atividades Recentes</CardTitle>
            <CardDescription>Últimas matrículas e movimentações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-green-50">
                    <div className="flex-shrink-0">
                      {activity.tipo === 'matricula' && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900">{activity.nome}</p>
                      <p className="text-sm text-gray-500">
                        {activity.tipo === 'matricula' ? `Plano: ${activity.status}` : activity.status}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">{activity.data}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Nenhuma atividade recente
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
