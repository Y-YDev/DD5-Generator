import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 1;

export const MAGIC_OBJECTS_RANK1: TestTreasureGenerationData[] = [
	{
		firstRoll: 25,
		rank: RANK,
		expectedMagicObject: {
			name: "Potion d'escalade",
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 4,
	},
	{
		firstRoll: 54,
		rank: RANK,
		expectedMagicObject: {
			name: '2 tours de magie',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 2,
		thirdRoll: 2,
	},
	{
		firstRoll: 88,
		rank: RANK,
		expectedMagicObject: {
			name: '6 munitions +1',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 4,
		thirdRoll: 6,
	},
	{
		firstRoll: 95,
		rank: RANK,
		expectedMagicObject: {
			name: 'Sac sans fond',
			type: ETreasureType.MAGIC_OBJECT,
		},
	},
];
