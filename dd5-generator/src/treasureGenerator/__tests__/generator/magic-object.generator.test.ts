import { MagicObjectGenerator } from '../../generator/magic-object.generator';
import { generateTestName } from './test-utils';
import { MAGIC_OBJECTS_RANK1 } from './test_data/magic-object.rank1.data';
import { MAGIC_OBJECTS_RANK2 } from './test_data/magic-object.rank2.data';
import { MAGIC_OBJECTS_RANK3 } from './test_data/magic-object.rank3.data';
import { MAGIC_OBJECTS_RANK4 } from './test_data/magic-object.rank4.data';
import { MAGIC_OBJECTS_RANK5 } from './test_data/magic-object.rank5.data';
import { MAGIC_OBJECTS_RANK6 } from './test_data/magic-object.rank6.data';
import { MAGIC_OBJECTS_RANK7 } from './test_data/magic-object.rank7.data';

const SECONDS = 1000;
jest.setTimeout(10 * SECONDS); // Allow 10 seconds timeout since we are testing all the ranks

const testCases = [
  { rankName: 'Rank 1', testData: MAGIC_OBJECTS_RANK1 },
  { rankName: 'Rank 2', testData: MAGIC_OBJECTS_RANK2 },
  { rankName: 'Rank 3', testData: MAGIC_OBJECTS_RANK3 },
  { rankName: 'Rank 5', testData: MAGIC_OBJECTS_RANK5 },
  { rankName: 'Rank 4', testData: MAGIC_OBJECTS_RANK4 },
  { rankName: 'Rank 6', testData: MAGIC_OBJECTS_RANK6 },
  { rankName: 'Rank 7', testData: MAGIC_OBJECTS_RANK7 },
];

describe('MagicObjectGenerator', () => {
  let magicObjectGenerator: MagicObjectGenerator;

  beforeEach(() => {
    magicObjectGenerator = new MagicObjectGenerator();
    console.debug = jest.fn(); // disable console.debug during tests (FIXME: use proper logger)
    console.log = jest.fn(); // disable console.log during tests (FIXME: use proper logger)
  });

  it('should be defined', () => {
    expect(magicObjectGenerator).toBeDefined();
  });

  for (const { rankName, testData } of testCases) {
    describe(rankName, () => {
      for (const testPayload of testData) {
        const testName = generateTestName(testPayload);
        it(testName, async () => {
          jest
            .spyOn(magicObjectGenerator.utils, 'rollDice')
            .mockReturnValueOnce(testPayload.firstRoll)
            .mockReturnValueOnce(testPayload.secondRoll || -1) // if secondRoll is not defined, return -1 (not supposed to occur)
            .mockReturnValueOnce(testPayload.thirdRoll || -1); // if thirdRoll is not defined, return -1 (not supposed to occur)
          const magicObject = await magicObjectGenerator.generateMagicObjectByRank(testPayload.rank);
          expect(magicObject).toBeDefined();
          expect(magicObject).toStrictEqual(testPayload.expectedMagicObject);
        });
      }
    });
  }
});
