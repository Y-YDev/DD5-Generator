import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 3;

export const MAGIC_OBJECTS_RANK3: TestTreasureGenerationData[] = [
  {
    firstRoll: 9,
    rank: RANK,
    expectedMagicObject: {
      name: 'Potion de force de géant des pierres/du givre',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 8,
  },
  {
    firstRoll: 27,
    rank: RANK,
    expectedMagicObject: {
      name: 'Armure en adamantium',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 5,
  },
  {
    firstRoll: 81,
    rank: RANK,
    expectedMagicObject: {
      name: 'Diadème de destruction',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 5,
  },
];
