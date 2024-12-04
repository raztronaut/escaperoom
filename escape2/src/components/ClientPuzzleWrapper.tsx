'use client';

import { useGame } from '@/context/GameContext';
import { PuzzleControls } from './PuzzleControls';
import { Button } from './ui/button';
import { puzzles } from '@/data/puzzleData';

export function ClientPuzzleWrapper() {
  const { state, actions } = useGame();
  const { currentRoom, activePuzzle } = state;

  // Only show in library
  if (currentRoom?.id !== 'library') {
    return null;
  }

  // Check for colored books in inventory or room
  const hasColoredBooks = currentRoom.items.some(item => item?.id === 'coloredBooks') ||
                         state.inventory.some(item => item?.id === 'coloredBooks');

  if (!hasColoredBooks) {
    return null;
  }

  // If puzzle is active, show the puzzle controls
  if (activePuzzle === 'bookshelfPuzzle') {
    return (
      <div className="h-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h3 className="text-lg font-medium text-slate-200">Bookshelf Puzzle</h3>
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

  // Check if player has required items for the puzzle
  const bookshelfPuzzle = puzzles.bookshelfPuzzle;
  const hasRequiredItems = bookshelfPuzzle.requiredItems.every(itemId =>
    state.inventory.some(item => item?.id === itemId)
  );

  // Show puzzle start interface
  return (
    <div className="h-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-200">Available Puzzles</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-200">Bookshelf Puzzle</div>
              <div className="text-xs text-slate-400">
                {hasRequiredItems 
                  ? "Arrange the colored books according to the pattern in the journal"
                  : "You need to find the journal with the pattern first"}
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (!hasRequiredItems) {
                  actions.setMessage("You need the journal to solve this puzzle.");
                  return;
                }
                actions.startPuzzle('bookshelfPuzzle');
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