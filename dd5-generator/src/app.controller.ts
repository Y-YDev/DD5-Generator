import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CoinGenerator } from './generator/coin.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { TreasureGenerator } from './generator/treasure.generator';
import { GeneratorUtils } from './utils/generator.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // WIP: base drop table has not been implement as others magic object rank tables.
  @Get()
  async getHello() {
    const generatorUtils = new GeneratorUtils();
    const coinGenerator = new CoinGenerator();
    const rareObjectGenerator = new RareObjectGenerator();
    const treasureGenerator = new TreasureGenerator();
    const magicObjectGenerator = new MagicObjectGenerator();

    // 21 -1 for a range between 0 and 20
    const lvl = generatorUtils.rollDice(21) - 1;
    const res: string[] = [];

    console.debug(`\nDraw level: ${lvl}`);
    console.debug('-------');
    const coin = await coinGenerator.generateCoinRoll(lvl);
    res.push(...coin);
    console.debug(`Coin generation: ${coin}`);

    console.debug('-------');
    const rareObj = await rareObjectGenerator.generateCompleteRareObjects(lvl);
    res.push(...rareObj);
    console.debug(`Rare object generation: ${rareObj}`);

    console.debug('-------');
    const treasure = await treasureGenerator.generateTreasure(lvl);
    res.push(...treasure);
    console.debug(`Treasure generation: ${treasure}`);

    console.debug('-------');
    const magicObj = await magicObjectGenerator.generateMagicObject(lvl);
    res.push(...magicObj);
    console.debug(`Magic object generation: ${magicObj}`);

    return res;
  }
}
