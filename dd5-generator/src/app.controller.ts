import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { TreasureGenerator } from './generator/treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';
import { BaseTreasureGenerator } from './generator/base-treasure.generator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const generatorUtils = new GeneratorUtils();
    const coinGenerator = new CoinGenerator();
    const rareObjectGenerator = new RareObjectGenerator();
    const treasureGenerator = new TreasureGenerator();
    const magicObjectGenerator = new MagicObjectGenerator();
    const baseTreasureGenerator = new BaseTreasureGenerator();

    // 21 -1 for a range between 0 and 20
    const lvl = generatorUtils.rollDice(21) - 1;
    const res: string[] = [];

    console.debug(`\nDraw level: ${lvl}`);
    console.debug('-------');
    const coin = await coinGenerator.generateCoin(lvl);
    res.push(...coin);
    console.debug(`Coin generation: ${coin}`);

    console.debug('-------');
    const rareObj = await rareObjectGenerator.generateCompleteRareObjects(lvl);
    res.push(...rareObj);
    console.debug(`Rare object generation: ${rareObj}`);

    console.debug('-------');
    const individualTreasure = await treasureGenerator.generateTreasure(lvl);
    res.push(...individualTreasure);
    console.debug(`Individual treasure generation: ${individualTreasure}`);

    console.debug('-------');
    const magicObj = await magicObjectGenerator.generateMagicObject(lvl);
    res.push(...magicObj);
    console.debug(`Magic object generation: ${magicObj}`);

    console.debug('-------');
    const treasure = await baseTreasureGenerator.generateWholeTreasure(lvl);
    console.debug(`Treasure generation: ${treasure}`);

    return treasure;
  }
}
