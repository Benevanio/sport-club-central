
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Check } from 'lucide-react';

const mockPlanos = [
  {
    id: 1,
    nome: 'Básico',
    descricao: 'Acesso à musculação e área cardio',
    valor: 89.90,
    duracao: 1,
    beneficios: ['Musculação', 'Cardio', 'Vestiário'],
    popular: false,
  },
  {
    id: 2,
    nome: 'Premium',
    descricao: 'Inclui aulas coletivas e personal trainer',
    valor: 149.90,
    duracao: 1,
    beneficios: ['Tudo do Básico', 'Aulas Coletivas', '2x Personal/mês', 'Área VIP'],
    popular: true,
  },
  {
    id: 3,
    nome: 'Família',
    descricao: 'Para até 4 pessoas da mesma família',
    valor: 299.90,
    duracao: 1,
    beneficios: ['Tudo do Premium', 'Até 4 pessoas', 'Desconto especial', 'Horário estendido'],
    popular: false,
  },
];

export const Planos: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos</h1>
          <p className="text-muted-foreground">
            Gerencie os planos de assinatura da academia
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPlanos.map((plano) => (
          <Card key={plano.id} className={`relative ${plano.popular ? 'border-primary shadow-lg' : ''}`}>
            {plano.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                Mais Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plano.nome}</CardTitle>
              <CardDescription>{plano.descricao}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">R$ {plano.valor.toFixed(2).replace('.', ',')}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plano.beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{beneficio}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Editar Plano
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
