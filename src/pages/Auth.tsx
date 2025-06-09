
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleForgotPassword = () => {
    setMode('forgot');
  };

  const handleBackToLogin = () => {
    setMode('login');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Email enviado!",
      description: "Verifique sua caixa de entrada para redefinir sua senha",
    });
    setMode('login');
  };

  if (mode === 'forgot') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Recuperar Senha</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Digite seu email para receber as instruções
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Instruções
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm text-primary hover:underline"
              >
                Voltar ao login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">AcademyPro</h1>
          <p className="text-muted-foreground">Sistema de Gerenciamento de Academias</p>
        </div>
        
        {mode === 'login' ? (
          <LoginForm onToggleMode={handleToggleMode} onForgotPassword={handleForgotPassword} />
        ) : (
          <RegisterForm onToggleMode={handleToggleMode} />
        )}
      </div>
    </div>
  );
};
