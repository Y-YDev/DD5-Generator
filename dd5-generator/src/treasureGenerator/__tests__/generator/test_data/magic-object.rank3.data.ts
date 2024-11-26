import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

export const MAGIC_OBJECTS_RANK3: TestTreasureGenerationData[] = [
  {
    firstRoll: 9,
    rank: 3,
    expectedMagicObject: {
      name: 'Potion de force de géant des pierres/du givre',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 8,
  },
  {
    firstRoll: 27,
    rank: 3,
    expectedMagicObject: {
      name: 'Armure en adamantium',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 5,
  },
  {
    firstRoll: 81,
    rank: 3,
    expectedMagicObject: {
      name: 'Diadème de destruction',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 5,
  },
];
