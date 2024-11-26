import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 7;

export const MAGIC_OBJECTS_RANK7: TestTreasureGenerationData[] = [
  {
    firstRoll: 75,
    rank: RANK,
    expectedMagicObject: {
      name: 'Fer gelé',
      type: ETreasureType.MAGIC_OBJECT,
    },
  },
  {
    firstRoll: 11,
    rank: RANK,
    expectedMagicObject: {
      name: 'Anneau de régénération',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 3,
  },
  {
    firstRoll: 23,
    rank: RANK,
    expectedMagicObject: {
      name: 'Baton de givre',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 6,
  },
  {
    firstRoll: 44,
    rank: RANK,
    expectedMagicObject: {
      name: 'Traité de perspicacité',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 19,
  },
  {
    firstRoll: 58,
    rank: RANK,
    expectedMagicObject: {
      name: 'Sceptre de sécurité',
      type: ETreasureType.MAGIC_OBJECT,
    },
    secondRoll: 4,
  },
];
