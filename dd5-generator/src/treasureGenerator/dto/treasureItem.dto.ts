import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ECoinType, ETreasureType } from '../utils/enum';

export class TreasureItemMetadataDto {
	@ApiPropertyOptional({
		description: 'price of the treasure item',
		enum: ECoinType,
		example: ECoinType.PO,
	})
	coinType?: ECoinType;

	@ApiPropertyOptional({
		description: 'The repartition mode of the treasure item',
		enum: ECoinType,
		example: 'Per monster',
	})
	repartition?: string;
}

export class TreasureItemDto {
	@ApiProperty({
		description: 'name of the treasure item',
		type: String,
		example: 'A great magic object',
	})
	name: string;

	@ApiProperty({
		description: 'type of the treasure item',
		enum: ETreasureType,
		example: ETreasureType.MAGIC_OBJECT,
	})
	type: ETreasureType;

	@ApiPropertyOptional({
		description: 'price of the treasure item',
		type: String,
		example: '500 po',
	})
	price?: string;

	@ApiPropertyOptional({
		description: 'sub type of the treasure item',
		type: String,
		example: 'art object',
	})
	subType?: string;

	@ApiPropertyOptional({
		description: 'metadata of the treasure item',
		type: TreasureItemMetadataDto,
	})
	metaData?: TreasureItemMetadataDto;
}
