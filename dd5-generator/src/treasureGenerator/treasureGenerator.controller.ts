import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  PipeTransform,
  Query,
} from '@nestjs/common';
import { TreasureGenerator } from './generator/treasure.generator';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { IndividualTreasureGenerator } from './generator/individual-treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TreasureItemDto } from './dto/treasureItem.dto';

class EncounterLevelParser implements PipeTransform {
  generatorUtils: GeneratorUtils;

  constructor() {
    this.generatorUtils = new GeneratorUtils();
  }
  transform(value: any) {
    let level: number;
    if (value) {
      level = parseInt(value, 10);
      if (isNaN(level)) {
        throw new BadRequestException('encounterLevel must be a valid number');
      }
    } else {
      level = this.generatorUtils.rollDice(21) - 1; // Default logic
    }
    return level;
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
    description:
      'This generates a whole treasure with all sorts of treasure objects.',
  })
  @ApiQuery({
    name: 'encounterLevel',
    type: Number,
    description: 'The level of the encounter to compute the treasure item',
  })
  @ApiOkResponse({
    description: 'The generated treasure item array',
    type: TreasureItemDto,
    isArray: true,
  })
  async getTreasureGeneration(
    @Query('encounterLevel', EncounterLevelParser) level: number,
  ): Promise<TreasureItemDto[]> {
    console.debug(`---------------------------------`);
    const treasure = await this.treasureGenerator.generateTreasure(level);
    console.debug(
      `Treasure generation for level ${level}: ${JSON.stringify(treasure)}`,
    );
    return treasure;
  }

  @Get('/coin')
  @ApiOperation({
    summary: 'Coins treasure generation',
    description: 'This generates coin treasure.',
  })
  @ApiQuery({
    name: 'encounterLevel',
    type: Number,
    description: 'The level of the encounter to compute the treasure item',
  })
  @ApiOkResponse({
    description: 'The generated treasure item array',
    type: TreasureItemDto,
    isArray: true,
  })
  async getCoinGeneration(
    @Query('encounterLevel', EncounterLevelParser) level: number,
  ): Promise<TreasureItemDto[]> {
    console.debug(`---------------------------------`);
    const coin = await this.coinGenerator.generateCoin(level);
    console.debug(
      `Coin generation for level ${level}: ${JSON.stringify(coin)}`,
    );
    return coin;
  }

  @Get('/rare-object')
  @ApiOperation({
    summary: 'Rares objects treasure generation',
    description: 'This generates rares objects treasure.',
  })
  @ApiQuery({
    name: 'encounterLevel',
    type: Number,
    description: 'The level of the encounter to compute the treasure item',
  })
  @ApiOkResponse({
    description: 'The generated treasure item array',
    type: TreasureItemDto,
    isArray: true,
  })
  async getRareObjGeneration(
    @Query('encounterLevel', EncounterLevelParser) level: number,
  ): Promise<TreasureItemDto[]> {
    console.debug(`---------------------------------`);
    const rareObj = await this.rareObjectGenerator.generateCompleteRareObjects(
      level,
    );
    console.debug(
      `Rare object generation for level ${level}: ${JSON.stringify(rareObj)}`,
    );
    return rareObj;
  }

  @Get('/rare-object/one')
  @ApiOperation({
    summary: 'Single rare object treasure generation',
    description: 'This generates one rare object treasure.',
  })
  @ApiOkResponse({
    description: 'The generated treasure item',
    type: TreasureItemDto,
  })
  async getOneRareObjGeneration(): Promise<TreasureItemDto> {
    console.debug(`---------------------------------`);
    const rareObj = await this.rareObjectGenerator.generateRareObject();
    console.debug(
      `One rare object generation for level: ${JSON.stringify(rareObj)}`,
    );
    return rareObj;
  }

  @Get('/individual-treasure')
  @ApiOperation({
    summary: 'Individual treasures generation',
    description: 'This generates individual treasure like gems or art rewards.',
  })
  @ApiQuery({
    name: 'encounterLevel',
    type: Number,
    description: 'The level of the encounter to compute the treasure item',
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
    const individualTreasure =
      await this.indTreasureGenerator.generateIndividualTreasure(level);
    console.debug(
      `Individual treasure generation for level ${level}: ${JSON.stringify(
        individualTreasure,
      )}`,
    );
    return individualTreasure;
  }

  @Get('/magic-object')
  @ApiOperation({
    summary: 'Magics objects treasure generation',
    description: 'This generates magics objects.',
  })
  @ApiQuery({
    name: 'encounterLevel',
    type: Number,
    description: 'The level of the encounter to compute the treasure item',
  })
  @ApiOkResponse({
    description: 'The generated treasure item array',
    type: TreasureItemDto,
    isArray: true,
  })
  async getMagicObjectGeneration(
    @Query('encounterLevel', EncounterLevelParser) level: number,
  ): Promise<TreasureItemDto[]> {
    console.debug(`---------------------------------`);
    const magicObj = await this.magicObjectGenerator.generateMagicObject(level);
    console.debug(
      `Magic object generation for level ${level}: ${JSON.stringify(magicObj)}`,
    );
    return magicObj;
  }

  @Get('/magic-object/rank')
  @ApiOperation({
    summary: 'Magic object treasure generation by rank',
    description: 'This generates a magic object of the given rank.',
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
  async getRareObjGenerationByRank(
    @Query('rank', ParseIntPipe) rank: number,
  ): Promise<TreasureItemDto> {
    if (rank <= 0 || rank >= 9) {
      throw new BadRequestException('Magic rank must be between 0 and 9');
    }
    console.debug(`---------------------------------`);
    const magicObj = await this.magicObjectGenerator.generateMagicObjectByRank(
      rank,
    );
    console.debug(
      `Magic object generation of rank ${rank}: ${JSON.stringify(magicObj)}`,
    );
    return magicObj;
  }
}
