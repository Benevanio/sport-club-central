
import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu negócio e métricas importantes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <StatsCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Matrículas Recentes</CardTitle>
            <CardDescription>Últimas matrículas cadastradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: 'João Silva', plano: 'Premium', data: '23/11/2024' },
                { nome: 'Maria Santos', plano: 'Básico', data: '22/11/2024' },
                { nome: 'Pedro Costa', plano: 'Premium', data: '21/11/2024' },
                { nome: 'Ana Oliveira', plano: 'Família', data: '20/11/2024' },
              ].map((matricula, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{matricula.nome}</p>
                    <p className="text-sm text-muted-foreground">{matricula.plano}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{matricula.data}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
