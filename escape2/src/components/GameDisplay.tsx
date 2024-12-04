'use client';

import { useGame } from '@/context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

export function GameDisplay() {
  const { state } = useGame();
  const { currentRoom, messageHistory = [], currentMessage } = state;

  if (!currentRoom) {
    return (
      <div className="p-4">
        <div className="text-sm text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {/* Room Info */}
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{currentRoom.name}</h2>
        <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
          {currentRoom.visitedDescription || currentRoom.description}
        </p>
      </div>

      {/* Messages */}
      {(currentMessage || messageHistory.length > 0) && (
        <div className="space-y-1.5 pt-2 border-t border-slate-700/50">
          {currentMessage && (
            <div className="text-sm text-amber-400/90 italic">
              {currentMessage}
            </div>
          )}
          
          <AnimatePresence mode="popLayout">
            {messageHistory.slice(-2).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-slate-500 italic"
              >
                {message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
} 