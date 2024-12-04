'use client';

import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { puzzles } from '@/data/puzzleData';
import { Button } from './ui/button';

export function PuzzleControls() {
  const { state, actions } = useGame();
  const [solution, setSolution] = useState<string[]>([]);

  // Get the active puzzle
  const currentPuzzle = puzzles.bookshelfPuzzle;

  // Check if puzzle is already solved
  if (state.solvedPuzzles.includes('bookshelfPuzzle')) {
    return null;
  }

  const handleSolutionStep = (step: string) => {
    setSolution([...solution, step]);
  };

  const handleAttemptSolve = () => {
    actions.attemptPuzzle('bookshelfPuzzle', solution);
    setSolution([]);
  };

  const handleReset = () => {
    setSolution([]);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
          <p className="text-sm text-slate-300">{currentPuzzle.hint}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {currentPuzzle.solution.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg border-2 ${
                solution[index]
                  ? 'bg-slate-700/50 border-amber-500/50'
                  : 'bg-slate-800/50 border-slate-700'
              } flex items-center justify-center text-sm font-medium`}
            >
              {solution[index] ? '✓' : (index + 1)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            onClick={() => handleSolutionStep('red')}
            disabled={solution.length >= currentPuzzle.solution.length}
            className="bg-red-900/30 hover:bg-red-900/50 border-red-900/50"
          >
            Red Book
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSolutionStep('blue')}
            disabled={solution.length >= currentPuzzle.solution.length}
            className="bg-blue-900/30 hover:bg-blue-900/50 border-blue-900/50"
          >
            Blue Book
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSolutionStep('green')}
            disabled={solution.length >= currentPuzzle.solution.length}
            className="bg-green-900/30 hover:bg-green-900/50 border-green-900/50"
          >
            Green Book
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSolutionStep('yellow')}
            disabled={solution.length >= currentPuzzle.solution.length}
            className="bg-yellow-900/30 hover:bg-yellow-900/50 border-yellow-900/50"
          >
            Yellow Book
          </Button>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            onClick={handleAttemptSolve}
            disabled={solution.length !== currentPuzzle.solution.length}
            className="flex-1"
          >
            Attempt Solution
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={solution.length === 0}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
} 