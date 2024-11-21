import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BaseTreasureGenerator } from './generator/base-treasure.generator';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { TreasureGenerator } from './generator/treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';

@Controller('/treasure')
export class TreasureGeneratorController {
  generatorUtils: GeneratorUtils;
  coinGenerator: CoinGenerator;
  rareObjectGenerator: RareObjectGenerator;
  treasureGenerator: TreasureGenerator;
  magicObjectGenerator: MagicObjectGenerator;
  baseTreasureGenerator: BaseTreasureGenerator;

  constructor() {
    this.generatorUtils = new GeneratorUtils();
    this.coinGenerator = new CoinGenerator();
    this.rareObjectGenerator = new RareObjectGenerator();
    this.treasureGenerator = new TreasureGenerator();
    this.magicObjectGenerator = new MagicObjectGenerator();
    this.baseTreasureGenerator = new BaseTreasureGenerator();
  }

  private getEncounterLevel(levelString: string): number {
    let level: number;
    if (levelString) {
      level = parseInt(levelString, 10);
      if (isNaN(level)) {
        throw new BadRequestException('encounterLevel must be a valid number');
      }
    } else {
      level = this.generatorUtils.rollDice(21) - 1; // Default logic
    }
    return level;
  }

  @Get()
  async getBaseTreasureGeneration(
    @Query('encounterLevel') encounterLevel?: string,
  ): Promise<string[]> {
    const level = this.getEncounterLevel(encounterLevel);
    console.debug(`---------------------------------`);
    const treasure = await this.baseTreasureGenerator.generateWholeTreasure(
      level,
    );
    console.debug(`Treasure generation for level ${level}: ${treasure}`);
    return treasure;
  }

  @Get('/coin')
  async getCoinGeneration(
    @Query('encounterLevel') encounterLevel?: string,
  ): Promise<string[]> {
    const level = this.getEncounterLevel(encounterLevel);
    console.debug(`---------------------------------`);
    const coin = await this.coinGenerator.generateCoin(level);
    console.debug(`Coin generation for level ${level}: ${coin}`);
    return coin;
  }

  @Get('/rare-object')
  async getRareObjGeneration(
    @Query('encounterLevel') encounterLevel?: string,
  ): Promise<string[]> {
    const level = this.getEncounterLevel(encounterLevel);
    console.debug(`---------------------------------`);
    const rareObj = await this.rareObjectGenerator.generateCompleteRareObjects(
      level,
    );
    console.debug(`Rare object generation for level ${level}: ${rareObj}`);
    return rareObj;
  }

  @Get('/rare-object/one')
  async getOneRareObjGeneration(): Promise<string> {
    console.debug(`---------------------------------`);
    const rareObj = await this.rareObjectGenerator.generateRareObject();
    console.debug(`One rare object generation for level: ${rareObj}`);
    return rareObj;
  }

  @Get('/individual-treasure')
  async getTreasureGeneration(
    @Query('encounterLevel') encounterLevel?: string,
  ): Promise<string[]> {
    const level = this.getEncounterLevel(encounterLevel);
    console.debug(`---------------------------------`);
    const individualTreasure = await this.treasureGenerator.generateTreasure(
      level,
    );
    console.debug(
      `Individual treasure generation for level ${level}: ${individualTreasure}`,
    );
    return individualTreasure;
  }

  @Get('/magic-object')
  async getMagicObjectGeneration(
    @Query('encounterLevel') encounterLevel?: string,
  ): Promise<string[]> {
    const level = this.getEncounterLevel(encounterLevel);
    console.debug(`---------------------------------`);
    const magicObj = await this.magicObjectGenerator.generateMagicObject(level);
    console.debug(`Magic object generation for level ${level}: ${magicObj}`);
    return magicObj;
  }

  @Get('/magic-object/rank')
  async getRareObjGenerationByRank(
    @Query('rank', ParseIntPipe) rank: number,
  ): Promise<string> {
    if (rank <= 0 || rank >= 9) {
      throw new BadRequestException('Magic rank must be between 0 and 9');
    }
    console.debug(`---------------------------------`);
    const magicObj = await this.magicObjectGenerator.generateMagicObjectByRank(
      rank,
    );
    console.debug(`Magic object generation of rank ${rank}: ${magicObj}`);
    return magicObj;
  }
}
