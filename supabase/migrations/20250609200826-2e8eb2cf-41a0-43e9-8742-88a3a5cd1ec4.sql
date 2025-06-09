
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_type AS ENUM ('admin', 'funcionario', 'aluno');
CREATE TYPE matricula_status AS ENUM ('ativa', 'vencida', 'cancelada');
CREATE TYPE pagamento_status AS ENUM ('pago', 'pendente', 'atrasado');
CREATE TYPE funcionario_status AS ENUM ('ativo', 'inativo');

-- Create usuarios table (profiles)
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  tipo user_type NOT NULL DEFAULT 'aluno',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create planos table
CREATE TABLE public.planos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  valor_mensal DECIMAL(10,2) NOT NULL,
  duracao_meses INTEGER NOT NULL,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alunos table
CREATE TABLE public.alunos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE,
  data_nascimento DATE,
  telefone TEXT,
  endereco TEXT,
  plano_id UUID REFERENCES public.planos(id),
  foto TEXT,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create funcionarios table
CREATE TABLE public.funcionarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE,
  cargo TEXT NOT NULL,
  salario DECIMAL(10,2),
  data_contratacao DATE DEFAULT CURRENT_DATE,
  status funcionario_status DEFAULT 'ativo',
  foto TEXT,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create matriculas table
CREATE TABLE public.matriculas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  plano_id UUID REFERENCES public.planos(id),
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE NOT NULL,
  status matricula_status DEFAULT 'ativa',
  valor_pago DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create pagamentos table
CREATE TABLE public.pagamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  matricula_id UUID REFERENCES public.matriculas(id),
  valor DECIMAL(10,2) NOT NULL,
  data_vencimento DATE NOT NULL,
  data_pagamento DATE,
  status pagamento_status DEFAULT 'pendente',
  metodo_pagamento TEXT,
  stripe_payment_id TEXT,
  recibo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create pagamento_funcionarios table
CREATE TABLE public.pagamento_funcionarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funcionario_id UUID REFERENCES public.funcionarios(id) ON DELETE CASCADE,
  valor DECIMAL(10,2) NOT NULL,
  data_pagamento DATE DEFAULT CURRENT_DATE,
  status pagamento_status DEFAULT 'pendente',
  metodo_pagamento TEXT,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create configuracoes_academia table
CREATE TABLE public.configuracoes_academia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  cnpj TEXT,
  endereco TEXT,
  telefone TEXT,
  email TEXT,
  horario_funcionamento TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriculas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamento_funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes_academia ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for usuarios
CREATE POLICY "Users can view their own profile" ON public.usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.usuarios
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins and funcionarios can view all users" ON public.usuarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo IN ('admin', 'funcionario')
    )
  );

-- Create RLS policies for alunos
CREATE POLICY "Admins and funcionarios can manage alunos" ON public.alunos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo IN ('admin', 'funcionario')
    )
  );

CREATE POLICY "Alunos can view their own data" ON public.alunos
  FOR SELECT USING (usuario_id = auth.uid());

-- Create RLS policies for funcionarios
CREATE POLICY "Admins can manage funcionarios" ON public.funcionarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo = 'admin'
    )
  );

CREATE POLICY "Funcionarios can view their own data" ON public.funcionarios
  FOR SELECT USING (usuario_id = auth.uid());

-- Create RLS policies for planos
CREATE POLICY "Everyone can view planos" ON public.planos
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and funcionarios can manage planos" ON public.planos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo IN ('admin', 'funcionario')
    )
  );

-- Create RLS policies for matriculas
CREATE POLICY "Admins and funcionarios can manage matriculas" ON public.matriculas
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo IN ('admin', 'funcionario')
    )
  );

CREATE POLICY "Alunos can view their own matriculas" ON public.matriculas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.alunos 
      WHERE id = matriculas.aluno_id AND usuario_id = auth.uid()
    )
  );

-- Create RLS policies for pagamentos
CREATE POLICY "Admins and funcionarios can manage pagamentos" ON public.pagamentos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo IN ('admin', 'funcionario')
    )
  );

CREATE POLICY "Alunos can view their own pagamentos" ON public.pagamentos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.alunos 
      WHERE id = pagamentos.aluno_id AND usuario_id = auth.uid()
    )
  );

-- Create RLS policies for pagamento_funcionarios
CREATE POLICY "Admins can manage pagamento_funcionarios" ON public.pagamento_funcionarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo = 'admin'
    )
  );

CREATE POLICY "Funcionarios can view their own pagamentos" ON public.pagamento_funcionarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.funcionarios 
      WHERE id = pagamento_funcionarios.funcionario_id AND usuario_id = auth.uid()
    )
  );

-- Create RLS policies for configuracoes_academia
CREATE POLICY "Everyone can view configuracoes" ON public.configuracoes_academia
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage configuracoes" ON public.configuracoes_academia
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.usuarios 
      WHERE id = auth.uid() AND tipo = 'admin'
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, nome, email, tipo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'aluno'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data
INSERT INTO public.planos (nome, valor_mensal, duracao_meses, descricao) VALUES
  ('Básico', 89.90, 1, 'Acesso à musculação e área cardio'),
  ('Premium', 149.90, 1, 'Inclui aulas coletivas e personal trainer'),
  ('Família', 299.90, 1, 'Para até 4 pessoas da mesma família'),
  ('Trimestral', 129.90, 3, 'Plano trimestral com desconto especial'),
  ('Anual', 99.90, 12, 'Plano anual com máximo desconto');

-- Insert sample academia configuration
INSERT INTO public.configuracoes_academia (nome, cnpj, endereco, telefone, email, horario_funcionamento) VALUES
  ('AcademyPro', '12.345.678/0001-99', 'Rua das Academias, 123 - Centro', '(11) 99999-9999', 'contato@academypro.com', 'Segunda a Sexta: 5h às 23h | Sábado: 6h às 20h | Domingo: 8h às 18h');
