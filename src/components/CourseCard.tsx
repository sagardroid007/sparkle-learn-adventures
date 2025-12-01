import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  locked?: boolean;
}

export function CourseCard({ id, title, description, image, color, locked }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: locked ? 1 : 1.05, rotate: locked ? 0 : 2 }}
      whileTap={{ scale: locked ? 1 : 0.95 }}
      className={`relative overflow-hidden rounded-3xl shadow-xl cursor-pointer ${locked ? 'opacity-60' : ''}`}
      style={{ backgroundColor: color }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {locked && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center backdrop-blur-sm">
            <Lock className="w-16 h-16 text-background" />
          </div>
        )}
      </div>
      
      <div className="p-6 bg-card">
        <h3 className="text-2xl font-black mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => !locked && navigate(`/quiz/${id}`)}
          disabled={locked}
        >
          <Play className="w-5 h-5" />
          {locked ? 'Complete Previous Quiz' : 'Start Learning'}
        </Button>
      </div>
    </motion.div>
  );
}
