import { ApiProperty } from '@nestjs/swagger';
import { ETreasureType } from '../utils/enum';

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
}
