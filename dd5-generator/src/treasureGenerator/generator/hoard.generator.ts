import { Row } from 'read-excel-file';
import { EHoardType, ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../../utils/excel.utils';
import { HOARD_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';
import { CoinGenerator } from './coin.generator';

const OBJECT_STRING = 'objet';
const GEM_STRING = 'gemme';

const HOARD = {
	[EHoardType.GEMS]: {
		'10 po':
			'Azurite, Agate enrubannée, Quartz bleu, Agate oeillée, Hématite, Lapis-lazuli, Malachite, Agate mousse, Obsidienne, Rhodochrosite, Oeil-de-trigre, Turquoise',
		'50 po':
			'Héliotrope, Cornaline, Calcédoine, Chrysoprase, Citrine, Jaspe, Pierre de lune, Onyx, Quartz, Sardonyx, Quartz rose étoilé, Zircon',
		'100 po': 'Ambre, Améthyste, Chrysobéryl, Corail, Grenat, Jade, Jais, Perle, Spinelle, Tourmaline',
		'500 po': 'Alexandrite, Chrysobéryl, Aigue-marine, Péridot, Perle noire, Spinelle bleu, Topaze',
		'1000 po':
			'Émeraude, Opale noire, Opale de feu, Opale, Rubis avec astérisme, Rubis étoilé, Saphir bleu, Saphir étoilé, Saphir jaune',
		'5000 po': 'Diamant, Rubis, Saphir noir, Jacinthe',
	},
	[EHoardType.ART_OBJECT]: {
		'25 po':
			"Aiguière en argent, Statuette en os ou en bois rare, Petit bracelet en or, Habits de cérémonie en drap d'or, Masque de velours noir brodé de fil d'argent, Calice en cuivre orné de filigranes d'argent, Calice en or, Paire de dés en os gravés, Petit miroir entouré d'un cadre en bois peint, Petit miroir d'argent, Mouchoir de soie brodée, Médaillon en or contenant un portrait peint, Pendentif en électrum, Portrait d'un noble",
		'250 po':
			"Anneau en or incrusté d'héliotropes, Statuette en ivoire, Gros bracelet en or, Collier en argent orné d'une pierre précieuse, Couronne en bronze, Robe de soie brodée au fil d'or, Grande tapisserie de qualité, Anneau en platine serti de jaspes, Grande tasse en laiton incrustée de jade, Boîte contenant des figurines d'animaux en turquoise, Cage à oiseaux en or avec des filigranes d'électrum, Figurines en ivoire, Couronne d'or et d'argent, Statuette en jade, Tapisserie brodée de fil d'or",
		'750 po':
			"Masque cérémoniel en or serti d'ambre, Dague sacrificielle damasquinée de platine, Idole en or aux yeux de perle, Calice d'argent serti de pierres-de-lune, Épée longue en acier plaqué d'argent et à la garde sertie de jais, Harpe en bois exotique incrustée d'ivoire et de zircons, Petite idole en or, Peigne d'or en forme de dragon dont les yeux sont des grenats rouges, Bouchon de carafe ornée de feuilles d'or et serti d'améthystes, Dague cérémonielle en électrum avec une perle noire incrustée dans le pommeau, Broche en argent et en or, Statuette en obsidienne incrustée d'or, Masque de guerre en or peint",
		'2500 po':
			"Pectoral en platine serti d'opales, Gantelet ouvragé en or et argent, Calice en or serti de perles, Sculpture en marbre d'un grand maître, Chaînette en or serti d'une opale de feu, Tableau de maître ancien, Manteau de soie et de velours brodé et serti de nombreuses pierres-de-lune, Bracelet en platine serti d'un saphir, Gant brodé et serti d'éclats de pierre précieuse, Bracelet de cheville orné de pierreries, Boîte à musique en or, Tiare en or sertie de quatre aigues-marines, Cache-oeil orne d'un faux-oeil compose d'un saphir bleu et d'une pierre-de-lune, Fin collier de petites perles roses",
		'7500 po':
			"Couronne en or orné de pierreries, Anneau de platine orné de pierreries, Petite statuette en or sertie de rubis, Coupe en or incrustée d'émeraudes, Boite à bijoux en or ornée de filigrares de platine, Sarcophage d'enfant en or peint, Plateau de jeu en jade avec des pièces en or massif, Corne à boire en ivoire ornée de pierreries et de filigranes d'or, Couronne d'un empereur en platine sertie d'opales noires, Cor de chasse en ivoire relevé d'or et de platine, Dague sacrificielle dont la lame est une dent de dragon",
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
