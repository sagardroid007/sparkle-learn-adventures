import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

interface MatchItem {
  id: number;
  emoji: string;
  matched: boolean;
  selected: boolean;
}

const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🥕', '🌽'];

export default function MatchingGame() {
  const navigate = useNavigate();
  const [items, setItems] = useState<MatchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        matched: false,
        selected: false,
      }));
    setItems(shuffled);
    setSelectedItems([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (selectedItems.length === 2) {
      const [first, second] = selectedItems;
      setMoves(m => m + 1);

      if (items[first].emoji === items[second].emoji) {
        setItems(prev =>
          prev.map((item, idx) =>
            idx === first || idx === second ? { ...item, matched: true } : item
          )
        );
        setMatches(m => m + 1);
        setSelectedItems([]);
      } else {
        setTimeout(() => {
          setItems(prev =>
            prev.map((item, idx) =>
              idx === first || idx === second ? { ...item, selected: false } : item
            )
          );
          setSelectedItems([]);
        }, 800);
      }
    }
  }, [selectedItems, items]);

  useEffect(() => {
    if (matches === emojis.length && matches > 0) {
      setGameWon(true);
    }
  }, [matches]);

  const handleItemClick = (index: number) => {
    if (
      selectedItems.length >= 2 ||
      items[index].matched ||
      items[index].selected
    ) return;

    setItems(prev =>
      prev.map((item, idx) =>
        idx === index ? { ...item, selected: true } : item
      )
    );
    setSelectedItems(prev => [...prev, index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
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
          <h1 className="text-3xl font-black text-primary">Matching Game 🎴</h1>
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
            <div className="bg-primary/10 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground font-bold">Moves</p>
              <p className="text-3xl font-black text-primary">{moves}</p>
            </div>
            <div className="bg-secondary/10 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground font-bold">Matches</p>
              <p className="text-3xl font-black text-secondary">{matches}/{emojis.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: item.matched ? 1 : 1.05 }}
                whileTap={{ scale: item.matched ? 1 : 0.95 }}
                onClick={() => handleItemClick(index)}
                className={`aspect-square rounded-2xl text-4xl font-bold transition-all duration-300 ${
                  item.matched
                    ? 'bg-success/20 border-4 border-success'
                    : item.selected
                    ? 'bg-primary/20 border-4 border-primary'
                    : 'bg-muted hover:bg-muted/80 border-4 border-transparent'
                }`}
              >
                <AnimatePresence mode="wait">
                  {(item.selected || item.matched) ? (
                    <motion.span
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                    >
                      {item.emoji}
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      className="text-muted-foreground"
                    >
                      ❓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-success to-primary rounded-3xl p-8 text-center text-primary-foreground"
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
              <h2 className="text-4xl font-black mb-2">Amazing! 🎉</h2>
              <p className="text-xl font-bold mb-4">You completed it in {moves} moves!</p>
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
