
# AcademyPro - Sistema de Gerenciamento de Academias

Um sistema completo e moderno para gerenciamento de academias, desenvolvido com React, TypeScript, Tailwind CSS e integração com Supabase.

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- Login, logout e cadastro de usuários
- Recuperação de senha
- Diferenciação de perfis (Admin, Funcionário, Aluno)
- Proteção de rotas por tipo de usuário

### 👥 Gerenciamento de Alunos
- Cadastro completo de alunos
- Consulta e edição de informações
- Controle de matrículas ativas/vencidas
- Histórico de pagamentos

### 💼 Gerenciamento de Funcionários
- Cadastro de funcionários
- Controle de cargos e salários
- Gestão de pagamentos mensais

### 📋 Planos e Assinaturas
- CRUD completo de planos
- Planos mensais, trimestrais e anuais
- Gestão de benefícios por plano

### 💰 Sistema de Pagamentos
- Controle de mensalidades
- Integração com Stripe (requer configuração)
- Geração de recibos
- Dashboard financeiro

### 📊 Dashboard Interativo
- Métricas em tempo real
- Gráficos de receita
- Alertas de vencimentos
- Visão geral do negócio

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router DOM
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Gerenciamento de Estado**: React Context
- **Notificações**: Toast/Sonner

## ⚠️ Configuração Importante

### Para funcionalidade completa, você precisa:

1. **Conectar ao Supabase**
   - Clique no botão verde "Supabase" no topo da interface
   - Configure as tabelas do banco de dados
   - Ative a autenticação

2. **Estrutura do Banco de Dados**
   ```sql
   -- Tabelas necessárias:
   - usuarios (id, nome, email, tipo)
   - alunos (id, nome, cpf, telefone, endereco, plano_id)
   - funcionarios (id, nome, cargo, salario, status)
   - planos (id, nome, valor_mensal, duracao_meses)
   - matriculas (id, aluno_id, data_inicio, data_fim, status)
   - pagamentos (id, aluno_id, valor, data_pagamento, status)
   - pagamento_funcionarios (id, funcionario_id, valor, data_pagamento)
   ```

3. **Integração com Stripe (Opcional)**
   - Configure sua conta Stripe
   - Adicione as chaves de API
   - Configure webhooks para pagamentos

## 🎨 Design e Interface

- Interface responsiva para desktop e mobile
- Design moderno com tema customizável
- Componentes reutilizáveis
- Experiência de usuário otimizada
- Navegação intuitiva

## 📱 Recursos Extras

- PWA (Progressive Web App) ready
- Exportação de relatórios (implementação futura)
- Notificações em tempo real
- Modo offline básico

## 🚀 Como Usar

1. **Primeiro Acesso**
   - Configure a integração com Supabase
   - Crie as tabelas do banco de dados
   - Configure a autenticação

2. **Administração**
   - Cadastre funcionários e planos
   - Configure permissões de usuário
   - Monitore métricas no dashboard

3. **Operação Diária**
   - Cadastre novos alunos
   - Gerencie matrículas e renovações
   - Controle pagamentos e vencimentos

## 🔗 Links Úteis

- [Documentação do Supabase](https://docs.lovable.dev/integrations/supabase/)
- [Configuração do Stripe](https://stripe.com/docs)
- [Guia de Deploy](https://docs.lovable.dev/tips-tricks/custom-domain)

---

**Nota**: Este sistema está configurado para demonstração. Para uso em produção, configure a integração com Supabase e personalize conforme suas necessidades.
