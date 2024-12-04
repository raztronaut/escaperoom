'use client';

import { useGame } from '@/context/GameContext';
import { Item, Room } from '@/types/game';
import { motion } from 'framer-motion';

export function RoomDescription() {
  const { state } = useGame();
  const currentRoom = state.currentRoom;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl"
    >
      <motion.h2 
        className="text-2xl font-bold text-slate-100 mb-4 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent"
        layoutId="roomName"
      >
        {currentRoom.name}
      </motion.h2>
      
      <motion.p 
        className="text-slate-300 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {currentRoom.description}
      </motion.p>
      
      {currentRoom.items.length > 0 && (
        <motion.div 
          className="mt-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-200 flex items-center">
            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse" />
            You see:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentRoom.items.map((item: Item) => (
              <motion.li 
                key={item.id}
                className="flex items-center space-x-2 text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-700/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                <span>{item.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div 
        className="mt-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-slate-200 flex items-center">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
          Exits:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(currentRoom.exits).map(([direction, roomId]) => (
            <motion.li 
              key={direction}
              className="flex items-center space-x-2 text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-700/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-1 h-1 bg-slate-400 rounded-full" />
              <span>{direction}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
} 