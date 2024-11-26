import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

export const MAGIC_OBJECTS_RANK4: TestTreasureGenerationData[] = [
  {
    firstRoll: 8,
    rank: 4,
    expectedMagicObject: {
      name: "Potion d'héroïsme",
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 4,
  },
  {
    firstRoll: 39,
    rank: 4,
    expectedMagicObject: {
      name: '4 sorts de 4e niveau',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 6,
    thirdRoll: 4,
  },
  {
    firstRoll: 54,
    rank: 4,
    expectedMagicObject: {
      name: 'Hache de berserker',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 15,
  },
  {
    firstRoll: 62,
    rank: 4,
    expectedMagicObject: {
      name: 'Chemise de mailles elfique',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 18,
  },
  {
    firstRoll: 79,
    rank: 4,
    expectedMagicObject: {
      name: 'Baguette entoilée',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 11,
  },
];
