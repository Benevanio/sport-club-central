
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, LayoutDashboard, Settings } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "Total de Alunos",
      value: "1,234",
      description: "+20% em relação ao mês passado",
      icon: <Search className="h-4 w-4" />,
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.231",
      description: "+15% em relação ao mês passado",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Matrículas Ativas",
      value: "987",
      description: "98 renovações este mês",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Funcionários",
      value: "23",
      description: "2 novos contratados",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};
