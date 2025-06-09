
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  Settings, 
  Calendar,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Alunos',
    icon: Search,
    href: '/alunos',
  },
  {
    title: 'Funcionários',
    icon: Settings,
    href: '/funcionarios',
  },
  {
    title: 'Planos',
    icon: Calendar,
    href: '/planos',
  },
  {
    title: 'Pagamentos',
    icon: Calendar,
    href: '/pagamentos',
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="pb-12 w-64 bg-card border-r border-border">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AcademyPro
          </h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-secondary"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};
