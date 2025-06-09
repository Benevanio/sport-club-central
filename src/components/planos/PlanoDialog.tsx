
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  valor_mensal: number;
  duracao_meses: number;
}

interface PlanoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plano?: Plano | null;
  onSuccess: () => void;
}

export const PlanoDialog: React.FC<PlanoDialogProps> = ({
  open,
  onOpenChange,
  plano,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor_mensal: '',
    duracao_meses: '1',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plano) {
      setFormData({
        nome: plano.nome,
        descricao: plano.descricao || '',
        valor_mensal: plano.valor_mensal.toString(),
        duracao_meses: plano.duracao_meses.toString(),
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        valor_mensal: '',
        duracao_meses: '1',
      });
    }
  }, [plano, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const planoData = {
        nome: formData.nome,
        descricao: formData.descricao || null,
        valor_mensal: parseFloat(formData.valor_mensal),
        duracao_meses: parseInt(formData.duracao_meses),
      };

      if (plano) {
        // Editar plano existente
        const { error } = await supabase
          .from('planos')
          .update(planoData)
          .eq('id', plano.id);

        if (error) {
          toast.error('Erro ao atualizar plano');
          return;
        }

        toast.success('Plano atualizado com sucesso!');
      } else {
        // Criar novo plano
        const { error } = await supabase
          .from('planos')
          .insert([planoData]);

        if (error) {
          toast.error('Erro ao criar plano');
          return;
        }

        toast.success('Plano criado com sucesso!');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      toast.error('Erro interno do servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-green-700">
            {plano ? 'Editar Plano' : 'Novo Plano'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Plano</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Plano Premium"
              required
              className="border-gray-300 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva os benefícios do plano..."
              className="border-gray-300 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor_mensal">Valor Mensal (R$)</Label>
              <Input
                id="valor_mensal"
                type="number"
                step="0.01"
                value={formData.valor_mensal}
                onChange={(e) => setFormData({ ...formData, valor_mensal: e.target.value })}
                placeholder="89.90"
                required
                className="border-gray-300 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracao_meses">Duração (meses)</Label>
              <Input
                id="duracao_meses"
                type="number"
                min="1"
                value={formData.duracao_meses}
                onChange={(e) => setFormData({ ...formData, duracao_meses: e.target.value })}
                required
                className="border-gray-300 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? 'Salvando...' : (plano ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
