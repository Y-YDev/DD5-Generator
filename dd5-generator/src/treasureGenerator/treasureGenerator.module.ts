import { Module } from '@nestjs/common';
import { TreasureGeneratorController } from './treasureGenerator.controller';

@Module({
	imports: [],
	controllers: [TreasureGeneratorController],
	providers: [],
})
export class TreasureGeneratorModule {}
