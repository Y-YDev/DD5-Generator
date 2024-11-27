import { Row } from 'read-excel-file';
import { EIndividualTreasureType, ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { INDIVIDUAL_TREASURE_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';

const TREASURE = {
	gemme: {
		'10 po': 'Azurite, Hématite, Malachite, Quartz bleu, Turquoise',
		'50 po': 'Calcédoine, Héliotrope, Jaspe, Onyx, Zircon',
		'100 po': 'Ambre, Améthyste, Grenat, Jade, Perle, Tourmaline',
		'500 po': 'Chrysobéryl, Péridot, Perle noire, Spinelle, Topaze',
		'1000 po': 'Émeraude, Opale noire, Opale de feu, Rubis avec astérisme, Saphir',
		'5000 po': 'Diamant, Rubis, Saphir noir',
	},
	objet: {
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

export class IndividualTreasureGenerator {
	utils = new GeneratorUtils();
	excelUtils = new ExcelUtils();

	async generateIndividualTreasure(encounterLvl: number): Promise<TreasureItemDto[]> {
		const indTreasureTable: Row[] = await this.excelUtils.readExcelFile(INDIVIDUAL_TREASURE_FILE_PATH);

		const { line, column } = this.excelUtils.getGenerationLineAndColumn(encounterLvl, indTreasureTable);
		const indTreasureString = indTreasureTable[line][column].toString();
		console.debug(`Get individual treasure generation for line ${line} and columns ${column}: ${indTreasureString}.`);
		return this.computeIndTreasureGenString(indTreasureString);
	}

	private computeIndTreasureGenString(inputString: string): TreasureItemDto[] {
		let formattedString = inputString;

		if (inputString === '-') {
			return [];
		}
		formattedString = this.utils.replaceDiceValue(formattedString);
		formattedString = this.utils.removeAverageInfo(formattedString);
		// get treasure value to fetch
		const treasureValue: string = this.getIndTreasureCoinValue(formattedString);
		// Get the treasure number
		const treasureNumber: number = this.getIndTreasureNumber(formattedString);
		// Get the treasure type : gems or objects
		const treasureType: EIndividualTreasureType = this.getIndTreasureType(formattedString);

		const res: TreasureItemDto[] = [];
		for (let index = 0; index < treasureNumber; index++) {
			res.push(this.generateIndTreasureObject(treasureType, treasureValue));
		}
		return res;
	}

	private getIndTreasureCoinValue(inputString: string): string {
		const numberRegex: RegExp = /\d+.po/g; // Get XXXXpo

		const match = inputString.match(numberRegex);
		if (match === null) return 'Error';

		return match[0].toString();
	}

	private getIndTreasureNumber(inputString: string): number {
		const numberRegex: RegExp = /^\d+/g; // Get XXXX

		const match = inputString.match(numberRegex);
		if (match === null) return -1;

		return Number(match[0].toString());
	}

	private getIndTreasureType(inputString: string): EIndividualTreasureType {
		if (inputString.includes(EIndividualTreasureType.GEMS)) return EIndividualTreasureType.GEMS;
		if (inputString.includes(EIndividualTreasureType.ART_OBJECT)) return EIndividualTreasureType.ART_OBJECT;

		return EIndividualTreasureType.UNKNOWN;
	}

	public generateIndTreasureObject(treasureType: EIndividualTreasureType, treasureValue: string): TreasureItemDto {
		// Get treasure rewards possible
		const treasurePoolString: string = TREASURE[treasureType][treasureValue];

		const treasurePool: string[] = treasurePoolString.split(',').filter(Boolean);
		const randomIndex = this.utils.rollDice(treasurePool.length) - 1; //== RandInt in pool
		const treasureName = treasurePool[randomIndex];

		return {
			name: treasureName,
			type: ETreasureType.INDIVIDUAL_TREASURE,
			price: treasureValue,
		};
	}
}
