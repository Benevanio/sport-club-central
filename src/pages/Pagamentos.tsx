
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar } from 'lucide-react';

const mockPagamentos = [
  {
    id: 1,
    aluno: 'João Silva',
    valor: 149.90,
    dataVencimento: '15/12/2024',
    dataPagamento: '14/12/2024',
    status: 'Pago',
    metodo: 'Cartão de Crédito',
    plano: 'Premium',
  },
  {
    id: 2,
    aluno: 'Maria Santos',
    valor: 89.90,
    dataVencimento: '20/12/2024',
    dataPagamento: null,
    status: 'Pendente',
    metodo: '-',
    plano: 'Básico',
  },
  {
    id: 3,
    aluno: 'Pedro Costa',
    valor: 149.90,
    dataVencimento: '10/12/2024',
    dataPagamento: null,
    status: 'Vencido',
    metodo: '-',
    plano: 'Premium',
  },
];

export const Pagamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPagamentos = mockPagamentos.filter(pagamento =>
    pagamento.aluno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pago':
        return 'default';
      case 'Pendente':
        return 'secondary';
      case 'Vencido':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
          <p className="text-muted-foreground">
            Controle financeiro e cobrança de mensalidades
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Registrar Pagamento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.245,80</div>
            <p className="text-xs text-muted-foreground">14 pagamentos pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos em Atraso</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 892,30</div>
            <p className="text-xs text-muted-foreground">6 pagamentos vencidos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>
            Visualize todos os pagamentos e cobranças
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredPagamentos.map((pagamento) => (
              <Card key={pagamento.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{pagamento.aluno}</p>
                      <p className="text-sm text-muted-foreground">{pagamento.plano}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">R$ {pagamento.valor.toFixed(2).replace('.', ',')}</p>
                      <p className="text-sm text-muted-foreground">Valor</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{pagamento.dataVencimento}</p>
                      <p className="text-sm text-muted-foreground">Vencimento</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{pagamento.dataPagamento || '-'}</p>
                      <p className="text-sm text-muted-foreground">Pagamento</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={getStatusVariant(pagamento.status)}>
                        {pagamento.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{pagamento.metodo}</p>
                      <p className="text-sm text-muted-foreground">Método</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
