import { Module } from '@nestjs/common';
import { MiscellaneousGeneratorController } from './treasureGenerator.controller';

@Module({
	imports: [],
	controllers: [MiscellaneousGeneratorController],
	providers: [],
})
export class MiscellaneousGeneratorModule {}
