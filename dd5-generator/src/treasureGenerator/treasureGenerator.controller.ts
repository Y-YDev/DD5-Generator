import { BadRequestException, Controller, Get, ParseIntPipe, PipeTransform, Query } from '@nestjs/common';
import { TreasureGenerator } from './generator/treasure.generator';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { IndividualTreasureGenerator } from './generator/individual-treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TreasureItemDto } from './dto/treasureItem.dto';
import { EIndividualTreasureType } from './utils/enum';

class EncounterLevelParser implements PipeTransform {
	generatorUtils: GeneratorUtils;

	constructor() {
		this.generatorUtils = new GeneratorUtils();
	}
	transform(value: any) {
		let level: number;
		if (value) {
			level = parseInt(value, 10);
			if (isNaN(level) || level <= 0 || level >= 21) {
				throw new BadRequestException('encounterLevel must be a valid number between 1 and 20');
			}
		} else {
			level = this.generatorUtils.rollDice(21) - 1; // Default logic
		}
		return level;
	}
}

class MonsterNumberParser implements PipeTransform {
	transform(value: any) {
		let monsterNumber: number | undefined;
		if (value) {
			monsterNumber = parseInt(value, 10);
			if (isNaN(monsterNumber) || monsterNumber <= 0) {
				throw new BadRequestException('If provided, monster number must be greater than 0');
			}
			if (monsterNumber > 50) {
				throw new BadRequestException('Too much monsters provided');
			}
			return monsterNumber;
		}
		return undefined;
	}
}

@ApiTags('Treasure Generator')
@Controller('/treasure')
export class TreasureGeneratorController {
	generatorUtils: GeneratorUtils;
	coinGenerator: CoinGenerator;
	rareObjectGenerator: RareObjectGenerator;
	indTreasureGenerator: IndividualTreasureGenerator;
	magicObjectGenerator: MagicObjectGenerator;
	treasureGenerator: TreasureGenerator;

	constructor() {
		this.generatorUtils = new GeneratorUtils();
		this.coinGenerator = new CoinGenerator();
		this.rareObjectGenerator = new RareObjectGenerator();
		this.indTreasureGenerator = new IndividualTreasureGenerator();
		this.magicObjectGenerator = new MagicObjectGenerator();
		this.treasureGenerator = new TreasureGenerator();
	}

	@Get()
	@ApiOperation({
		summary: 'General treasure generation',
		description: 'Generates a whole treasure with all sorts of treasure objects.',
	})
	@ApiQuery({
		name: 'encounterLevel',
		type: Number,
		required: false,
		description: 'Level of the encounter to compute a whole treasure (if not provided, a random level will be used)',
	})
	@ApiQuery({
		name: 'monsterNumber',
		type: Number,
		required: false,
		description: 'The number of monster of the encounter (if not provided, will generate only one coin value for all monsters)',
	})
	@ApiOkResponse({
		description: 'The generated treasure item array',
		type: TreasureItemDto,
		isArray: true,
	})
	async getTreasureGeneration(
		@Query('encounterLevel', EncounterLevelParser) level: number,
		@Query('monsterNumber', MonsterNumberParser) monsterNumber?: number,
	): Promise<TreasureItemDto[]> {
		console.debug(`---------------------------------`);
		const treasure = await this.treasureGenerator.generateTreasure(level, monsterNumber);
		console.debug(
			`Treasure generation for level ${level}${monsterNumber ? ` and ${monsterNumber} monsters` : ''}: ${JSON.stringify(
				treasure,
			)}`,
		);
		return treasure;
	}

	@Get('/coin')
	@ApiOperation({
		summary: 'Coins treasure generation',
		description: 'Generates coin treasure.',
	})
	@ApiQuery({
		name: 'encounterLevel',
		type: Number,
		required: false,
		description: 'Level of the encounter to compute a coin treasure (if not provided, a random level will be used)',
	})
	@ApiQuery({
		name: 'monsterNumber',
		type: Number,
		required: false,
		description: 'The number of monster of the encounter (if not provided, will generate only one coin value for all monsters)',
	})
	@ApiOkResponse({
		description: 'The generated treasure item array',
		type: TreasureItemDto,
		isArray: true,
	})
	async getCoinGeneration(
		@Query('encounterLevel', EncounterLevelParser) level: number,
		@Query('monsterNumber', MonsterNumberParser) monsterNumber?: number,
	): Promise<TreasureItemDto[]> {
		console.debug(`---------------------------------`);
		const coin = await this.coinGenerator.generateCoin(level, monsterNumber);
		console.debug(
			`Coin generation for level ${level}${monsterNumber ? ` and ${monsterNumber} monsters` : ''}: ${JSON.stringify(coin)}`,
		);
		return coin;
	}

