import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { UserCircle, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childAge, setChildAge] = useState('8');

  const handleLogin = (role: 'parent' | 'admin') => {
    login(email, password, role, role === 'parent' ? parseInt(childAge) : undefined);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-8xl mb-4"
          >
            🦉
          </motion.div>
          <h1 className="text-5xl font-black text-primary mb-2">LearnFun</h1>
          <p className="text-xl text-muted-foreground">Where Learning is an Adventure!</p>
        </div>

        <Tabs defaultValue="parent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted rounded-3xl">
            <TabsTrigger value="parent" className="rounded-2xl text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserCircle className="w-5 h-5 mr-2" />
              Parent Login
            </TabsTrigger>
            <TabsTrigger value="admin" className="rounded-2xl text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-5 h-5 mr-2" />
              Admin Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parent">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card p-8 rounded-3xl shadow-xl border-4 border-primary space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="parent-email" className="text-lg font-bold">Email</Label>
                <Input
                  id="parent-email"
                  type="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent-password" className="text-lg font-bold">Password</Label>
                <Input
                  id="parent-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="child-age" className="text-lg font-bold">Child's Age</Label>
                <Input
                  id="child-age"
                  type="number"
                  min="6"
                  max="15"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="h-12 rounded-2xl border-2 text-base"
                />
              </div>

              <Button
                onClick={() => handleLogin('parent')}
                variant="default"
                size="lg"
                className="w-full"
              >
                Login as Parent
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="admin">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card p-8 rounded-3xl shadow-xl border-4 border-primary space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-lg font-bold">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-lg font-bold">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 text-base"
                />
              </div>

              <Button
                onClick={() => handleLogin('admin')}
                variant="default"
                size="lg"
                className="w-full"
              >
                Login as Admin
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
