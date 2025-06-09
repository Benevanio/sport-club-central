
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit } from 'lucide-react';

const mockFuncionarios = [
  {
    id: 1,
    nome: 'Carlos Ferreira',
    email: 'carlos@academia.com',
    cargo: 'Personal Trainer',
    salario: 3500,
    status: 'Ativo',
    dataAdmissao: '15/01/2023',
  },
  {
    id: 2,
    nome: 'Ana Paula',
    email: 'ana@academia.com',
    cargo: 'Recepcionista',
    salario: 2200,
    status: 'Ativo',
    dataAdmissao: '10/03/2023',
  },
  {
    id: 3,
    nome: 'Roberto Lima',
    email: 'roberto@academia.com',
    cargo: 'Instrutor',
    salario: 2800,
    status: 'Ativo',
    dataAdmissao: '05/06/2023',
  },
];

export const Funcionarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFuncionarios = mockFuncionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>
          <p className="text-muted-foreground">
            Gerencie a equipe da academia
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Funcionário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os funcionários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredFuncionarios.map((funcionario) => (
              <Card key={funcionario.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{funcionario.nome}</p>
                      <p className="text-sm text-muted-foreground">{funcionario.email}</p>
                      <p className="text-sm text-muted-foreground">{funcionario.cargo}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">R$ {funcionario.salario.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-muted-foreground">Salário</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={funcionario.status === 'Ativo' ? 'default' : 'destructive'}>
                        {funcionario.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{funcionario.dataAdmissao}</p>
                      <p className="text-sm text-muted-foreground">Admissão</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
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
