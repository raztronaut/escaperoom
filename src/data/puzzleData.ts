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
  mirrorPuzzle: {
    id: 'mirrorPuzzle',
    isSolved: false,
    requiredItems: ['repairedLantern', 'mirror'],
    solution: ['1', '2', '4', '3'],
    hint: 'The ancient mirrors must be activated in a specific sequence. Watch how the light reflects between them.',
    failureMessage: 'The mirrors shimmer briefly but return to darkness.',
    successMessage: 'The mirrors align perfectly, creating a dazzling display of light that reveals a hidden mechanism!',
    reward: 'mazeKey'
  },
  secretRoom: {
    id: 'secretRoom',
    isSolved: false,
    requiredItems: ['revealingPotion', 'mazeKey'],
    solution: ['1', '2', '3', '4'],
    hint: 'The chamber walls shimmer with hidden runes. Perhaps the revealing potion could show their true nature.',
    failureMessage: 'The walls seem to hold some secret, but you cannot interact with them yet.',
    successMessage: 'The maze key resonates with the revealed runes. The chamber recognizes you as worthy!',
    reward: 'escape'
  }
};

export const itemCombinations: ItemCombination[] = [
  {
    itemIds: ['brokenLantern', 'oil'],
    resultItemId: 'repairedLantern',
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