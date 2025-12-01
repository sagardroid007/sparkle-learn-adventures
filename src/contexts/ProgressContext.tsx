import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizResult {
  courseId: string;
  score: number;
  passed: boolean;
  timestamp: number;
}

interface Badge {
  id: string;
  title: string;
  icon: string;
  earned: boolean;
  earnedAt?: number;
}

interface ProgressContextType {
  quizResults: QuizResult[];
  badges: Badge[];
  addQuizResult: (result: QuizResult) => void;
  earnBadge: (badgeId: string) => void;
  hasPassedQuiz: (courseId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  { id: 'math-star', title: 'Math Star', icon: '⭐', earned: false },
  { id: 'science-explorer', title: 'Science Explorer', icon: '🔬', earned: false },
  { id: 'english-champion', title: 'English Champion', icon: '📚', earned: false },
  { id: 'streak-master', title: 'Streak Master', icon: '🔥', earned: false },
  { id: 'quiz-master', title: 'Quiz Master', icon: '🏆', earned: false },
];

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  const addQuizResult = (result: QuizResult) => {
    setQuizResults(prev => [...prev, result]);
    
    // Auto-earn badges based on performance
    if (result.passed && result.score >= 90) {
      earnBadge('quiz-master');
    }
  };

  const earnBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(badge =>
        badge.id === badgeId && !badge.earned
          ? { ...badge, earned: true, earnedAt: Date.now() }
          : badge
      )
    );
  };

  const hasPassedQuiz = (courseId: string) => {
    return quizResults.some(result => result.courseId === courseId && result.passed);
  };

  return (
    <ProgressContext.Provider value={{ quizResults, badges, addQuizResult, earnBadge, hasPassedQuiz }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
