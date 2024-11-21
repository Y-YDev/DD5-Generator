import { Controller, Get } from '@nestjs/common';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { TreasureGenerator } from './generator/treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';
import { BaseTreasureGenerator } from './generator/base-treasure.generator';

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

  @Get()
  async getHello() {
    // 21 -1 for a range between 0 and 20
    const lvl = this.generatorUtils.rollDice(21) - 1;
    const res: string[] = [];

    console.debug(`\nDraw level: ${lvl}`);
    console.debug('-------');
    const coin = await this.coinGenerator.generateCoin(lvl);
    res.push(...coin);
    console.debug(`Coin generation: ${coin}`);

    console.debug('-------');
    const rareObj = await this.rareObjectGenerator.generateCompleteRareObjects(
      lvl,
    );
    res.push(...rareObj);
    console.debug(`Rare object generation: ${rareObj}`);

    console.debug('-------');
    const individualTreasure = await this.treasureGenerator.generateTreasure(
      lvl,
    );
    res.push(...individualTreasure);
    console.debug(`Individual treasure generation: ${individualTreasure}`);

    console.debug('-------');
    const magicObj = await this.magicObjectGenerator.generateMagicObject(lvl);
    res.push(...magicObj);
    console.debug(`Magic object generation: ${magicObj}`);

    console.debug('-------');
    const treasure = await this.baseTreasureGenerator.generateWholeTreasure(
      lvl,
    );
    console.debug(`Treasure generation: ${treasure}`);

    return treasure;
  }
}
