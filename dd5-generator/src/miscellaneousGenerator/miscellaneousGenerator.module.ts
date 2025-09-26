import { Module } from '@nestjs/common';
import { MiscellaneousGeneratorController } from './miscellaneousGenerator.controller';

@Module({
	imports: [],
	controllers: [MiscellaneousGeneratorController],
	providers: [],
})
export class MiscellaneousGeneratorModule {}
