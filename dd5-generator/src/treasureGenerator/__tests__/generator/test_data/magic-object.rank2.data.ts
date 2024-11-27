import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 2;

export const MAGIC_OBJECTS_RANK2: TestTreasureGenerationData[] = [
	{
		firstRoll: 13,
		rank: RANK,
		expectedMagicObject: {
			name: "Potion d'agrandissement",
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 5,
	},
	{
		firstRoll: 31,
		rank: RANK,
		expectedMagicObject: {
			name: '4 sorts de 1er niveau',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 2,
		thirdRoll: 4,
	},
	{
		firstRoll: 58,
		rank: RANK,
		expectedMagicObject: {
			name: 'Bouclier +1',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 5,
	},
	{
		firstRoll: 64,
		rank: RANK,
		expectedMagicObject: {
			name: 'Baguette des secrets',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 5,
	},
];
