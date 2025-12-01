import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Star, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

interface Puzzle {
  word: string;
  hint: string;
  category: string;
}

const puzzles: Puzzle[] = [
  { word: 'APPLE', hint: 'A red or green fruit', category: '🍎 Fruits' },
  { word: 'TIGER', hint: 'A big striped cat', category: '🐯 Animals' },
  { word: 'OCEAN', hint: 'A large body of water', category: '🌊 Nature' },
  { word: 'PIANO', hint: 'A musical instrument with keys', category: '🎹 Music' },
  { word: 'ROBOT', hint: 'A machine that can do tasks', category: '🤖 Technology' },
  { word: 'BEACH', hint: 'Sandy place by the sea', category: '🏖️ Places' },
  { word: 'CLOUD', hint: 'White fluffy thing in the sky', category: '☁️ Nature' },
  { word: 'MAGIC', hint: 'Something mysterious and wonderful', category: '✨ Fantasy' },
];

export default function WordPuzzle() {
  const navigate = useNavigate();
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [scrambledWord, setScrambledWord] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; used: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const totalRounds = 5;

  const getNewPuzzle = () => {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    const scrambled = puzzle.word.split('').sort(() => Math.random() - 0.5);
    setCurrentPuzzle(puzzle);
    setScrambledWord(scrambled);
    setAvailableLetters(scrambled.map(letter => ({ letter, used: false })));
    setUserAnswer([]);
    setShowHint(false);
    setIsCorrect(null);
  };

  useEffect(() => {
    getNewPuzzle();
  }, []);

  const handleLetterClick = (index: number) => {
    if (availableLetters[index].used || isCorrect !== null) return;

    setAvailableLetters(prev =>
      prev.map((item, idx) =>
        idx === index ? { ...item, used: true } : item
      )
    );
    setUserAnswer(prev => [...prev, availableLetters[index].letter]);
  };

  const handleAnswerLetterClick = (index: number) => {
    if (isCorrect !== null) return;

    const letter = userAnswer[index];
    const letterIndex = availableLetters.findIndex(
      (item, idx) => item.letter === letter && item.used && 
      !availableLetters.slice(0, idx).some((prev, prevIdx) => 
        prev.letter === letter && prev.used && userAnswer.indexOf(letter) === prevIdx
      )
    );

    if (letterIndex !== -1) {
      setAvailableLetters(prev =>
        prev.map((item, idx) =>
          idx === letterIndex ? { ...item, used: false } : item
        )
      );
    }

    setUserAnswer(prev => prev.filter((_, idx) => idx !== index));
  };

  const checkAnswer = () => {
    if (userAnswer.join('') === currentPuzzle?.word) {
      setIsCorrect(true);
      setScore(s => s + (showHint ? 50 : 100));
    } else {
      setIsCorrect(false);
    }
  };

  const nextRound = () => {
    if (round >= totalRounds) {
      setGameComplete(true);
    } else {
      setRound(r => r + 1);
      getNewPuzzle();
    }
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setGameComplete(false);
    getNewPuzzle();
  };

  useEffect(() => {
    if (userAnswer.length === currentPuzzle?.word.length && isCorrect === null) {
      checkAnswer();
    }
  }, [userAnswer, currentPuzzle, isCorrect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/20 p-4">
      {(isCorrect || gameComplete) && <Confetti recycle={false} numberOfPieces={isCorrect ? 100 : 300} />}
      
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <Button variant="ghost" onClick={() => navigate('/games')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-black text-accent">Word Puzzle 🧩</h1>
          <Button variant="outline" onClick={restartGame}>
            <RotateCcw className="w-5 h-5" />
          </Button>
        </motion.div>

        {!gameComplete ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-6 shadow-xl mb-6"
          >
            <div className="flex justify-around text-center mb-6">
              <div className="bg-accent/10 rounded-2xl p-4">
                <p className="text-sm text-muted-foreground font-bold">Round</p>
                <p className="text-3xl font-black text-accent">{round}/{totalRounds}</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-4">
                <p className="text-sm text-muted-foreground font-bold">Score</p>
                <p className="text-3xl font-black text-primary">{score}</p>
              </div>
            </div>

            {currentPuzzle && (
              <>
                <div className="text-center mb-6">
                  <span className="inline-block bg-muted rounded-full px-4 py-2 text-lg font-bold">
                    {currentPuzzle.category}
                  </span>
                </div>

                {/* Answer slots */}
                <div className="flex justify-center gap-2 mb-6">
                  {currentPuzzle.word.split('').map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: userAnswer[index] ? 1.05 : 1 }}
                      whileTap={{ scale: userAnswer[index] ? 0.95 : 1 }}
                      onClick={() => handleAnswerLetterClick(index)}
                      className={`w-12 h-14 rounded-xl text-2xl font-black border-4 transition-all ${
                        isCorrect === true
                          ? 'bg-success/20 border-success text-success'
                          : isCorrect === false
                          ? 'bg-destructive/20 border-destructive text-destructive'
                          : userAnswer[index]
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-muted border-muted-foreground/30'
                      }`}
                    >
                      {userAnswer[index] || ''}
                    </motion.button>
                  ))}
                </div>

                {/* Scrambled letters */}
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  {availableLetters.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: item.used ? 1 : 1.1 }}
                      whileTap={{ scale: item.used ? 1 : 0.9 }}
                      onClick={() => handleLetterClick(index)}
                      disabled={item.used}
                      className={`w-12 h-14 rounded-xl text-2xl font-black transition-all ${
                        item.used
                          ? 'bg-muted/50 text-muted-foreground/30 border-4 border-transparent'
                          : 'bg-gradient-to-br from-accent to-primary text-primary-foreground border-4 border-transparent hover:border-primary'
                      }`}
                    >
                      {item.letter}
                    </motion.button>
                  ))}
                </div>

                {/* Hint button */}
                <div className="text-center mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowHint(true)}
                    disabled={showHint}
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    {showHint ? currentPuzzle.hint : 'Show Hint (-50 pts)'}
                  </Button>
                </div>

                {/* Result feedback */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-center p-4 rounded-2xl mb-4 ${
                        isCorrect ? 'bg-success/20' : 'bg-destructive/20'
                      }`}
                    >
                      <p className="text-2xl font-black mb-2">
                        {isCorrect ? '🎉 Correct!' : `❌ The word was: ${currentPuzzle.word}`}
                      </p>
                      <Button onClick={nextRound}>
                        {round >= totalRounds ? 'See Results' : 'Next Word'}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-accent to-primary rounded-3xl p-8 text-center text-primary-foreground"
          >
            <div className="flex justify-center mb-4">
              {[...Array(score >= 400 ? 3 : score >= 250 ? 2 : 1)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Star className="w-12 h-12 fill-yellow-300 text-yellow-300" />
                </motion.div>
              ))}
            </div>
            <h2 className="text-4xl font-black mb-2">Great Job! 🎊</h2>
            <p className="text-xl font-bold mb-4">Final Score: {score} points!</p>
            <Button variant="secondary" size="lg" onClick={restartGame}>
              Play Again!
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
