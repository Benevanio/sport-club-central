export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alunos: {
        Row: {
          cpf: string | null
          created_at: string
          data_nascimento: string | null
          endereco: string | null
          foto: string | null
          id: string
          nome: string
          observacoes: string | null
          plano_id: string | null
          telefone: string | null
          updated_at: string
          usuario_id: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          data_nascimento?: string | null
          endereco?: string | null
          foto?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          plano_id?: string | null
          telefone?: string | null
          updated_at?: string
          usuario_id?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string
          data_nascimento?: string | null
          endereco?: string | null
          foto?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          plano_id?: string | null
          telefone?: string | null
          updated_at?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alunos_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_academia: {
        Row: {
          cnpj: string | null
          created_at: string
          email: string | null
          endereco: string | null
          horario_funcionamento: string | null
          id: string
          logo_url: string | null
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          horario_funcionamento?: string | null
          id?: string
          logo_url?: string | null
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          horario_funcionamento?: string | null
          id?: string
          logo_url?: string | null
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          cargo: string
          cpf: string | null
          created_at: string
          data_contratacao: string | null
          foto: string | null
          id: string
          nome: string
          observacoes: string | null
          salario: number | null
          status: Database["public"]["Enums"]["funcionario_status"] | null
          updated_at: string
          usuario_id: string | null
        }
        Insert: {
          cargo: string
          cpf?: string | null
          created_at?: string
          data_contratacao?: string | null
          foto?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["funcionario_status"] | null
          updated_at?: string
          usuario_id?: string | null
        }
        Update: {
          cargo?: string
          cpf?: string | null
          created_at?: string
          data_contratacao?: string | null
          foto?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["funcionario_status"] | null
          updated_at?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas: {
        Row: {
          aluno_id: string | null
          created_at: string
          data_fim: string
          data_inicio: string
          id: string
          plano_id: string | null
          status: Database["public"]["Enums"]["matricula_status"] | null
          updated_at: string
          valor_pago: number | null
        }
        Insert: {
          aluno_id?: string | null
          created_at?: string
          data_fim: string
          data_inicio?: string
          id?: string
          plano_id?: string | null
          status?: Database["public"]["Enums"]["matricula_status"] | null
          updated_at?: string
          valor_pago?: number | null
        }
        Update: {
          aluno_id?: string | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          id?: string
          plano_id?: string | null
          status?: Database["public"]["Enums"]["matricula_status"] | null
          updated_at?: string
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamento_funcionarios: {
        Row: {
          created_at: string
          data_pagamento: string | null
          funcionario_id: string | null
          id: string
          metodo_pagamento: string | null
          observacoes: string | null
          status: Database["public"]["Enums"]["pagamento_status"] | null
          updated_at: string
          valor: number
        }
        Insert: {
          created_at?: string
          data_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          status?: Database["public"]["Enums"]["pagamento_status"] | null
          updated_at?: string
          valor: number
        }
        Update: {
          created_at?: string
          data_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          status?: Database["public"]["Enums"]["pagamento_status"] | null
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_funcionarios_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          aluno_id: string | null
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          id: string
          matricula_id: string | null
          metodo_pagamento: string | null
          recibo_url: string | null
          status: Database["public"]["Enums"]["pagamento_status"] | null
          stripe_payment_id: string | null
          updated_at: string
          valor: number
        }
        Insert: {
          aluno_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          id?: string
          matricula_id?: string | null
          metodo_pagamento?: string | null
          recibo_url?: string | null
          status?: Database["public"]["Enums"]["pagamento_status"] | null
          stripe_payment_id?: string | null
          updated_at?: string
          valor: number
        }
        Update: {
          aluno_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          id?: string
          matricula_id?: string | null
          metodo_pagamento?: string | null
          recibo_url?: string | null
          status?: Database["public"]["Enums"]["pagamento_status"] | null
          stripe_payment_id?: string | null
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_matricula_id_fkey"
            columns: ["matricula_id"]
            isOneToOne: false
            referencedRelation: "matriculas"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          created_at: string
          descricao: string | null
          duracao_meses: number
          id: string
          nome: string
          updated_at: string
          valor_mensal: number
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          duracao_meses: number
          id?: string
          nome: string
          updated_at?: string
          valor_mensal: number
        }
        Update: {
          created_at?: string
          descricao?: string | null
          duracao_meses?: number
          id?: string
          nome?: string
          updated_at?: string
          valor_mensal?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          tipo: Database["public"]["Enums"]["user_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nome: string
          tipo?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          tipo?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      funcionario_status: "ativo" | "inativo"
      matricula_status: "ativa" | "vencida" | "cancelada"
      pagamento_status: "pago" | "pendente" | "atrasado"
      user_type: "admin" | "funcionario" | "aluno"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      funcionario_status: ["ativo", "inativo"],
      matricula_status: ["ativa", "vencida", "cancelada"],
      pagamento_status: ["pago", "pendente", "atrasado"],
      user_type: ["admin", "funcionario", "aluno"],
    },
  },
} as const
