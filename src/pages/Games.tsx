import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AIHelper } from '@/components/AIHelper';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Gamepad2, Sparkles, Trophy, Zap } from 'lucide-react';

export default function Games() {
  const { hasPassedQuiz } = useProgress();
  const navigate = useNavigate();

  const games = [
    {
      id: 'matching',
      title: 'Matching Game',
      emoji: '🎴',
      description: 'Match pairs and test your memory!',
      color: 'from-primary to-blue-400',
      requiredCourse: 'math-adventure',
      path: '/games/matching',
      icon: Sparkles,
    },
    {
      id: 'memory',
      title: 'Memory Cards',
      emoji: '🃏',
      description: 'Flip cards and find matches!',
      color: 'from-secondary to-pink-400',
      requiredCourse: 'science-quest',
      path: '/games/memory',
      icon: Trophy,
    },
    {
      id: 'puzzle',
      title: 'Word Puzzle',
      emoji: '🧩',
      description: 'Complete the word puzzles!',
      color: 'from-accent to-orange-400',
      requiredCourse: 'english-fun',
      path: '/games/puzzle',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-4">
                Fun Games! 🎮
              </h1>
            </motion.div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-bold">
              Complete quizzes to unlock awesome games!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {games.map((game, index) => {
              const isLocked = !hasPassedQuiz(game.requiredCourse);
              const Icon = game.icon;
              
              return (
                <motion.div
                  key={game.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: isLocked ? 1 : 1.05, rotate: isLocked ? 0 : 2 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  {!isLocked && (
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${game.color} rounded-[2rem] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className={`relative bg-gradient-to-br ${game.color} rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-background overflow-hidden ${isLocked ? 'opacity-60 grayscale' : ''}`}>
                    {/* Animated background pattern */}
                    {!isLocked && (
                      <div className="absolute inset-0 opacity-20">
                        <motion.div
                          className="absolute top-0 left-0 w-32 h-32 bg-background rounded-full"
                          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                          transition={{ duration: 8, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-0 right-0 w-24 h-24 bg-background rounded-full"
                          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                      </div>
                    )}

                    <div className="relative text-center">
                      <motion.div
                        className="text-6xl sm:text-8xl mb-4"
                        animate={!isLocked ? { 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {isLocked ? (
                          <Lock className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-background" />
                        ) : (
                          <span className="drop-shadow-lg">{game.emoji}</span>
                        )}
                      </motion.div>

                      <h3 className="text-2xl sm:text-3xl font-black mb-3 text-background flex items-center justify-center gap-2">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        {game.title}
                      </h3>

                      <p className="text-base sm:text-xl font-bold mb-4 sm:mb-6 text-background/90">
                        {game.description}
                      </p>

                      {isLocked ? (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => navigate(`/quiz/${game.requiredCourse}`)}
                          className="w-full bg-background hover:bg-background/90 group"
                        >
                          <Lock className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                          Take Quiz to Unlock
                        </Button>
                      ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate(game.path)}
                            className="w-full bg-background hover:bg-background/90 group"
                          >
                            <Gamepad2 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                            Play Now!
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mt-8 sm:mt-12 text-center bg-gradient-to-r from-muted via-primary/10 to-muted rounded-3xl p-5 sm:p-8 border-4 border-dashed border-primary/30"
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-black text-foreground"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡 Tip: Score 60% or higher in quizzes to unlock games!
            </motion.p>
          </motion.div>
        </div>
      </div>

      <AIHelper />
    </div>
  );
}
