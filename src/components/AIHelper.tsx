import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>([
    { text: "Hi! I'm your learning buddy! 🌟 Ask me anything!", isAI: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isAI: false }]);
    
    // Simple AI responses
    setTimeout(() => {
      const responses = [
        "That's a great question! Keep being curious! 🌈",
        "You're doing amazing! Keep learning! ⭐",
        "Wow! You're so smart! 🎉",
        "Let's figure this out together! 🤔",
        "I'm so proud of you! 🏆"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isAI: true }]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-card rounded-3xl shadow-2xl border-4 border-primary flex flex-col z-50"
          >
            <div className="flex items-center justify-between p-4 border-b-4 border-primary bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-2xl">
              <h3 className="font-black text-xl">Learning Buddy 🦉</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, x: message.isAI ? -50 : 50 }}
                  animate={{ scale: 1, x: 0 }}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl font-semibold ${
                      message.isAI
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t-4 border-primary flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="rounded-full border-2 text-base"
              />
              <Button onClick={handleSend} size="icon" className="rounded-full">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center text-3xl z-50"
      >
        {isOpen ? <X className="w-8 h-8 text-primary-foreground" /> : '🦉'}
      </motion.button>
    </>
  );
}
