import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, BookOpen, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { quizResults, badges } = useProgress();
  const { user } = useAuth();

  const earnedBadges = badges.filter(b => b.earned).length;
  const totalQuizzes = quizResults.length;
  const passedQuizzes = quizResults.filter(r => r.passed).length;
  const averageScore = quizResults.length > 0
    ? quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length
    : 0;

  const chartData = quizResults.slice(-5).map((result, index) => ({
    name: `Quiz ${index + 1}`,
    score: result.score,
  }));

  const stats = [
    { title: 'Badges Earned', value: earnedBadges, icon: Trophy, color: 'from-accent to-orange-400' },
    { title: 'Quizzes Completed', value: totalQuizzes, icon: BookOpen, color: 'from-primary to-blue-400' },
    { title: 'Quizzes Passed', value: passedQuizzes, icon: Target, color: 'from-success to-green-400' },
    { title: 'Average Score', value: `${averageScore.toFixed(0)}%`, icon: TrendingUp, color: 'from-secondary to-pink-400' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-2">
              Learning Dashboard 📊
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-bold">
              Track {user?.role === 'admin' ? 'student' : 'your child\'s'} progress and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-4 border-primary shadow-xl bg-gradient-to-br ${stat.color} overflow-hidden`}>
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="text-sm sm:text-base md:text-lg font-bold text-background flex items-center gap-1 sm:gap-2">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="truncate">{stat.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-background">
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-4 border-primary shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
                  Recent Quiz Performance 📈
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 sm:h-64 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground text-center px-4">
                    No quiz data yet! Start learning to see progress here. 🎯
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