	@Get('/rare-object')
	@ApiOperation({
		summary: 'Rares objects treasure generation',
		description: 'Generates rares objects treasure.',
	})
	@ApiQuery({
		name: 'encounterLevel',
		type: Number,
		required: false,
		description:
			'Level of the encounter to compute a treasure made of rare objects (if not provided, a random level will be used)',
	})
	@ApiOkResponse({
		description: 'The generated treasure item array',
		type: TreasureItemDto,
		isArray: true,
	})
	async getRareObjGeneration(@Query('encounterLevel', EncounterLevelParser) level: number): Promise<TreasureItemDto[]> {
		console.debug(`---------------------------------`);
		const rareObj = await this.rareObjectGenerator.generateCompleteRareObjects(level);
		console.debug(`Rare object generation for level ${level}: ${JSON.stringify(rareObj)}`);
		return rareObj;
	}

	@Get('/rare-object/one')
	@ApiOperation({
		summary: 'Single rare object treasure generation',
		description: 'Generates one single rare object',
	})
	@ApiOkResponse({
		description: 'The generated treasure item',
		type: TreasureItemDto,
	})
	async getOneRareObjGeneration(): Promise<TreasureItemDto> {
		console.debug(`---------------------------------`);
		const rareObj = await this.rareObjectGenerator.generateRareObject();
		console.debug(`One rare object generation for level: ${JSON.stringify(rareObj)}`);
		return rareObj;
	}

	@Get('/individual-treasure')
	@ApiOperation({
		summary: 'Individual treasures generation',
		description: 'Generates individual treasure like gems or art rewards.',
	})
	@ApiQuery({
		name: 'encounterLevel',
		type: Number,
		required: false,
		description: 'Level of the encounter to compute individual treasures (if not provided, a random level will be used).',
	})
	@ApiOkResponse({
		description: 'The generated treasure item array',
		type: TreasureItemDto,
		isArray: true,
	})
	async getIndividualTreasureGeneration(
		@Query('encounterLevel', EncounterLevelParser) level: number,
	): Promise<TreasureItemDto[]> {
		console.debug(`---------------------------------`);
		const individualTreasure = await this.indTreasureGenerator.generateIndividualTreasure(level);
		console.debug(`Individual treasure generation for level ${level}: ${JSON.stringify(individualTreasure)}`);
		return individualTreasure;
	}

	@Get('/individual-treasure/one')
	@ApiOperation({
		summary: 'Individual treasures generation by type and price',
		description: 'Generates individual treasure of the given type and price.',
	})
	@ApiQuery({
		name: 'type',
		enum: EIndividualTreasureType,
		required: true,
		description: 'The individual treasure type for the generation.',
	})
	@ApiQuery({
		name: 'price',
		type: Number,
		required: true,
		description: 'The individual treasure price for the generation.',
	})
	@ApiOkResponse({
		description: 'The generated individual treasure',
		type: TreasureItemDto,
	})
	async getIndTreasureByTypeGeneration(
		@Query('type') type: EIndividualTreasureType,
		@Query('price') price: string,
	): Promise<TreasureItemDto | undefined> {
		console.debug(`---------------------------------`);
		const individualTreasure = this.indTreasureGenerator.generateIndTreasureObject(type, price);
		console.debug(`Individual treasure generation of type ${type} and price ${price}: ${JSON.stringify(individualTreasure)}`);
		return individualTreasure;
	}

	@Get('/magic-object')
	@ApiOperation({
		summary: 'Magics objects treasure generation',
		description: 'Generates magics objects.',
	})
	@ApiQuery({
		name: 'encounterLevel',
		type: Number,
		required: false,
		description:
			'Level of the encounter to compute a treasure made of magic objects (if not provided, a random level will be used).',
	})
	@ApiOkResponse({
		description: 'The generated treasure item array',
		type: TreasureItemDto,
		isArray: true,
	})
	async getMagicObjectGeneration(@Query('encounterLevel', EncounterLevelParser) level: number): Promise<TreasureItemDto[]> {
		console.debug(`---------------------------------`);
		const magicObj = await this.magicObjectGenerator.generateMagicObject(level);
		console.debug(`Magic object generation for level ${level}: ${JSON.stringify(magicObj)}`);
		return magicObj;
	}

	@Get('/magic-object/rank')
	@ApiOperation({
		summary: 'Magic object treasure generation by rank',
		description: 'Generates a magic object of the given rank.',
	})
	@ApiQuery({
		name: 'rank',
		type: Number,
		description: 'The magic rank for the magic object generation',
	})
	@ApiOkResponse({
		description: 'The generated treasure item',
		type: TreasureItemDto,
	})
	async getRareObjGenerationByRank(@Query('rank', ParseIntPipe) rank: number): Promise<TreasureItemDto> {
		if (rank <= 0 || rank >= 9) {
			throw new BadRequestException('Magic rank must be between 1 and 8');
		}
		console.debug(`---------------------------------`);
		const magicObj = await this.magicObjectGenerator.generateMagicObjectByRank(rank);
		console.debug(`Magic object generation of rank ${rank}: ${JSON.stringify(magicObj)}`);
		return magicObj;
	}
}
