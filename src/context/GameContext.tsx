'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, Room, Item, ItemCombination } from '@/types/game';
import { rooms, items } from '@/data/gameData';
import { itemCombinations, puzzles } from '@/data/puzzleData';
import { useRouter } from 'next/navigation'
import { saveGameResult } from '@/lib/saveGameResult'

interface RoomState {
  items: Item[];
  discoveredSecrets: string[];
  solvedPuzzles: string[];
}

const initialState: GameState = {
  currentRoom: rooms.study,
  roomStates: {
    study: {
      items: [...rooms.study.items],
      discoveredSecrets: [],
      solvedPuzzles: []
    }
  },
  inventory: [],
  visitedRooms: ['study'],
  gameComplete: false,
  solvedPuzzles: [],
  discoveredSecrets: [],
  gameTime: 0,
  lightSource: false,
  currentMessage: 'You find yourself in a mysterious study...',
  messageHistory: ['You find yourself in a mysterious study...'],
  combinedItems: [],
  activeEffects: [],
  lastAction: 'Game started',
  selectedItem: null,
  activePuzzle: null,
  stats: {
    health: 10000,
    sanity: 10000,
    energy: 10000,
  },
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE': {
      const direction = action.payload;
      const nextRoomId = state.currentRoom.exits[direction];
      
      if (!nextRoomId) {
        return {
          ...state,
          currentMessage: `There is no exit to the ${direction}.`,
          messageHistory: [
            ...state.messageHistory,
            `Cannot move ${direction}`,
          ].slice(-5),
        };
      }

      const nextRoom = rooms[nextRoomId as keyof typeof rooms];
      if (!nextRoom) {
        return {
          ...state,
          currentMessage: 'Error: Room not found.',
          messageHistory: [
            ...state.messageHistory,
            'Error: Room not found',
          ].slice(-5),
        };
      }

      // Add debug logging
      console.log('Moving to room:', nextRoomId);
      console.log('Room is dark:', nextRoom?.isDark);
      console.log('Has light source:', state.inventory.some(item => item.id === 'repairedLantern'));
      console.log('Inventory:', state.inventory.map(item => item.id));

      // Check if room is dark and we need a light source
      if (nextRoom?.isDark && !state.inventory.some(item => item.id === 'repairedLantern')) {
        return {
          ...state,
          currentMessage: "It's too dark to enter without a light source.",
          messageHistory: [
            ...state.messageHistory,
            "Need a light source to enter",
          ].slice(-5),
        };
      }

      // Check if room is locked and requires items
      if (nextRoom.isLocked && nextRoom.requiredItems) {
        const hasRequiredItems = nextRoom.requiredItems.every(itemId =>
          state.inventory.some(item => item.id === itemId)
        );
        
        if (!hasRequiredItems) {
          return {
            ...state,
            currentMessage: "You can't enter this room yet. You're missing something...",
            messageHistory: [
              ...state.messageHistory,
              "Room is locked - missing required items",
            ].slice(-5),
          };
        }
      }

      // Initialize room state if it's the first visit
      if (!state.roomStates[nextRoomId]) {
        state.roomStates[nextRoomId] = {
          items: [...nextRoom.items],
          discoveredSecrets: [],
          solvedPuzzles: []
        };
      }

      // Create the next room with persisted state
      const nextRoomWithState = {
        ...nextRoom,
        items: state.roomStates[nextRoomId].items
      };

      return {
        ...state,
        currentRoom: nextRoomWithState,
        visitedRooms: state.visitedRooms.includes(nextRoomId) 
          ? state.visitedRooms 
          : [...state.visitedRooms, nextRoomId],
        lastAction: `Moved to ${nextRoom.name}`,
        currentMessage: nextRoom.visitedDescription || nextRoom.description,
        messageHistory: [
          ...state.messageHistory,
          `Moved to ${nextRoom.name}`,
        ].slice(-5),
        stats: {
          ...state.stats,
        },
      };
    }

    case 'EXAMINE':
      const itemToExamine = state.currentRoom.items.find(i => i.id === action.payload) ||
                           state.inventory.find(i => i.id === action.payload);
      
      if (!itemToExamine) return state;

      return {
        ...state,
        lastAction: `Examined ${itemToExamine.name}`,
        currentMessage: itemToExamine.examineResult || itemToExamine.description,
        messageHistory: [
          ...state.messageHistory,
          `Examined ${itemToExamine.name}`,
        ].slice(-5),
      };

    case 'TAKE': {
      const itemToTake = state.currentRoom.items.find(i => i.id === action.payload);
      
      if (!itemToTake || !itemToTake.canPickup) {
        return {
          ...state,
          currentMessage: "You can't take that.",
          messageHistory: [
            ...state.messageHistory,
            "Cannot take item",
          ].slice(-5),
        };
      }

      const updatedRoom = {
        ...state.currentRoom,
        items: state.currentRoom.items.filter(i => i.id !== action.payload),
      };

      return {
        ...state,
        currentRoom: updatedRoom,
        inventory: [...state.inventory, itemToTake],
        lastAction: `Took ${itemToTake.name}`,
        currentMessage: `You picked up ${itemToTake.name}`,
        messageHistory: [
          ...state.messageHistory,
          `Took ${itemToTake.name}`,
        ].slice(-5),
      };
    }

    case 'USE':
      const itemToUse = state.inventory.find(i => i.id === action.payload) ||
                       state.currentRoom.items.find(i => i.id === action.payload);
      
      if (!itemToUse || !itemToUse.isUsable) {
        return {
          ...state,
          currentMessage: "You can't use that.",
          messageHistory: [
            ...state.messageHistory,
            "Cannot use item",
          ].slice(-5),
        };
      }

      return {
        ...state,
        lastAction: `Used ${itemToUse.name}`,
        currentMessage: `You used ${itemToUse.name}`,
        messageHistory: [
          ...state.messageHistory,
          `Used ${itemToUse.name}`,
        ].slice(-5),
        stats: {
          ...state.stats,
          health: state.stats.health + (itemToUse.healthEffect || 0),
          sanity: state.stats.sanity + (itemToUse.sanityEffect || 0),
          energy: state.stats.energy + (itemToUse.energyEffect || 0),
        },
      };

    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.payload,
      };

    case 'CLEAR_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: null,
      };

    case 'COMBINE': {
      const { item1, item2 } = action.payload;
      const firstItem = state.inventory.find(i => i.id === item1);
      const secondItem = state.inventory.find(i => i.id === item2) ||
                        state.currentRoom.items?.find(i => i.id === item2);

      if (!firstItem || !secondItem) {
        return {
          ...state,
          currentMessage: "Can't combine those items.",
          messageHistory: [
            ...state.messageHistory,
            "Cannot combine items",
          ].slice(-5),
          selectedItem: null,
        };
      }

      // Find matching combination
      const combination = itemCombinations?.find(combo => 
        (combo?.itemIds?.[0] === item1 && combo?.itemIds?.[1] === item2) ||
        (combo?.itemIds?.[0] === item2 && combo?.itemIds?.[1] === item1)
      );

      if (!combination) {
        return {
          ...state,
          currentMessage: "Those items can't be combined.",
          messageHistory: [
            ...state.messageHistory,
            "Items cannot be combined",
          ].slice(-5),
          selectedItem: null,
        };
      }

      // Get the resulting item
      const resultingItem = items[combination.resultItemId];
      if (!resultingItem) {
        return {
          ...state,
          currentMessage: "Error: Resulting item not found.",
          messageHistory: [
            ...state.messageHistory,
            "Error in item combination",
          ].slice(-5),
          selectedItem: null,
        };
      }

      // Remove used items from inventory
      const updatedInventory = state.inventory.filter(i => 
        i.id !== item1 && i.id !== item2
      );

      // Add the new item to inventory
      updatedInventory.push(resultingItem);

      // Initialize room state if it doesn't exist
      const currentRoomState = state.roomStates[state.currentRoom.id] || {
        items: [...state.currentRoom.items],
        discoveredSecrets: [],
        solvedPuzzles: []
      };

      // Update room state
      const updatedRoomState = {
        ...currentRoomState,
        items: currentRoomState.items.filter(i => i.id !== item2)
      };

      // Special handling for lantern
      const lightSource = resultingItem.id === 'lantern';

      // Calculate effects
      const healthEffect = (firstItem.healthEffect || 0) + (secondItem.healthEffect || 0);
      const sanityEffect = (firstItem.sanityEffect || 0) + (secondItem.sanityEffect || 0);
      const energyEffect = (firstItem.energyEffect || 0) + (secondItem.energyEffect || 0);

      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          items: updatedRoomState.items
        },
        roomStates: {
          ...state.roomStates,
          [state.currentRoom.id]: updatedRoomState
        },
        inventory: updatedInventory,
        combinedItems: [...state.combinedItems, `${item1}_${item2}`],
        selectedItem: null,
        lightSource: state.lightSource || lightSource,
        lastAction: `Combined ${firstItem.name} with ${secondItem.name}`,
        currentMessage: combination.message,
        messageHistory: [
          ...state.messageHistory,
          combination.message,
        ].slice(-5),
        stats: {
          ...state.stats,
          health: state.stats.health + healthEffect,
          sanity: state.stats.sanity + sanityEffect,
          energy: state.stats.energy + energyEffect,
        },
      };
    }

    case 'SET_MESSAGE':
      return {
        ...state,
        currentMessage: action.payload,
        messageHistory: [
          ...state.messageHistory,
          action.payload,
        ].slice(-5),
      };

    case 'SOLVE_PUZZLE': {
      const { puzzleId, solution } = action.payload;
      const puzzle = puzzles[puzzleId];
      
      if (!puzzle) return state;
      
      // Check if solution matches
      const isCorrect = JSON.stringify(puzzle.solution) === JSON.stringify(solution);
      
      if (isCorrect) {
        // Get the reward item from items collection if it exists
        const rewardItem = puzzle.reward ? items[puzzle.reward] : null;
        
        return {
          ...state,
          solvedPuzzles: [...state.solvedPuzzles, puzzleId],
          inventory: rewardItem ? [...state.inventory, rewardItem] : state.inventory,
          currentMessage: puzzle.successMessage
        };
      } else {
        return {
          ...state,
          currentMessage: puzzle.failureMessage
        };
      }
    }

    case 'START_PUZZLE': {
      const puzzleId = action.payload;
      const puzzle = puzzles[puzzleId];
      
      if (!puzzle) {
        return {
          ...state,
          currentMessage: 'Error: Puzzle not found.',
          messageHistory: [
            ...state.messageHistory,
            'Error: Puzzle not found',
          ].slice(-5),
        };
      }

      // Check if puzzle is already solved
      if (state.solvedPuzzles.includes(puzzleId)) {
        return {
          ...state,
          currentMessage: 'This puzzle has already been solved.',
          messageHistory: [
            ...state.messageHistory,
            'Puzzle already solved',
          ].slice(-5),
        };
      }

      // Check if player has required items
      const hasRequiredItems = puzzle.requiredItems.every(itemId =>
        state.inventory.some(item => item.id === itemId)
      );

      if (!hasRequiredItems) {
        return {
          ...state,
          currentMessage: 'You\'re missing some required items for this puzzle.',
          messageHistory: [
            ...state.messageHistory,
            'Missing required items for puzzle',
          ].slice(-5),
        };
      }

      return {
        ...state,
        activePuzzle: puzzleId,
        currentMessage: puzzle.hint,
        messageHistory: [
          ...state.messageHistory,
          'Started puzzle',
        ].slice(-5),
      };
    }

    case 'CANCEL_PUZZLE': {
      return {
        ...state,
        activePuzzle: null,
        currentMessage: 'Cancelled the puzzle.',
        messageHistory: [
          ...state.messageHistory,
          'Cancelled puzzle',
        ].slice(-5),
      };
    }

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  actions: {
    move: (direction: string) => void;
    examineItem: (itemId: string) => void;
    takeItem: (itemId: string) => void;
    useItem: (itemId: string) => void;
    selectItem: (item: Item) => void;
    clearSelectedItem: () => void;
    combineItems: (item1: string, item2: string) => void;
    attemptPuzzle: (puzzleId: string, solution: string[]) => void;
    setMessage: (message: string) => void;
    startPuzzle: (puzzleId: string) => void;
    cancelPuzzle: () => void;
    solvePuzzle: (puzzleId: string) => void;
  };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handlePuzzleSolved = async (puzzleId: string) => {
    // Mark puzzle as solved in state
    dispatch({ type: 'SOLVE_PUZZLE', payload: { puzzleId, solution: [] } })

    // If it's the secret room puzzle, complete the game
    if (puzzleId === 'secretRoom') {
      const startTime = localStorage.getItem('gameStartTime')
      if (startTime) {
        const endTime = new Date().getTime()
        const timeTaken = Math.floor((endTime - parseInt(startTime)) / 1000)
        
        try {
          // Save result to database
          const { error } = await saveGameResult(timeTaken)
          
          if (error) {
            console.error('Failed to save game result:', error)
            dispatch({ 
              type: 'SET_MESSAGE', 
              payload: 'Error saving game completion. Please try again.' 
            })
            return
          }

          console.log('Redirecting to victory page with time:', timeTaken)
          // Force a hard navigation instead of client-side routing
          window.location.href = `/victory?time=${timeTaken}`
        } catch (error) {
          console.error('Error completing game:', error)
          dispatch({ 
            type: 'SET_MESSAGE', 
            payload: 'Error completing game. Please try again.' 
          })
        }
      }
    }
  }

  const actions = {
    move: (direction: string) => dispatch({ type: 'MOVE', payload: direction }),
    examineItem: (itemId: string) => dispatch({ type: 'EXAMINE', payload: itemId }),
    takeItem: (itemId: string) => dispatch({ type: 'TAKE', payload: itemId }),
    useItem: (itemId: string) => dispatch({ type: 'USE', payload: itemId }),
    selectItem: (item: Item) => dispatch({ type: 'SELECT_ITEM', payload: item }),
    clearSelectedItem: () => dispatch({ type: 'CLEAR_SELECTED_ITEM' }),
    combineItems: (item1: string, item2: string) => 
      dispatch({ type: 'COMBINE', payload: { item1, item2 } }),
    attemptPuzzle: (puzzleId: string, solution: string[]) => {
      dispatch({ type: 'SOLVE_PUZZLE', payload: { puzzleId, solution } });
    },
    setMessage: (message: string) => dispatch({ type: 'SET_MESSAGE', payload: message }),
    startPuzzle: (puzzleId: string) => dispatch({ type: 'START_PUZZLE', payload: puzzleId }),
    cancelPuzzle: () => dispatch({ type: 'CANCEL_PUZZLE' }),
    solvePuzzle: handlePuzzleSolved,
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 