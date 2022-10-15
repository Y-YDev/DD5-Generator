import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GeneratorUtils } from './utils/generator.utils';
import { ExcelUtils } from './utils/excel.utils';
import { CoinGenerator } from './generator/coin.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';
import { TreasureGenerator } from './generator/treasure.generator';
import { MagicObjectGenerator } from './generator/magic-object.generator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    console.log('call');

    const generatorUtils = new GeneratorUtils();
    const coinGenerator = new CoinGenerator();
    const rareObjectGenerator = new RareObjectGenerator();
    const treasureGenerator = new TreasureGenerator();
    const magicObjectGenerator = new MagicObjectGenerator();
    const excelUtils = new ExcelUtils();

    const lvl = generatorUtils.rollDice(20);
    console.log(lvl);

    /*
    console.log(await coinGenerator.generateCoinRoll(lvl));
    console.log(await rareObjectGenerator.generateFullRareObjects(lvl));
    console.log(await treasureGenerator.generateTreasure(lvl));
    */
    return await magicObjectGenerator.generateMagicObject(1);
  }
}
