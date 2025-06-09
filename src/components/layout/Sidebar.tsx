
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar,
  CreditCard,
  LogOut,
  Settings
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
    icon: Users,
    href: '/alunos',
  },
  {
    title: 'Funcionários',
    icon: UserCheck,
    href: '/funcionarios',
  },
  {
    title: 'Planos',
    icon: Calendar,
    href: '/planos',
  },
  {
    title: 'Pagamentos',
    icon: CreditCard,
    href: '/pagamentos',
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, userProfile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="pb-12 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 px-4 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                AcademyPro
              </h2>
              {userProfile && (
                <p className="text-xs text-gray-500 capitalize">{userProfile.tipo}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-gray-700 hover:text-green-700 hover:bg-green-50",
                    isActive && "bg-green-100 text-green-700 border-r-2 border-green-500"
                  )}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              );
            })}
          </div>
        </div>
        
        <div className="px-3 py-2 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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
