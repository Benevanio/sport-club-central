
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit } from 'lucide-react';

const mockAlunos = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    plano: 'Premium',
    status: 'Ativo',
    dataMatricula: '15/01/2024',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 88888-8888',
    plano: 'Básico',
    status: 'Ativo',
    dataMatricula: '10/02/2024',
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro@email.com',
    telefone: '(11) 77777-7777',
    plano: 'Premium',
    status: 'Vencido',
    dataMatricula: '05/03/2024',
  },
];

export const Alunos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlunos = mockAlunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alunos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os alunos da academia
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os alunos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar alunos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredAlunos.map((aluno) => (
              <Card key={aluno.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{aluno.nome}</p>
                      <p className="text-sm text-muted-foreground">{aluno.email}</p>
                      <p className="text-sm text-muted-foreground">{aluno.telefone}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{aluno.plano}</p>
                      <p className="text-sm text-muted-foreground">Plano</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={aluno.status === 'Ativo' ? 'default' : 'destructive'}>
                        {aluno.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{aluno.dataMatricula}</p>
                      <p className="text-sm text-muted-foreground">Matrícula</p>
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
