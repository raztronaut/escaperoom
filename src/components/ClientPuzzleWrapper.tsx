'use client';

import { useGame } from '@/context/GameContext';
import { PuzzleControls } from './PuzzleControls';
import { Button } from './ui/button';
import { puzzles } from '@/data/puzzleData';
import { PuzzleId } from '@/types/game';

export function ClientPuzzleWrapper({ puzzleId }: { puzzleId: PuzzleId }) {
  const { state, actions } = useGame();
  const { currentRoom, activePuzzle } = state;

  // Only show in rooms with puzzles
  if (!currentRoom?.puzzles?.length) {
    return null;
  }

  const roomPuzzleId = currentRoom.puzzles[0];
  const currentPuzzle = puzzles[roomPuzzleId];
  
  if (!currentPuzzle) return null;

  // Check for required items in room or inventory based on the puzzle
  const hasRequiredItems = currentPuzzle.requiredItems.every(itemId =>
    state.inventory.some(item => item?.id === itemId)
  );

  // If puzzle is active, show the puzzle controls
  if (activePuzzle === roomPuzzleId) {
    return (
      <div className="h-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h3 className="text-lg font-medium text-slate-200">
            {getPuzzleTitle(roomPuzzleId)}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.cancelPuzzle}
          >
            Cancel
          </Button>
        </div>
        <PuzzleControls />
      </div>
    );
  }

  // Show puzzle start interface
  return (
    <div className="h-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-200">Available Puzzles</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-200">
                {getPuzzleTitle(roomPuzzleId)}
              </div>
              <div className="text-xs text-slate-400">
                {currentPuzzle.hint}
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (!hasRequiredItems) {
                  actions.setMessage(`You need ${currentPuzzle.requiredItems.join(' and ')} to solve this puzzle.`);
                  return;
                }
                actions.startPuzzle(roomPuzzleId);
              }}
              disabled={!hasRequiredItems}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPuzzleTitle(puzzleId: string): string {
  switch (puzzleId) {
    case 'mirrorPuzzle':
      return 'Mirror Puzzle';
    case 'bookshelfPuzzle':
      return 'Bookshelf Puzzle';
    case 'alchemyPuzzle':
      return 'Alchemy Puzzle';
    case 'secretRoom':
      return 'Chamber of Secrets Puzzle';
    default:
      return 'Unknown Puzzle';
  }
} 