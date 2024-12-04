'use client';

import { useGameState } from '@/context/GameContext';
import { puzzles } from '@/data/puzzleData';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SecretRoomPuzzle() {
  const { inventory, completePuzzle, addMessage } = useGameState();
  const [hasUsedPotion, setHasUsedPotion] = useState(false);
  
  function handleUsePotion() {
    if (inventory.includes('revealingPotion')) {
      setHasUsedPotion(true);
      addMessage('The potion reveals ancient glowing runes on the walls!');
    }
  }

  function handleUseMazeKey() {
    if (!hasUsedPotion) {
      addMessage('The walls seem to hold some secret, but you cannot interact with them yet.');
      return;
    }
    
    if (inventory.includes('mazeKey')) {
      addMessage('The maze key resonates with the revealed runes. The chamber recognizes you as worthy!');
      completePuzzle('secretRoom');
    }
  }

  return (
    <div className="space-y-4">
      <div className={cn(
        "h-48 rounded-lg transition-all duration-500",
        hasUsedPotion ? "bg-indigo-900/30" : "bg-slate-900/30"
      )}>
        {hasUsedPotion && (
          <div className="animate-pulse p-4 text-indigo-400">
            ✧ Ancient runes glow on the walls ✧
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={handleUsePotion}
          disabled={!inventory.includes('revealingPotion') || hasUsedPotion}
        >
          Use Revealing Potion
        </Button>
        
        <Button
          onClick={handleUseMazeKey}
          disabled={!inventory.includes('mazeKey')}
        >
          Use Maze Key
        </Button>
      </div>
    </div>
  );
} 