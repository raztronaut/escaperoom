import { Room, Item } from '@/types/game';

export const items: { [key: string]: Item } = {
  journal: {
    id: 'journal',
    name: 'Dusty Journal',
    description: 'An old journal with strange symbols and colored patterns.',
    canPickup: true,
    isUsable: true,
    examineResult: 'The journal contains a sequence of colored squares: red, blue, green, blue. There\'s also a note about a hidden passage in the library.',
    interactions: ['The pages are filled with cryptic notes about a hidden passage.'],
    icon: '📔',
    category: 'book',
    energyCost: 5,
    sanityEffect: -5
  },
  brokenLantern: {
    id: 'brokenLantern',
    name: 'Broken Lantern',
    description: 'A damaged oil lantern that could work if repaired.',
    canPickup: true,
    isUsable: false,
    useWith: ['oil'],
    interactions: ['The lantern is missing oil and has a cracked lens.'],
    icon: '🏮',
    category: 'tool'
  },
  oil: {
    id: 'oil',
    name: 'Lamp Oil',
    description: 'A small bottle of refined lamp oil.',
    canPickup: true,
    isUsable: true,
    useWith: ['brokenLantern'],
    interactions: ['The oil sloshes gently in the bottle.'],
    icon: '🛢️',
    category: 'ingredient'
  },
  lantern: {
    id: 'lantern',
    name: 'Repaired Lantern',
    description: 'A working oil lantern that provides steady light.',
    canPickup: true,
    isUsable: true,
    examineResult: 'The lantern burns brightly, perfect for illuminating dark places.',
    interactions: ['The lantern casts a warm, steady glow.'],
    icon: '🔦',
    category: 'tool',
    energyCost: 5,
    sanityEffect: 10
  },
  alchemyBook: {
    id: 'alchemyBook',
    name: 'Tome of Alchemy',
    description: 'A heavy book filled with potion recipes.',
    canPickup: true,
    isUsable: true,
    examineResult: 'One page details a recipe for a "Potion of Revealing": First mix blue essence with red crystal, then add a moonflower petal.',
    interactions: ['The pages are filled with complex alchemical formulas.'],
    icon: '📚',
    category: 'book',
    energyCost: 8,
    sanityEffect: -10
  },
  blueEssence: {
    id: 'blueEssence',
    name: 'Blue Essence',
    description: 'A vial of glowing blue liquid.',
    canPickup: true,
    isUsable: true,
    useWith: ['emptyVial'],
    interactions: ['The essence glows with an ethereal blue light.'],
    icon: '🧪',
    category: 'ingredient',
    energyCost: 5,
    sanityEffect: -5
  },
  redCrystal: {
    id: 'redCrystal',
    name: 'Red Crystal',
    description: 'A blood-red crystal that pulses with energy.',
    canPickup: true,
    isUsable: true,
    useWith: ['blueVial'],
    interactions: ['The crystal feels warm to the touch.'],
    icon: '💎',
    category: 'ingredient',
    energyCost: 5,
    healthEffect: -5
  },
  moonflower: {
    id: 'moonflower',
    name: 'Moonflower',
    description: 'A rare flower that blooms in moonlight.',
    canPickup: true,
    isUsable: true,
    useWith: ['mixedVial'],
    interactions: ['The flower petals shimmer with a silvery light.'],
    icon: '🌸',
    category: 'ingredient',
    energyCost: 3,
    sanityEffect: 5
  },
  emptyVial: {
    id: 'emptyVial',
    name: 'Empty Vial',
    description: 'A clean glass vial suitable for mixing potions.',
    canPickup: true,
    isUsable: true,
    useWith: ['blueEssence'],
    interactions: ['The vial is made of fine crystal glass.'],
    icon: '🧪',
    category: 'tool',
    energyCost: 2
  },
  blueVial: {
    id: 'blueVial',
    name: 'Vial of Blue Essence',
    description: 'A vial containing swirling blue essence.',
    canPickup: true,
    isUsable: true,
    useWith: ['redCrystal'],
    examineResult: 'The blue essence swirls in the vial, waiting for the next ingredient.',
    interactions: ['The blue essence glows softly.'],
    icon: '🧪',
    category: 'potion',
    energyCost: 5,
    sanityEffect: -8
  },
  mixedVial: {
    id: 'mixedVial',
    name: 'Mixed Potion',
    description: 'A vial containing a swirling mixture of blue essence and red crystal.',
    canPickup: true,
    isUsable: true,
    useWith: ['moonflower'],
    examineResult: 'The mixture swirls with energy. It needs one final ingredient.',
    interactions: ['The mixture pulses with magical energy.'],
    icon: '🧪',
    category: 'potion',
    energyCost: 8,
    healthEffect: -10,
    sanityEffect: -10
  },
  revealingPotion: {
    id: 'revealingPotion',
    name: 'Revealing Potion',
    description: 'A mysterious potion that reveals hidden truths.',
    canPickup: true,
    isUsable: true,
    examineResult: 'The completed potion swirls with mysterious colors, ready to reveal hidden secrets.',
    interactions: ['The potion glows with an otherworldly light.'],
    icon: '✨',
    category: 'potion',
    energyCost: 15,
    healthEffect: -5,
    sanityEffect: -20
  },
  healingPotion: {
    id: 'healingPotion',
    name: 'Healing Potion',
    description: 'A soothing potion that restores health.',
    canPickup: true,
    isUsable: true,
    icon: '❤️',
    category: 'potion',
    energyCost: 5,
    healthEffect: 30
  },
  energyPotion: {
    id: 'energyPotion',
    name: 'Energy Potion',
    description: 'A fizzing potion that restores energy.',
    canPickup: true,
    isUsable: true,
    icon: '⚡',
    category: 'potion',
    energyCost: 0,
    energyEffect: 50
  },
  calmingTea: {
    id: 'calmingTea',
    name: 'Calming Tea',
    description: 'A warm cup of tea that soothes the mind.',
    canPickup: true,
    isUsable: true,
    icon: '🍵',
    category: 'potion',
    energyCost: 5,
    sanityEffect: 25
  },
  coloredBooks: {
    id: 'coloredBooks',
    name: 'Colored Books',
    description: 'A set of books with distinctly colored spines: red, blue, green, and yellow.',
    canPickup: true,
    isUsable: true,
    examineResult: 'The books seem to be arranged in a specific order. Maybe they can be rearranged?',
    interactions: ['The colored spines seem to glow faintly.'],
    icon: '📚',
    category: 'puzzle',
    energyCost: 5
  },
  mirrorShard: {
    id: 'mirrorShard',
    name: 'Mirror Shard',
    description: 'A broken piece of a mystical mirror that still reflects strangely.',
    canPickup: true,
    isUsable: true,
    useWith: ['metalFrame'],
    examineResult: 'The shard shows reflections that don\'t match reality.',
    interactions: ['The shard glints with an otherworldly light.'],
    icon: '🪞',
    category: 'puzzle',
    energyCost: 5,
    sanityEffect: -5
  },
  metalFrame: {
    id: 'metalFrame',
    name: 'Metal Frame',
    description: 'An ornate metal frame that seems designed to hold something.',
    canPickup: true,
    isUsable: true,
    useWith: ['mirrorShard'],
    examineResult: 'The frame has intricate patterns and seems to be missing its mirror.',
    interactions: ['The frame feels cold to the touch.'],
    icon: '⚜️',
    category: 'puzzle',
    energyCost: 5
  },
  mirror: {
    id: 'mirror',
    name: 'Mystical Mirror',
    description: 'A restored mirror that shows strange reflections.',
    canPickup: true,
    isUsable: true,
    examineResult: 'The mirror shows impossible reflections and seems to pulse with magical energy.',
    interactions: ['The mirror surface ripples like water when touched.'],
    icon: '🪞',
    category: 'puzzle',
    energyCost: 5,
    sanityEffect: -10
  }
};

