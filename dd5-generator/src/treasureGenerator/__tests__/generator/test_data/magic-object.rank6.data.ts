import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

export const MAGIC_OBJECTS_RANK6: TestTreasureGenerationData[] = [
  {
    firstRoll: 87,
    rank: 6,
    expectedMagicObject: {
      name: 'Baguette de métamorphose',
      type: ETreasureType.MAGIC_OBJECT,
    },
  },
  {
    firstRoll: 6,
    rank: 6,
    expectedMagicObject: {
      name: 'Potion de force de géant des nuages',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 4,
  },
  {
    firstRoll: 23,
    rank: 6,
    expectedMagicObject: {
      name: '3 sorts de 5e niveau',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 2,
    thirdRoll: 3,
  },
  {
    firstRoll: 42,
    rank: 6,
    expectedMagicObject: {
      name: 'Cimeterre de célérité',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 13,
  },
  {
    firstRoll: 68,
    rank: 6,
    expectedMagicObject: {
      name: 'Armure démoniaque',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 9,
  },
  {
    firstRoll: 83,
    rank: 6,
    expectedMagicObject: {
      name: "Pierre ioun d'intellect",
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 7,
  },
];
