import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScrollIncidentGenerator } from './generator/scroll-incident.generator';

@ApiTags('Miscellaneous Generator')
@Controller('/miscellaneous')
export class MiscellaneousGeneratorController {
	scrollIncidentGenerator: ScrollIncidentGenerator;

	constructor() {
		this.scrollIncidentGenerator = new ScrollIncidentGenerator();
	}

	@Get('/scroll-incident')
	@ApiOperation({
		summary: 'Scroll incident generation',
		description: 'Generates a scroll incident description.',
	})
	@ApiOkResponse({
		description: 'The scroll incident description',
		type: String,
	})
	async getScrollIncident(): Promise<string> {
		console.debug(`---------------------------------`);
		const incident = this.scrollIncidentGenerator.generateScrollIncident();
		console.debug(`Get scroll incident: ${JSON.stringify(incident)}`);
		return incident;
	}
}
