import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 5;

export const MAGIC_OBJECTS_RANK5: TestTreasureGenerationData[] = [
	{
		firstRoll: 20,
		rank: RANK,
		expectedMagicObject: {
			name: 'Anneau de vision aux rayons X',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 11,
	},
	{
		firstRoll: 31,
		rank: RANK,
		expectedMagicObject: {
			name: 'Bâton du grand essaim',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 6,
	},
	{
		firstRoll: 47,
		rank: RANK,
		expectedMagicObject: {
			name: 'Figurine merveilleuse de chouette serpentine',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 6,
	},
	{
		firstRoll: 61,
		rank: RANK,
		expectedMagicObject: {
			name: 'Pierre ioun de réserve',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 3,
	},
];
