'use client';

import { useGame } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MessageDisplay() {
  const { state } = useGame();
  const [messages, setMessages] = useState<string[]>([]);
  const [isNewMessage, setIsNewMessage] = useState(false);

  useEffect(() => {
    if (state.currentMessage && typeof state.currentMessage === 'string') {
      setMessages(messages => {
        const newMessages = [...messages, state.currentMessage as string];
        return newMessages.slice(-4);
      });
      setIsNewMessage(true);
      const timer = setTimeout(() => setIsNewMessage(false), 500);
      return () => clearTimeout(timer);
    }
  }, [state.currentMessage]);

  return (
    <div className="relative p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      
      <div className="space-y-3 min-h-[140px] relative pb-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={`${message}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <p
                className={`
                  text-slate-${300 - index * 100} 
                  transition-all duration-500
                  ${index === messages.length - 1 && isNewMessage ? 'text-amber-200' : ''}
                  leading-relaxed text-lg
                `}
                style={{
                  opacity: 1 - index * 0.15,
                }}
              >
                {message}
              </p>
              {index === messages.length - 1 && (
                <motion.div
                  className="absolute left-[-1.5rem] top-[0.5rem] w-2 h-2 bg-amber-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {state.lastAction && (
          <motion.div 
            key={state.lastAction}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400 border border-slate-600/50 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Last action: {state.lastAction}
          </motion.div>
        )}
      </div>
    </div>
  );
} 