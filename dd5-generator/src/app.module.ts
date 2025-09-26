import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TreasureGeneratorModule } from './treasureGenerator/treasureGenerator.module';
import { MiscellaneousGeneratorModule } from './miscellaneousGenerator/miscellaneousGenerator.module';
import { SmartObjectGeneratorModule } from './smartObjectGenerator/smartObjectGenerator.module';

@Module({
	imports: [TreasureGeneratorModule, MiscellaneousGeneratorModule, SmartObjectGeneratorModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
