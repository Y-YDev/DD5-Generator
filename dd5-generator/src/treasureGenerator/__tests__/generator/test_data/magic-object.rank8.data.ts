import { ETreasureType } from '../../../utils/enum';
import { TestTreasureGenerationData } from '../test-utils';

const RANK = 8;

export const MAGIC_OBJECTS_RANK8: TestTreasureGenerationData[] = [
	{
		firstRoll: 18,
		rank: RANK,
		expectedMagicObject: {
			name: '1 sorts de 9e niveau',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 7,
		thirdRoll: 1,
	},
	{
		firstRoll: 33,
		rank: RANK,
		expectedMagicObject: {
			name: 'Marteau du tonnerre',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 6,
	},
	{
		firstRoll: 37,
		rank: RANK,
		expectedMagicObject: {
			name: "Armure d'invulnérabilité",
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 5,
	},
	{
		firstRoll: 52,
		rank: RANK,
		expectedMagicObject: {
			name: 'Anneau de triple souhait',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 9,
	},
	{
		firstRoll: 64,
		rank: RANK,
		expectedMagicObject: {
			name: 'Boule de cristal de télépathie',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 4,
	},
	{
		firstRoll: 68,
		rank: RANK,
		expectedMagicObject: {
			name: "Pierre ioun d'absorption supérieure",
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 1,
	},
	{
		firstRoll: 78,
		rank: RANK,
		expectedMagicObject: {
			name: 'Talisman du bien ultime',
			type: ETreasureType.MAGIC_OBJECT,
		},
		secondRoll: 3,
	},
	{
		firstRoll: 86,
		rank: RANK,
		expectedMagicObject: {
			name: 'Cor du Valhalla de fer',
			type: ETreasureType.MAGIC_OBJECT,
		},
	},
];
