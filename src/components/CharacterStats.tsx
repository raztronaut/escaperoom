'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatBarProps {
  value: number;
  maxValue: number;
  icon: string;
  label: string;
  color: string;
  effects?: { value: number; icon: string }[];
}

function StatBar({ value, maxValue, icon, label, color, effects }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 min-w-[3rem]">
        <span className="text-sm" role="img" aria-label={label}>{icon}</span>
        <span className="text-xs font-medium text-slate-400">{value}</span>
      </div>
      <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {effects && effects.length > 0 && (
        <div className="flex -space-x-1">
          {effects.map((effect, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center px-1 py-0.5 text-[10px] bg-slate-800/80 rounded border border-slate-700/50"
            >
              <span role="img" aria-label="effect">{effect.icon}</span>
              <span className={effect.value > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {effect.value > 0 ? '+' : ''}{effect.value}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CharacterStats() {
  const { state } = useGame();
  const { stats, activeEffects } = state;

  const getEffectsForStat = (statKey: keyof typeof stats) => {
    return activeEffects
      .filter(effect => effect.stats[statKey])
      .map(effect => ({
        value: effect.stats[statKey] as number,
        icon: effect.icon
      }));
  };

  return (
    <div className="relative p-2 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg -z-10" />
      
      <div className="space-y-1.5">
        <StatBar
          value={stats.health}
          maxValue={100}
          icon="❤️"
          label="Health"
          color="bg-gradient-to-r from-red-500 to-rose-500"
          effects={getEffectsForStat('health')}
        />
        <StatBar
          value={stats.sanity}
          maxValue={100}
          icon="🧠"
          label="Sanity"
          color="bg-gradient-to-r from-purple-500 to-indigo-500"
          effects={getEffectsForStat('sanity')}
        />
        <StatBar
          value={stats.energy}
          maxValue={100}
          icon="⚡"
          label="Energy"
          color="bg-gradient-to-r from-amber-500 to-yellow-500"
          effects={getEffectsForStat('energy')}
        />
      </div>

      {activeEffects.length > 0 && (
        <div className="mt-1 pt-1 border-t border-slate-700/50">
          <div className="flex flex-wrap gap-1">
            {activeEffects.map((effect) => (
              <motion.div
                key={effect.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-700/30 rounded text-[10px]"
              >
                <span role="img" aria-label={effect.name}>{effect.icon}</span>
                <span className="text-slate-300">{effect.name}</span>
                <span className="text-slate-500">{effect.duration}s</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 