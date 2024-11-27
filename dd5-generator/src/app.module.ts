import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TreasureGeneratorModule } from './treasureGenerator/treasureGenerator.module';

@Module({
	imports: [TreasureGeneratorModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
