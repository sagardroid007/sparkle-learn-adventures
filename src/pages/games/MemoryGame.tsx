import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const cardValues = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'];

export default function MemoryGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const shuffled = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
    setTime(0);
    setIsPlaying(true);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      
      if (cards[first].value === cards[second].value) {
        setCards(prev =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
        setMatches(m => m + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, idx) =>
              idx === first || idx === second ? { ...card, flipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === cardValues.length && matches > 0) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [matches]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length >= 2 ||
      cards[index].flipped ||
      cards[index].matched
    ) return;

    setCards(prev =>
      prev.map((card, idx) =>
        idx === index ? { ...card, flipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/20 p-4">
      {gameWon && <Confetti recycle={false} numberOfPieces={300} />}
      
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
          <h1 className="text-3xl font-black text-secondary">Memory Cards 🃏</h1>
          <Button variant="outline" onClick={initializeGame}>
            <RotateCcw className="w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl p-6 shadow-xl mb-6"
        >
          <div className="flex justify-around text-center mb-6">
            <div className="bg-secondary/10 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground font-bold">Matches</p>
              <p className="text-3xl font-black text-secondary">{matches}/{cardValues.length}</p>
            </div>
            <div className="bg-accent/10 rounded-2xl p-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-accent" />
              <p className="text-3xl font-black text-accent">{formatTime(time)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="aspect-square perspective-1000"
                whileHover={{ scale: card.matched ? 1 : 1.05 }}
                whileTap={{ scale: card.matched ? 1 : 0.95 }}
              >
                <motion.button
                  onClick={() => handleCardClick(index)}
                  className={`w-full h-full rounded-2xl text-4xl font-bold transition-all duration-500 transform-style-preserve-3d ${
                    card.matched
                      ? 'bg-success/20 border-4 border-success'
                      : card.flipped
                      ? 'bg-secondary/20 border-4 border-secondary'
                      : 'bg-gradient-to-br from-secondary to-accent border-4 border-transparent'
                  }`}
                  animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AnimatePresence mode="wait">
                    {(card.flipped || card.matched) ? (
                      <motion.span
                        key="front"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotateY: 180 }}
                        className="block"
                      >
                        {card.value}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="back"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary-foreground"
                      >
                        🎴
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-secondary to-accent rounded-3xl p-8 text-center text-primary-foreground"
            >
              <div className="flex justify-center mb-4">
                {[...Array(3)].map((_, i) => (
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
              <h2 className="text-4xl font-black mb-2">Super! 🎊</h2>
              <p className="text-xl font-bold mb-4">Completed in {formatTime(time)}!</p>
              <Button variant="secondary" size="lg" onClick={initializeGame}>
                Play Again!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
