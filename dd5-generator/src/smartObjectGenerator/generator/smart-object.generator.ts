import { GeneratorUtils } from 'src/utils/generator.utils';
import {
	ANCESTRIES,
	FAMILY,
	GENDERS,
	MAGIC_OBJECT_ADDITIONAL_PARTICULARITY,
	MAGIC_OBJECT_FUN_FACTS,
	NAME_GENERATOR_API_URL,
	SMART_OBJECT_FILE_PATH,
	SMART_OBJECT_PUNISHMENT,
	SMART_OBJECT_REQUIREMENT,
} from '../utils/const';
import axios from 'axios';
import { DNDStatsDto, SmartObjectConflictDto, SmartObjectDto } from '../dto/smartObject.dto';
import { EStatsType } from '../utils/enum';
import { ExcelUtils } from 'src/utils/excel.utils';
import { Row } from 'read-excel-file/types';

export class SmartObjectGenerator {
	utils = new GeneratorUtils();
	excelUtils = new ExcelUtils();

	public async generateSmartObject(addParticularity = true): Promise<SmartObjectDto> {
		const name = await this.generateRandomName();
		const stats = this.generateRandomStat();
		const communication = await this.generateCommunicationMode();
		const sense = await this.generateSense();
		const { alignment, alignmentLine } = await this.generateAlignment();
		const { specialPurpose, specialPurposeLine } = await this.generateSpecialPurpose();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const conflict = this.generatePotentialConflict(stats.find((stat) => stat.type === EStatsType.CHA)!);

		let finalAlignment = alignment;
		let finalAlignmentLine = alignmentLine;

		if (specialPurposeLine === 1 && alignmentLine === 5) {
			do {
				console.debug('An aligned smart object is never neutral. Rethrow alignment.');
				const { alignment: alignmentAfter, alignmentLine: alignmentLineAfter } = await this.generateAlignment();

				finalAlignment = alignmentAfter;
				finalAlignmentLine = alignmentLineAfter;
			} while (finalAlignmentLine === 5);
		}

		let additionalParticularity: string | undefined;
		let funFacts: string | undefined;
		if (addParticularity) {
			const particularity = this.generateParticularity();
			additionalParticularity = particularity.additionalParticularity;
			funFacts = particularity.funFacts;
		}

		return {
			name,
			stats,
			communication,
			sense,
			alignment: finalAlignment,
			specialPurpose,
			conflict,
			additionalParticularity,
			funFacts,
		};
	}

	private generateRandomStat(): DNDStatsDto[] {
		const statTypes = [EStatsType.INT, EStatsType.WIS, EStatsType.CHA];
		const stats: DNDStatsDto[] = [];

		for (const statType of statTypes) {
			const throwValue = Array.from({ length: 4 }, () => this.utils.rollDice(6));
			throwValue.sort((a, b) => b - a); // Sort in descending order

			console.debug(`Dice rolls for ${statType}: ${throwValue} -> remove ${throwValue[3]}`);

			const statValue = throwValue[0] + throwValue[1] + throwValue[2]; // Sum the highest three rolls
			stats.push({ type: statType, value: statValue });
		}
		return stats;
	}

	private async generateRandomName(): Promise<string> {
		const ancestry = this.utils.getRandomElementInArray(ANCESTRIES);
		const gender = this.utils.getRandomElementInArray(GENDERS);
		const family = this.utils.getRandomElementInArray(FAMILY);

		// Call API with axios
		try {
			console.debug(`Fetching fantasy name with params: ancestry=${ancestry}, gender=${gender}, family=${family}`);
			const response = await axios.get(NAME_GENERATOR_API_URL, {
				params: {
					ancestry: ancestry,
					gender: gender,
					family: family,
				},
			});
			return response.data;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to fetch fantasy names: ${errorMessage}`);
		}
	}

	private async generateCommunicationMode(): Promise<string> {
		const soCommunicationTable: Row[] = await this.excelUtils.readExcelFile(SMART_OBJECT_FILE_PATH, 1);
		const diceRoll = this.utils.rollDice(100);

		const line = this.excelUtils.getDiceRangeLine(diceRoll, soCommunicationTable);
		const communicationString = soCommunicationTable[line][1].toString();

		console.debug(`Get communication mode for line ${line} (dice: ${diceRoll}) for smart object: ${communicationString}.`);
		return communicationString;
	}

	private async generateSense(): Promise<string> {
		const soSenseTable: Row[] = await this.excelUtils.readExcelFile(SMART_OBJECT_FILE_PATH, 2);
		const diceRoll = this.utils.rollDice(4);

		const line = this.excelUtils.getDiceRangeLine(diceRoll, soSenseTable);
		const senseString = soSenseTable[line][1].toString();

		console.debug(`Get sense for line ${line} (dice: ${diceRoll}) for smart object: ${senseString}.`);
		return senseString;
	}

	private async generateAlignment(): Promise<{ alignment: string; alignmentLine: number }> {
		const soAlignmentTable: Row[] = await this.excelUtils.readExcelFile(SMART_OBJECT_FILE_PATH, 3);
		const diceRoll = this.utils.rollDice(100);

		const line = this.excelUtils.getDiceRangeLine(diceRoll, soAlignmentTable);
		const alignmentString = soAlignmentTable[line][1].toString();

		console.debug(`Get alignment for line ${line} (dice: ${diceRoll}) for smart object: ${alignmentString}.`);
		return { alignment: alignmentString, alignmentLine: line };
	}

	private async generateSpecialPurpose(): Promise<{ specialPurpose: string; specialPurposeLine: number }> {
		const soSpecialPurposeTable: Row[] = await this.excelUtils.readExcelFile(SMART_OBJECT_FILE_PATH, 4);
		const diceRoll = this.utils.rollDice(10);

		const line = this.excelUtils.getDiceRangeLine(diceRoll, soSpecialPurposeTable);
		const specialPurposeString = soSpecialPurposeTable[line][1].toString();

		console.debug(`Get special purpose for line ${line} (dice: ${diceRoll}) for smart object: ${specialPurposeString}.`);
		return { specialPurpose: specialPurposeString, specialPurposeLine: line };
	}

	private generatePotentialConflict(charismaStats: DNDStatsDto): SmartObjectConflictDto {
		const requirements = this.utils.getRandomElementInArray(SMART_OBJECT_REQUIREMENT);
		const punishment = this.utils.getRandomElementInArray(SMART_OBJECT_PUNISHMENT);
		const difficulty = 12 + Math.floor((charismaStats.value - 10) / 2);
		const time = this.utils.rollDice(12);

		console.debug(`Generate potential conflict for smart object: ${requirements}, ${punishment}, ${difficulty}, ${time}`);
		return { requirements, punishment, charmDifficulty: difficulty, charmTime: time };
	}

	private generateParticularity(): { additionalParticularity: string; funFacts: string } {
		const additionalParticularity = this.utils.getRandomElementInArray(MAGIC_OBJECT_ADDITIONAL_PARTICULARITY);
		const funFacts = this.utils.getRandomElementInArray(MAGIC_OBJECT_FUN_FACTS);

		console.debug(`Generate particularity for smart object: ${additionalParticularity}, ${funFacts}`);
		return { additionalParticularity, funFacts };
	}
}
