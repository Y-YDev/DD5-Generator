import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

export const MAGIC_OBJECTS_RANK7: TestTreasureGenerationData[] = [
  {
    firstRoll: 75,
    rank: 7,
    expectedMagicObject: {
      name: 'Fer gelé',
      type: ETreasureType.MAGIC_OBJECT,
    },
  },
  {
    firstRoll: 11,
    rank: 7,
    expectedMagicObject: {
      name: 'Anneau de régénération',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 3,
  },
  {
    firstRoll: 23,
    rank: 7,
    expectedMagicObject: {
      name: 'Baton de givre',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 6,
  },
  {
    firstRoll: 44,
    rank: 7,
    expectedMagicObject: {
      name: 'Traité de perspicacité',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 19,
  },
  {
    firstRoll: 58,
    rank: 7,
    expectedMagicObject: {
      name: 'Sceptre de sécurité',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 4,
  },
];
