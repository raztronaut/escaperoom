import { Puzzle, ItemCombination } from '@/types/game';

export const puzzles: { [key: string]: Puzzle } = {
  bookshelfPuzzle: {
    id: 'bookshelfPuzzle',
    isSolved: false,
    requiredItems: ['journal'],
    solution: ['red', 'blue', 'green', 'blue'],
    hint: 'The colored books must be arranged according to the pattern in the journal.',
    failureMessage: 'The books glow briefly but nothing happens.',
    successMessage: 'The bookshelf slides aside, revealing a hidden passage! You notice a metal frame has been exposed.',
    reward: 'metalFrame'
  },
  alchemyPuzzle: {
    id: 'alchemyPuzzle',
    isSolved: false,
    requiredItems: ['alchemyBook'],
    solution: ['blueEssence', 'redCrystal', 'moonflower'],
    hint: 'According to the book, first mix blue essence with the vial, then add the red crystal, and finally the moonflower petal.',
    failureMessage: 'The mixture fizzles and becomes inert.',
    successMessage: 'The potion glows with an ethereal light! You\'ve created the Revealing Potion.',
    reward: 'revealingPotion'
  },
  mirrorPuzzle: {
    id: 'mirrorPuzzle',
    isSolved: false,
    requiredItems: ['mirror', 'lantern'],
    solution: ['reflect', 'illuminate', 'observe'],
    hint: 'Use the mirror to reflect light from your lantern onto the maze walls. The reflections will reveal the true path.',
    failureMessage: 'The reflections swirl but remain unclear.',
    successMessage: 'The mirror reveals the true path through the maze! You can now see the way forward.',
    reward: 'mazeKey'
  },
  secretRoomPuzzle: {
    id: 'secretRoomPuzzle',
    isSolved: false,
    requiredItems: ['revealingPotion', 'mazeKey'],
    solution: ['drink', 'unlock', 'enter'],
    hint: 'The revealing potion will show you the truth, and the maze key will grant you passage.',
    failureMessage: 'Something is still missing. The way forward remains unclear.',
    successMessage: 'As you drink the potion, ancient symbols become visible on the walls. The maze key begins to glow, and a hidden door appears!',
    reward: 'escape'
  }
};

export const itemCombinations: ItemCombination[] = [
  {
    itemIds: ['brokenLantern', 'oil'],
    resultItemId: 'lantern',
    message: 'You repair and fill the lantern. It now provides a steady light!'
  },
  {
    itemIds: ['mirrorShard', 'metalFrame'],
    resultItemId: 'mirror',
    message: 'You carefully attach the mirror shard to the frame, creating a mystical mirror.'
  },
  {
    itemIds: ['emptyVial', 'blueEssence'],
    resultItemId: 'blueVial',
    message: 'You pour the blue essence into the vial. The liquid swirls with magical energy.'
  },
  {
    itemIds: ['blueVial', 'redCrystal'],
    resultItemId: 'mixedVial',
    message: 'The red crystal dissolves into the blue essence, creating a swirling mixture.'
  },
  {
    itemIds: ['mixedVial', 'moonflower'],
    resultItemId: 'revealingPotion',
    message: 'You add the moonflower petal. The mixture transforms into a shimmering revealing potion!'
  }
]; 