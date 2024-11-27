import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	async getHello() {
		return 'This application is a treasure generation tool for Dungeon and Dragon 5th edition.';
	}
}
