import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SmartObjectGenerator } from './generator/smart-object.generator';
import { MagicObjectParticularityDto, SmartObjectDto } from './dto/smartObject.dto';

@ApiTags('Smart Object Generator')
@Controller('/smart-object')
export class SmartObjectGeneratorController {
	smartObjectGenerator: SmartObjectGenerator;

	constructor() {
		this.smartObjectGenerator = new SmartObjectGenerator();
	}

	@Get('/smart-object')
	@ApiOperation({
		summary: 'Smart object generation',
		description: 'Generates a smart object description.',
	})
	@ApiQuery({
		name: 'addParticularity',
		type: Boolean,
		required: true,
		description: 'Add particularity to the smart object or not.',
	})
	@ApiOkResponse({
		description: 'The smart object description',
		type: SmartObjectDto,
	})
	async getSmartObject(@Query('addParticularity', ParseBoolPipe) addParticularity: boolean): Promise<SmartObjectDto> {
		console.debug(`---------------------------------`);
		const smartObject = await this.smartObjectGenerator.generateSmartObject(addParticularity);
		console.debug(`Generate smart object: ${JSON.stringify(smartObject)}`);
		return smartObject;
	}

	@Get('/particularity')
	@ApiOperation({
		summary: 'Magic object particularity generation',
		description: 'Generates a magic object particularity description.',
	})
	@ApiOkResponse({
		description: 'The magic object particularity description',
		type: MagicObjectParticularityDto,
	})
	async getMagicObjectParticularity(): Promise<MagicObjectParticularityDto> {
		console.debug(`---------------------------------`);
		const magicObjectParticularity = await this.smartObjectGenerator.generateParticularity();
		console.debug(`Generate magic object particularity: ${JSON.stringify(magicObjectParticularity)}`);
		return magicObjectParticularity;
	}
}
