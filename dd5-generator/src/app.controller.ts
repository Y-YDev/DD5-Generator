import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GeneratorUtils } from './utils/generator.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const generatorUtils = new GeneratorUtils();

    return generatorUtils.computeCoinGenerationString(
      '3d6 x 100 (1000) pc 5d6 x 10 (17) pe',
    );
  }
}
