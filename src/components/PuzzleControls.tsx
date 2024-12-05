'use client';

import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { puzzles } from '@/data/puzzleData';
import { Button } from './ui/button';

export function PuzzleControls() {
  const { state, actions } = useGame();
  const [solution, setSolution] = useState<string[]>([]);
  const [mirrorSolution, setMirrorSolution] = useState<string[]>([]);

  // Add debug logging
  console.log('Current room:', state.currentRoom);
  console.log('Room puzzles:', state.currentRoom.puzzles);

  // Check if current room has any puzzles
  if (!state.currentRoom.puzzles?.length) return null;

  // Get the active puzzle based on the room's puzzle list
  const roomPuzzleId = state.currentRoom.puzzles[0]; // For now, handle first puzzle in room
  const currentPuzzle = puzzles[roomPuzzleId];
  const isMirrorRoom = roomPuzzleId === 'mirrorPuzzle';
  const isSecretRoom = roomPuzzleId === 'secretRoom';

  if (!currentPuzzle) return null;

  // Check if puzzle is already solved
  const isPuzzleSolved = state.solvedPuzzles.includes(currentPuzzle.id);
  if (isPuzzleSolved) return null;

  // Check if player has required items
  const hasRequiredItems = currentPuzzle.requiredItems.every(itemId =>
    state.inventory.some(item => item.id === itemId)
  );

  const handleSolutionStep = (step: string | number) => {
    if (!hasRequiredItems) return;
    if (isMirrorRoom || isSecretRoom) {
      setMirrorSolution([...mirrorSolution, step.toString()]);
    } else {
      setSolution([...solution, step as string]);
    }
  };

  const handleAttemptSolve = () => {
    if (!hasRequiredItems) return;
    const currentSolution = isMirrorRoom || isSecretRoom ? mirrorSolution : solution;
    
    if (isSecretRoom) {
      // Special handling for secret room puzzle completion
      const isCorrect = JSON.stringify(currentPuzzle.solution) === JSON.stringify(currentSolution);
      
      if (isCorrect) {
        actions.solvePuzzle(currentPuzzle.id);
      } else {
        actions.setMessage(currentPuzzle.failureMessage);
      }
    } else {
      // Original logic for mirror and bookshelf puzzles
      actions.attemptPuzzle(currentPuzzle.id, currentSolution);
    }

    // Reset solution state
    if (isMirrorRoom || isSecretRoom) {
      setMirrorSolution([]);
    } else {
      setSolution([]);
    }
  };

  const handleReset = () => {
    if (isMirrorRoom || isSecretRoom) {
      setMirrorSolution([]);
    } else {
      setSolution([]);
    }
  };

  const currentSolution = isMirrorRoom || isSecretRoom ? mirrorSolution : solution;
  const maxSteps = currentPuzzle.solution.length;

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
          <p className="text-sm text-slate-300">
            {!hasRequiredItems ? (
              <span className="text-amber-500">
                Required items: {currentPuzzle.requiredItems.join(', ')}
              </span>
            ) : (
              currentPuzzle.hint
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {currentPuzzle.solution.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg border-2 ${
                currentSolution[index]
                  ? 'bg-slate-700/50 border-amber-500/50'
                  : 'bg-slate-800/50 border-slate-700'
              } flex items-center justify-center text-sm font-medium`}
            >
              {currentSolution[index] ? '✓' : (index + 1)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {isSecretRoom ? (
            // Secret room puzzle controls
            <>
              {[1, 2, 3, 4].map((step) => (
                <Button
                  key={step}
                  variant="secondary"
                  onClick={() => handleSolutionStep(step.toString())}
                  disabled={!hasRequiredItems || solution.length >= maxSteps}
                  className="bg-indigo-900/30 hover:bg-indigo-900/50 border-indigo-900/50"
                >
                  Step {step}
                </Button>
              ))}
            </>
          ) : isMirrorRoom ? (
            // Mirror puzzle controls
            <>
              {[1, 2, 3, 4].map((mirrorId) => (
                <Button
                  key={mirrorId}
                  variant="secondary"
                  onClick={() => handleSolutionStep(mirrorId)}
                  disabled={!hasRequiredItems || mirrorSolution.length >= maxSteps}
                  className={`bg-amber-900/30 hover:bg-amber-900/50 border-amber-900/50 ${
                    !hasRequiredItems && 'opacity-50'
                  }`}
                >
                  Mirror {mirrorId}
                </Button>
              ))}
            </>
          ) : (
            // Bookshelf puzzle controls
            <>
              {['red', 'blue', 'green', 'yellow'].map((color) => (
                <Button
                  key={color}
                  variant="secondary"
                  onClick={() => handleSolutionStep(color)}
                  disabled={!hasRequiredItems || solution.length >= maxSteps}
                  className={`bg-${color}-900/30 hover:bg-${color}-900/50 border-${color}-900/50 ${
                    !hasRequiredItems && 'opacity-50'
                  }`}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)} Book
                </Button>
              ))}
            </>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            onClick={handleAttemptSolve}
            disabled={!hasRequiredItems || currentSolution.length !== maxSteps}
            className="flex-1"
          >
            Attempt Solution
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={currentSolution.length === 0}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
} 