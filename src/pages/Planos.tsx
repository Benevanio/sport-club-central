
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Check, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PlanoDialog } from '@/components/planos/PlanoDialog';
import { useAuth } from '@/contexts/AuthContext';

interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  valor_mensal: number;
  duracao_meses: number;
}

export const Planos: React.FC = () => {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlano, setEditingPlano] = useState<Plano | null>(null);
  const { userProfile } = useAuth();

  const canManagePlanos = userProfile?.tipo === 'admin' || userProfile?.tipo === 'funcionario';

  useEffect(() => {
    fetchPlanos();
  }, []);

  const fetchPlanos = async () => {
    try {
      const { data, error } = await supabase
        .from('planos')
        .select('*')
        .order('valor_mensal', { ascending: true });

      if (error) {
        toast.error('Erro ao carregar planos');
        return;
      }

      setPlanos(data || []);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      toast.error('Erro interno do servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlano = () => {
    setEditingPlano(null);
    setDialogOpen(true);
  };

  const handleEditPlano = (plano: Plano) => {
    setEditingPlano(plano);
    setDialogOpen(true);
  };

  const handleDeletePlano = async (planoId: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('planos')
        .delete()
        .eq('id', planoId);

      if (error) {
        toast.error('Erro ao excluir plano');
        return;
      }

      toast.success('Plano excluído com sucesso!');
      fetchPlanos();
    } catch (error) {
      console.error('Erro ao excluir plano:', error);
      toast.error('Erro interno do servidor');
    }
  };

  const getBeneficiosPlano = (plano: Plano) => {
    const beneficios = ['Acesso completo à academia'];
    
    if (plano.nome.toLowerCase().includes('premium')) {
      beneficios.push('Aulas coletivas', 'Personal trainer', 'Área VIP');
    } else if (plano.nome.toLowerCase().includes('família')) {
      beneficios.push('Até 4 pessoas', 'Aulas coletivas', 'Horário estendido');
    } else if (plano.nome.toLowerCase().includes('básico')) {
      beneficios.push('Musculação', 'Cardio', 'Vestiário');
    } else if (plano.duracao_meses > 1) {
      beneficios.push('Desconto especial', 'Sem taxa de matrícula');
    }

    return beneficios;
  };

  const isPopular = (plano: Plano) => {
    return plano.nome.toLowerCase().includes('premium');
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Planos</h1>
          <p className="text-gray-600">
            Gerencie os planos de assinatura da academia
          </p>
        </div>
        {canManagePlanos && (
          <Button
            onClick={handleCreatePlano}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {planos.map((plano) => (
          <Card 
            key={plano.id} 
            className={`relative transition-all hover:shadow-lg ${
              isPopular(plano) 
                ? 'border-green-400 shadow-lg ring-2 ring-green-200' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            {isPopular(plano) && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600">
                Mais Popular
              </Badge>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl text-gray-900">{plano.nome}</CardTitle>
              <CardDescription className="text-gray-600">
                {plano.descricao || 'Plano personalizado para suas necessidades'}
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-green-600">
                  R$ {plano.valor_mensal.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-gray-500">
                  /{plano.duracao_meses === 1 ? 'mês' : `${plano.duracao_meses} meses`}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {getBeneficiosPlano(plano).map((beneficio, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{beneficio}</span>
                  </div>
                ))}
              </div>
              
              {canManagePlanos && (
                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                    onClick={() => handleEditPlano(plano)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeletePlano(plano.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <PlanoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        plano={editingPlano}
        onSuccess={fetchPlanos}
      />
    </div>
  );
};
