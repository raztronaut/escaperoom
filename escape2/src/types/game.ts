import { puzzles } from '@/data/puzzleData';

export interface ItemCombination {
  itemIds: [string, string];
  resultItemId: string;
  message: string;
}

export interface Puzzle {
  id: string;
  isSolved: boolean;
  requiredItems: string[];
  solution: string[];
  hint: string;
  reward?: string;
  failureMessage: string;
  successMessage: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  category?: string;
  canPickup?: boolean;
  isUsable?: boolean;
  isHidden?: boolean;
  useWith?: string[];
  examineResult?: string;
  revealMessage?: string;
  interactions?: string[];
  energyCost?: number;
  healthEffect?: number;
  sanityEffect?: number;
  energyEffect?: number;
}

export interface CharacterStats {
  health: number;
  sanity: number;
  energy: number;
}

export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  duration: number;
  icon: string;
  stats: Partial<CharacterStats>;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  visitedDescription?: string;
  items: Item[];
  exits: {
    [key: string]: string;
  };
  hiddenExits?: {
    [key: string]: string;
  };
  isDark?: boolean;
  isLocked?: boolean;
  requiredItems?: string[];
  puzzles?: string[];
  ambientMessages?: string[];
}

export interface GameState {
  currentRoom: Room;
  roomStates: {
    [key: string]: {
      items: Item[];
      discoveredSecrets: string[];
      solvedPuzzles: string[];
    };
  };
  inventory: Item[];
  visitedRooms: string[];
  gameComplete: boolean;
  solvedPuzzles: string[];
  discoveredSecrets: string[];
  gameTime: number;
  lightSource: boolean;
  currentMessage: string;
  combinedItems: string[];
  messageHistory: string[];
  activeEffects: any[];
  lastAction: string;
  selectedItem: Item | null;
  activePuzzle: string | null;
  stats: {
    health: number;
    sanity: number;
    energy: number;
  };
}

export type GameAction =
  | { type: 'MOVE'; payload: string }
  | { type: 'EXAMINE'; payload: string }
  | { type: 'TAKE'; payload: string }
  | { type: 'USE'; payload: string }
  | { type: 'SELECT_ITEM'; payload: Item }
  | { type: 'CLEAR_SELECTED_ITEM' }
  | { type: 'COMBINE'; payload: { item1: string; item2: string } }
  | { type: 'SOLVE_PUZZLE'; payload: { puzzleId: string; solution: string[] } }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'START_PUZZLE'; payload: string }
  | { type: 'CANCEL_PUZZLE' };

export type PuzzleId = keyof typeof puzzles; 