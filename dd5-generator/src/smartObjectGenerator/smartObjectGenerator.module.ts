import { Module } from '@nestjs/common';
import { SmartObjectGeneratorController } from './smartObjectGenerator.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	controllers: [SmartObjectGeneratorController],
	providers: [],
})
export class SmartObjectGeneratorModule {}
