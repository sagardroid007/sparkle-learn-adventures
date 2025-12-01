import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2, XCircle } from 'lucide-react';
import Confetti from 'react-confetti';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { addQuizResult } = useProgress();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Generate questions based on child's age
  const generateQuestions = (): Question[] => {
    const age = user?.childAge || 8;
    
    if (courseId === 'math-adventure') {
      if (age <= 8) {
        return [
          { question: '🍎 2 + 3 = ?', options: ['3', '4', '5', '6'], correct: 2 },
          { question: '🌟 5 - 2 = ?', options: ['2', '3', '4', '5'], correct: 1 },
          { question: '🎈 4 + 4 = ?', options: ['6', '7', '8', '9'], correct: 2 },
          { question: '🐶 10 - 5 = ?', options: ['3', '4', '5', '6'], correct: 2 },
          { question: '🍕 3 + 6 = ?', options: ['7', '8', '9', '10'], correct: 2 },
        ];
      } else {
        return [
          { question: '🎯 12 × 5 = ?', options: ['50', '55', '60', '65'], correct: 2 },
          { question: '📐 What is 25% of 80?', options: ['15', '20', '25', '30'], correct: 1 },
          { question: '🔢 15 + 27 = ?', options: ['40', '41', '42', '43'], correct: 2 },
          { question: '➗ 144 ÷ 12 = ?', options: ['10', '11', '12', '13'], correct: 2 },
          { question: '🧮 3² + 4² = ?', options: ['20', '23', '25', '27'], correct: 2 },
        ];
      }
    } else if (courseId === 'science-quest') {
      return [
        { question: '🌍 What do plants need to grow?', options: ['Water', 'Sunlight', 'Soil', 'All of these'], correct: 3 },
        { question: '🔬 What is H2O?', options: ['Oxygen', 'Water', 'Hydrogen', 'Carbon'], correct: 1 },
        { question: '🌙 Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2 },
        { question: '⚡ What makes lightning?', options: ['Rain', 'Wind', 'Electricity', 'Clouds'], correct: 2 },
        { question: '🦴 How many bones are in the human body?', options: ['106', '206', '306', '406'], correct: 1 },
      ];
    } else {
      return [
        { question: '📖 What is a noun?', options: ['Action word', 'Person/place/thing', 'Describing word', 'Connecting word'], correct: 1 },
        { question: '✍️ Which is correct?', options: ['I are happy', 'I am happy', 'I is happy', 'I be happy'], correct: 1 },
        { question: '🔤 What is a verb?', options: ['Action word', 'Naming word', 'Describing word', 'Joining word'], correct: 0 },
        { question: '📝 What is an adjective?', options: ['Action word', 'Naming word', 'Describing word', 'Joining word'], correct: 2 },
        { question: '📚 Which word is a synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1 },
      ];
    }
  };

  const [questions] = useState<Question[]>(generateQuestions());

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        const percentage = (finalScore / questions.length) * 100;
        const passed = percentage >= 60;
        
        addQuizResult({
          courseId: courseId!,
          score: percentage,
          passed,
          timestamp: Date.now(),
        });
        
        setShowResult(true);
        if (passed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    }, 1500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const finalPercentage = (score / questions.length) * 100;
  const passed = finalPercentage >= 60;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {showConfetti && <Confetti />}

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card rounded-3xl shadow-2xl border-4 border-primary p-8"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      Score: {score}
                    </span>
                  </div>
                  <Progress value={progress} className="h-4" />
                </div>

                <motion.h2
                  key={currentQuestion}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-4xl font-black mb-8 text-foreground"
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                <div className="grid grid-cols-1 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={
                          selectedAnswer === index
                            ? feedback === 'correct'
                              ? 'success'
                              : 'destructive'
                            : 'outline'
                        }
                        size="lg"
                        className="w-full text-xl h-auto py-6"
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                      >
                        {selectedAnswer === index && (
                          <span className="mr-3">
                            {feedback === 'correct' ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <XCircle className="w-6 h-6" />
                            )}
                          </span>
                        )}
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {feedback && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`mt-6 p-4 rounded-2xl text-center text-xl font-black ${
                      feedback === 'correct'
                        ? 'bg-success text-success-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }`}
                  >
                    {feedback === 'correct' ? '🎉 Correct! Amazing!' : '❌ Oops! Try again next time!'}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-card rounded-3xl shadow-2xl border-4 border-primary p-12 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-9xl mb-6"
                >
                  {passed ? '🎉' : '💪'}
                </motion.div>

                <h2 className="text-5xl font-black mb-4 text-foreground">
                  {passed ? 'Amazing Job!' : 'Keep Practicing!'}
                </h2>

                <p className="text-3xl font-bold mb-6 text-muted-foreground">
                  You scored {finalPercentage.toFixed(0)}%
                </p>

                <div className="mb-8">
                  <Progress 
                    value={finalPercentage} 
                    className="h-8"
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate('/courses')}
                  >
                    Back to Courses
                  </Button>
                  {passed && (
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() => navigate('/games')}
                    >
                      Play Games! 🎮
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
