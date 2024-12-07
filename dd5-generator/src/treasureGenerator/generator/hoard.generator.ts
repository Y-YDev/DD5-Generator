import { Row } from 'read-excel-file';
import { EHoardType, ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { HOARD_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';
import { CoinGenerator } from './coin.generator';

const OBJECT_STRING = 'objet';
const GEM_STRING = 'gemme';

const HOARD = {
	[EHoardType.GEMS]: {
		'10 po': 'Azurite, Hématite, Malachite, Quartz bleu, Turquoise',
		'50 po': 'Calcédoine, Héliotrope, Jaspe, Onyx, Zircon',
		'100 po': 'Ambre, Améthyste, Grenat, Jade, Perle, Tourmaline',
		'500 po': 'Chrysobéryl, Péridot, Perle noire, Spinelle, Topaze',
		'1000 po': 'Émeraude, Opale noire, Opale de feu, Rubis avec astérisme, Saphir',
		'5000 po': 'Diamant, Rubis, Saphir noir',
	},
	[EHoardType.ART_OBJECT]: {
		'25 po':
			"Statuette en os ou en bois rare, Bracelet en or, Calice en or, Petit miroir d'argent, Pendentif en électrum, Portrait d'un noble",
		'250 po':
			"Anneau en platine serti de jaspes, Figurines en ivoire, Couronne d'or et d'argent, Statuette en jade, Tapisserie brodée de fil d'or",
		'750 po': "Masque cérémoniel en or serti d'ambre, Dague sacrificielle damasquinée de platine, Idole en or aux yeux de perle",
		'2500 po':
			"Pectoral en platine serti d'opales, Gantelet ouvragé en or et argent, Calice en or serti de perles, Sculpture en marbre d'un grand maître",
		'7500 po':
			"Couronne d'un empereur en platine sertie d'opales noires, Cor de chasse en ivoire relevé d'or et de platine, Dague sacrificielle dont la lame est une dent de dragon",
	},
};

export class HoardGenerator {
	utils = new GeneratorUtils();
	excelUtils = new ExcelUtils();
	coinGenerator = new CoinGenerator();

	async generateHoard(encounterLvl: number, addBonus: boolean): Promise<TreasureItemDto[]> {
		const hoardTable: Row[] = await this.excelUtils.readExcelFile(HOARD_FILE_PATH);

		const { line, column } = this.excelUtils.getGenerationLineAndColumn(encounterLvl, hoardTable);
		const hoardString = hoardTable[line][column].toString();
		console.debug(`Get hoard generation for line ${line} and columns ${column}: ${hoardString}.`);
		const hoardTreasure = this.computeHoardGenString(hoardString);

		if (addBonus) {
			const hoardBonus = await this.generateHoardBonus(encounterLvl);
			hoardTreasure.push(...hoardBonus);
		}
		return hoardTreasure;
	}

	private async generateHoardBonus(encounterLvl: number): Promise<TreasureItemDto[]> {
		const hoardBonusTable: Row[] = await this.excelUtils.readExcelFile(HOARD_FILE_PATH, 2);

		const column = this.excelUtils.getEncounterLevelColumn(encounterLvl, hoardBonusTable);
		const bonusString = hoardBonusTable[1][column].toString();
		console.debug(`Get hoard bonus generation for column ${column}: ${bonusString}.`);
		return this.coinGenerator.computeCoinGenerationString(bonusString).map((name) => ({
			name,
			type: ETreasureType.COIN,
			metaData: { coinType: this.coinGenerator.extractCoinType(name), repartition: 'From hoard bonus' },
		}));
	}

	private computeHoardGenString(inputString: string): TreasureItemDto[] {
		let formattedString = inputString;

		if (inputString === '-') {
			return [];
		}
		formattedString = this.utils.replaceDiceValue(formattedString);
		formattedString = this.utils.removeAverageInfo(formattedString);
		// get hoard value to fetch
		const hoardValue: string = this.getHoardCoinValue(formattedString);
		// Get the hoard number
		const hoardNumber: number = this.getHoardNumber(formattedString);
		// Get the hoard type : gems or objects
		const hoardType: EHoardType = this.getHoardType(formattedString);

		const res: TreasureItemDto[] = [];
		for (let index = 0; index < hoardNumber; index++) {
			const hoard = this.generateHoardObject(hoardType, hoardValue);
			if (hoard) res.push(hoard);
		}
		return res;
	}

	private getHoardCoinValue(inputString: string): string {
		const numberRegex: RegExp = /\d+.po/g; // Get XXXXpo

		const match = inputString.match(numberRegex);
		if (match === null) return 'Error';

		return match[0].toString();
	}

	private getHoardNumber(inputString: string): number {
		const numberRegex: RegExp = /^\d+/g; // Get XXXX

		const match = inputString.match(numberRegex);
		if (match === null) return -1;

		return Number(match[0].toString());
	}

	private getHoardType(inputString: string): EHoardType {
		if (inputString.includes(GEM_STRING)) return EHoardType.GEMS;
		if (inputString.includes(OBJECT_STRING)) return EHoardType.ART_OBJECT;

		return EHoardType.UNKNOWN;
	}

	public generateHoardObject(hoardType: EHoardType, hoardValue: string): TreasureItemDto | undefined {
		// Get hoard rewards possible
		const hoardPoolString: string = HOARD[hoardType]?.[hoardValue];

		if (!hoardPoolString) return undefined;

		const hoardPool: string[] = hoardPoolString.split(',').filter(Boolean);
		const randomIndex = this.utils.rollDice(hoardPool.length) - 1; //== RandInt in pool
		const hoardName = hoardPool[randomIndex];

		return {
			name: hoardName,
			type: ETreasureType.HOARD,
			price: hoardValue,
			subType: hoardType.toString(),
		};
	}
}
