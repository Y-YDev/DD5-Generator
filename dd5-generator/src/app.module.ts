import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TreasureGeneratorModule } from './treasureGenerator/treasureGenerator.module';
import { MiscellaneousGeneratorModule } from './miscellaneousGenerator/miscellaneousGenerator.module';

@Module({
	imports: [TreasureGeneratorModule, MiscellaneousGeneratorModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
