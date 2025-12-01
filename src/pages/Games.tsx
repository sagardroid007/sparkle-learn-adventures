import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AIHelper } from '@/components/AIHelper';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Gamepad2 } from 'lucide-react';

export default function Games() {
  const { hasPassedQuiz } = useProgress();
  const navigate = useNavigate();

  const games = [
    {
      id: 'matching',
      title: 'Matching Game 🎴',
      description: 'Match pairs and test your memory!',
      color: 'from-primary to-blue-400',
      requiredCourse: 'math-adventure',
    },
    {
      id: 'memory',
      title: 'Memory Cards 🃏',
      description: 'Flip cards and find matches!',
      color: 'from-secondary to-pink-400',
      requiredCourse: 'science-quest',
    },
    {
      id: 'puzzle',
      title: 'Word Puzzle 🧩',
      description: 'Complete the word puzzles!',
      color: 'from-accent to-orange-400',
      requiredCourse: 'english-fun',
    },
  ];

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
            <h1 className="text-6xl font-black text-primary mb-4">
              Fun Games! 🎮
            </h1>
            <p className="text-2xl text-muted-foreground font-bold">
              Complete quizzes to unlock games!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game, index) => {
              const isLocked = !hasPassedQuiz(game.requiredCourse);
              
              return (
                <motion.div
                  key={game.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isLocked ? 1 : 1.05 }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-br ${game.color} rounded-3xl p-8 shadow-2xl border-4 border-background ${isLocked ? 'opacity-50' : ''}`}>
                    <div className="text-center">
                      <div className="text-7xl mb-4">
                        {isLocked ? <Lock className="w-20 h-20 mx-auto text-background" /> : <Gamepad2 className="w-20 h-20 mx-auto text-background" />}
                      </div>
                      
                      <h3 className="text-3xl font-black mb-3 text-background">
                        {game.title}
                      </h3>
                      
                      <p className="text-xl font-bold mb-6 text-background/90">
                        {game.description}
                      </p>

                      {isLocked ? (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => navigate(`/quiz/${game.requiredCourse}`)}
                          className="w-full bg-background hover:bg-background/90"
                        >
                          Complete Quiz First
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full bg-background hover:bg-background/90"
                        >
                          Play Now!
                        </Button>
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
            transition={{ delay: 0.5 }}
            className="mt-12 text-center bg-muted rounded-3xl p-8"
          >
            <p className="text-2xl font-black text-foreground">
              💡 Tip: Score 60% or higher in quizzes to unlock games!
            </p>
          </motion.div>
        </div>
      </div>

      <AIHelper />
    </div>
  );
}
