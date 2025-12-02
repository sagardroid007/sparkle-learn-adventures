import { useState } from 'react';
import { Home, BookOpen, Gamepad2, Trophy, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card border-b-4 border-primary shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-primary-foreground shadow-lg">
            🦉
          </div>
          <span className="text-xl sm:text-2xl font-black text-primary">LearnFun</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t-2 border-primary/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-muted"
                  activeClassName="bg-primary text-primary-foreground shadow-lg"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-base font-bold">{item.label}</span>
                </NavLink>
              ))}

              <Button
                variant="ghost"
                onClick={() => { logout(); closeMenu(); }}
                className="flex items-center justify-start gap-3 px-4 py-3 h-auto rounded-2xl hover:bg-destructive/10 text-destructive"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-base font-bold">Logout</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
