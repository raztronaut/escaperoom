'use client';

import { useGame } from '@/context/GameContext';
import { Item } from '@/types/game';
import { motion } from 'framer-motion';

function ItemTooltip({ item }: { item: Item }) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900/95 rounded-lg border border-slate-700/50 text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="font-medium text-slate-200 mb-1">{item.name}</div>
      <div className="text-slate-400">{item.description}</div>
      {item.category && (
        <div className="mt-1 text-slate-500">Type: {item.category}</div>
      )}
    </div>
  );
}

export function Inventory() {
  const { state, actions } = useGame();

  const handleItemClick = (item: Item) => {
    actions.examineItem(item.id);
  };

  if (state.inventory.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-300">Inventory</h3>
        <span className="text-xs text-slate-500">{state.inventory.length} items</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {state.inventory.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`group relative flex flex-col items-center p-1.5 rounded-lg border cursor-pointer transition-all
              ${state.selectedItem?.id === item.id
                ? "bg-amber-500/20 border-amber-500/40"
                : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/30"}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="text-xl mb-0.5" role="img" aria-label={item.name}>
              {item.icon}
            </span>
            <span className="text-[10px] text-center text-slate-300 line-clamp-1">
              {item.name}
            </span>
            <ItemTooltip item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 