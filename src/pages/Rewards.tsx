import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { BadgeCard } from '@/components/BadgeCard';
import { AIHelper } from '@/components/AIHelper';
import { useProgress } from '@/contexts/ProgressContext';
import { Progress } from '@/components/ui/progress';

export default function Rewards() {
  const { badges, quizResults } = useProgress();
  const totalBadges = badges.length;
  const earnedBadges = badges.filter(b => b.earned).length;
  const progress = (earnedBadges / totalBadges) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-4">
              Your Rewards! 🏆
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-bold">
              Collect badges and celebrate success!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-5 sm:p-8 mb-8 sm:mb-12 shadow-2xl"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-foreground mb-2">
                Badge Collection
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground/90">
                {earnedBadges} of {totalBadges} earned
              </p>
            </div>
            
            <Progress value={progress} className="h-6" />
            
            <div className="text-center mt-4 text-base sm:text-lg md:text-xl font-bold text-primary-foreground">
              {progress}% Complete!
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BadgeCard {...badge} />
              </motion.div>
            ))}
          </div>

          {quizResults.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-primary"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-foreground">Recent Activity 📊</h2>

              <div className="space-y-3 sm:space-y-4">
                {quizResults.slice(-5).reverse().map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ${
                      result.passed ? 'bg-success/20' : 'bg-muted'
                    }`}
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {result.courseId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-black text-foreground">
                        {result.score.toFixed(0)}%
                      </div>
                      <div className="text-base sm:text-xl">
                        {result.passed ? '✅ Passed!' : '📚 Keep trying!'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AIHelper />
    </div>
  );
}
