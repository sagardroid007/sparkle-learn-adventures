import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { UserCircle, Shield } from 'lucide-react';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  childAge: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      childAge: '8',
    },
  });

  const handleLogin = (role: 'parent' | 'admin') => {
    form.handleSubmit((data) => {
      login(data.email, data.password, role, role === 'parent' ? parseInt(data.childAge || '8') : undefined);
      navigate('/home');
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-6xl sm:text-8xl mb-3 sm:mb-4"
          >
            🦉
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-primary mb-2">LearnFun</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">Where Learning is an Adventure!</p>
        </div>

        <Form {...form}>
          <Tabs defaultValue="parent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 p-1 bg-muted rounded-3xl">
              <TabsTrigger value="parent" className="rounded-2xl text-sm sm:text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <UserCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Parent</span> Login
              </TabsTrigger>
              <TabsTrigger value="admin" className="rounded-2xl text-sm sm:text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Admin</span> Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parent">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-card p-5 sm:p-8 rounded-3xl shadow-xl border-4 border-primary space-y-4 sm:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-bold">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="parent@example.com"
                          className="h-11 sm:h-12 rounded-2xl border-2 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-bold">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 sm:h-12 rounded-2xl border-2 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="childAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-bold">Child's Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="6"
                          max="15"
                          className="h-11 sm:h-12 rounded-2xl border-2 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                className="bg-card p-5 sm:p-8 rounded-3xl shadow-xl border-4 border-primary space-y-4 sm:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-bold">Admin Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          className="h-11 sm:h-12 rounded-2xl border-2 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-bold">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 sm:h-12 rounded-2xl border-2 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
        </Form>
      </motion.div>
    </div>
  );
}
