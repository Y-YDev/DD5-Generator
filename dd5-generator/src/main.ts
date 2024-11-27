import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// https://5e-drs.fr/les-tresors/

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Enable CORS
	app.enableCors({
		origin: 'http://localhost:4000', // React frontend's URL
		methods: 'GET,POST,PUT,DELETE',
	});

	// Swagger configuration
	const config = new DocumentBuilder()
		.setTitle('DD5 Generator Documentation')
		.setDescription('This application is a treasure generation tool for Dungeon and Dragon 5th edition.')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document); // Swagger UI available at /api

	await app.listen(3000);
	console.log('DD5 Generator now listening on port 3000');
}
bootstrap();
