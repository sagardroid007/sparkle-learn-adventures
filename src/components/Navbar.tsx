import { Home, BookOpen, Gamepad2, Trophy, BarChart3, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/courses', icon: BookOpen, label: 'Learn' },
    { to: '/games', icon: Gamepad2, label: 'Games' },
    { to: '/rewards', icon: Trophy, label: 'Rewards' },
  ];

  if (user.role === 'parent' || user.role === 'admin') {
    navItems.push({ to: '/dashboard', icon: BarChart3, label: 'Dashboard' });
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card border-b-4 border-primary shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
            🦉
          </div>
          <span className="text-2xl font-black text-primary">LearnFun</span>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all hover:scale-105"
              activeClassName="bg-primary text-primary-foreground shadow-lg scale-105"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-bold">{item.label}</span>
            </NavLink>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="ml-4"
          >
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
