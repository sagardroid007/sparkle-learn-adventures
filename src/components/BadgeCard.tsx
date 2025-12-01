import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface BadgeCardProps {
  icon: string;
  title: string;
  earned: boolean;
}

export function BadgeCard({ icon, title, earned }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: earned ? 1.1 : 1 }}
      className={`relative p-6 rounded-3xl border-4 ${
        earned
          ? 'border-success bg-success/10 shadow-lg'
          : 'border-border bg-muted opacity-50'
      }`}
    >
      <div className="text-6xl text-center mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-center text-foreground">{title}</h3>
      
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 w-10 h-10 bg-success rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="w-6 h-6 text-success-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
}
