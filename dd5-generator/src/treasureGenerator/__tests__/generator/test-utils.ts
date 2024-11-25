import { ETreasureType } from '../../utils/enum';

export interface TestTreasureGenerationData {
  firstRoll: number;
  rank: number;
  expectedMagicObject: {
    name: string;
    type: ETreasureType.MAGIC_OBJECT;
  };
  secondRoll?: number;
  thirdRoll?: number;
  testName?: string;
}

export function generateTestName(obj: TestTreasureGenerationData): string {
  return `a ${obj.firstRoll} rolled${obj.secondRoll ? ' (followed by a ' + obj.secondRoll + ')' : ''} on rank ${
    obj.rank
  } should return a ${obj.expectedMagicObject.name}`;
}
