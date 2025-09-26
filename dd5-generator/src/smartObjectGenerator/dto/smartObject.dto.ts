import { ApiProperty } from '@nestjs/swagger';
import { EStatsType } from '../utils/enum';

export class SmartObjectConflictDto {
	@ApiProperty({
		description: 'requirement of the smart object during conflict',
		type: String,
		example: 'The object insists on being equipped or held in hand at all times.',
	})
	requirements: string;

	@ApiProperty({
		description: 'punishment of the smart object during conflict if the user do not respect the requirements',
		type: String,
		example: 'Suppress one or more of its activated properties.',
	})
	punishment: string;

	@ApiProperty({
		description: 'difficulty of charming the smart object',
		type: Number,
		example: 15,
	})
	charmDifficulty: number;

	@ApiProperty({
		description: 'time (in hours) during which the user of the smart object is charmed',
		type: Number,
		example: 5,
	})
	charmTime: number;
}

export class DNDStatsDto {
	@ApiProperty({
		description: 'type of the statistic',
		enum: EStatsType,
		example: EStatsType.CHA,
	})
	type: EStatsType;

	@ApiProperty({
		description: 'value of the stat',
		type: Number,
		example: 15,
	})
	value: number;
}

export class SmartObjectDto {
	@ApiProperty({
		description: 'name of the smart object',
		type: String,
		example: 'A great magic object',
	})
	name: string;

	@ApiProperty({
		description: 'stats of the smart object',
		type: [DNDStatsDto],
	})
	stats: DNDStatsDto[];

	@ApiProperty({
		description: 'Communication mode of the smart object',
		type: String,
		example: 'The object speaks, reads and understands one or more languages.',
	})
	communication: string;

	@ApiProperty({
		description: 'special purpose of the smart object',
		type: String,
		example: 'This amulet grants the wearer advantage on saving throws against being frightened.',
	})
	specialPurpose: string;

	@ApiProperty({
		description: 'Alignment of the smart object',
		type: String,
		example: 'Neutral Good',
	})
	alignment: string;

	@ApiProperty({
		description: 'Senses of the smart object',
		type: String,
		example: 'Blindsight 60 ft., Darkvision 60 ft.',
	})
	sense: string;

	@ApiProperty({
		description: 'Potential conflict of the smart object',
		type: SmartObjectConflictDto,
	})
	conflict: SmartObjectConflictDto;

	@ApiProperty({
		description: 'Additional particularity of the smart object',
		type: String,
		example: 'The object emits the jingle of a bell if a particular type of creature is within 20 meters of it.',
	})
	additionalParticularity?: string;

	@ApiProperty({
		description: 'Fun facts of the smart object',
		type: String,
		example:
			"When used, the effect produced by the object is very conspicuous and spectacular. It's impossible to use it discreetly.",
	})
	funFacts?: string;
}