export const rooms: { [key: string]: Room } = {
  study: {
    id: 'study',
    name: 'Mysterious Study',
    description: 'A dimly lit room filled with old books and furniture. Dust motes dance in the air.',
    visitedDescription: 'The familiar study feels different each time you enter.',
    items: [items.journal, items.emptyVial],
    exits: {
      north: 'library',
      east: 'alchemyRoom'
    },
    ambientMessages: [
      'A cold breeze rustles the pages of nearby books.',
      'You hear faint whispers coming from the walls.',
      'The shadows seem to move when you\'re not looking directly at them.'
    ]
  },
  library: {
    id: 'library',
    name: 'Ancient Library',
    description: 'Towering bookshelves line the walls. The air is thick with the smell of old paper.',
    visitedDescription: 'The library\'s endless rows of books hold many secrets.',
    items: [items.coloredBooks, items.mirrorShard],
    exits: {
      south: 'study',
      east: 'secretRoom',
      north: 'maze'
    },
    hiddenExits: {
      west: 'hiddenPassage'
    },
    puzzles: ['bookshelfPuzzle'],
    ambientMessages: [
      'Books occasionally shuffle themselves on the shelves.',
      'You catch glimpses of movement in your peripheral vision.',
      'The temperature drops noticeably as you move deeper into the room.'
    ]
  },
  alchemyRoom: {
    id: 'alchemyRoom',
    name: 'Mysterious Laboratory',
    description: 'A cluttered room filled with bubbling apparatus and strange ingredients.',
    items: [items.alchemyBook, items.blueEssence, items.redCrystal],
    exits: {
      west: 'study',
      north: 'greenhouse'
    },
    puzzles: ['alchemyPuzzle'],
    ambientMessages: [
      'Bubbles pop in various containers with musical notes.',
      'Strange vapors form shapes in the air.',
      'The room hums with magical energy.'
    ]
  },
  greenhouse: {
    id: 'greenhouse',
    name: 'Overgrown Greenhouse',
    description: 'A humid greenhouse with mysterious plants growing in the moonlight.',
    items: [items.moonflower, items.brokenLantern, items.oil],
    exits: {
      south: 'alchemyRoom',
      east: 'maze'
    },
    ambientMessages: [
      'Plants seem to reach toward you as you pass.',
      'Moonflowers bloom and close in an unseen rhythm.',
      'The air is thick with exotic fragrances.'
    ]
  },
  maze: {
    id: 'maze',
    name: 'Mirror Maze',
    description: 'A confusing maze of mirrors that reflect infinite possibilities.',
    isDark: true,
    items: [],
    exits: {
      south: 'library',
      west: 'greenhouse',
      north: 'secretRoom'
    },
    requiredItems: ['lantern'],
    puzzles: ['mirrorPuzzle'],
    ambientMessages: [
      'Your reflections move independently in the mirrors.',
      'The maze layout seems to shift when you blink.',
      'Echoes of your footsteps come from impossible directions.'
    ]
  },
  secretRoom: {
    id: 'secretRoom',
    name: 'Chamber of Secrets',
    description: 'A hidden chamber with strange symbols covering every surface.',
    visitedDescription: 'The mysterious chamber pulses with arcane energy.',
    items: [],
    exits: {
      south: 'maze'
    },
    isLocked: true,
    requiredItems: ['revealingPotion', 'mazeKey'],
    puzzles: ['secretRoomPuzzle'],
    ambientMessages: [
      'The symbols on the walls seem to shift and change.',
      'A faint humming emanates from somewhere in the room.',
      'The air feels charged with ancient magic.'
    ]
  }
}; 