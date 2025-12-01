import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Gamepad2, Trophy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { AIHelper } from '@/components/AIHelper';
import heroBg from '@/assets/hero-bg.jpg';
import mascot from '@/assets/mascot.jpg';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Start Learning',
      description: 'Explore amazing courses!',
      color: 'from-primary to-blue-400',
      path: '/courses'
    },
    {
      icon: Gamepad2,
      title: 'Play Games',
      description: 'Fun educational games!',
      color: 'from-secondary to-pink-400',
      path: '/games'
    },
    {
      icon: Trophy,
      title: 'My Rewards',
      description: 'See your achievements!',
      color: 'from-accent to-orange-400',
      path: '/rewards'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <section 
          className="relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-[3rem] mx-4 mb-12"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80" />
          
          <div className="relative z-10 text-center px-4 py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mb-8"
            >
              <img 
                src={mascot} 
                alt="Learning Mascot" 
                className="w-48 h-48 mx-auto rounded-full border-8 border-background shadow-2xl"
              />
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-7xl font-black text-background mb-4"
            >
              Welcome to LearnFun! 🎉
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-background mb-8"
            >
              Where Every Day is an Adventure!
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Button
                  onClick={() => navigate(feature.path)}
                  variant="default"
                  className={`w-full h-auto p-8 flex flex-col items-center gap-4 bg-gradient-to-br ${feature.color} border-0 shadow-2xl`}
                >
                  <feature.icon className="w-16 h-16" />
                  <div>
                    <h3 className="text-2xl font-black mb-2">{feature.title}</h3>
                    <p className="text-lg opacity-90">{feature.description}</p>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-success text-success-foreground px-8 py-4 rounded-full shadow-xl">
              <p className="text-2xl font-black">
                🌟 Keep learning and have fun! 🌟
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AIHelper />
    </div>
  );
}
