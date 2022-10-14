import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GeneratorUtils } from './utils/generator.utils';
import { ExcelUtils } from './utils/excel.utils';
import { CoinGenerator } from './generator/coin.generator';
import { RareObjectGenerator } from './generator/rare-object.generator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    console.log('call');

    const generatorUtils = new GeneratorUtils();
    const coinGenerator = new CoinGenerator();
    const rareObjectGenerator = new RareObjectGenerator();
    const excelUtils = new ExcelUtils();

    console.log(await coinGenerator.generateCoinRoll(5));

    return await rareObjectGenerator.generateFullRareObjects(18);
  }
}
