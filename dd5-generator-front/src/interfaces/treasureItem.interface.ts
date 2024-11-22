export enum ETreasureType {
  COIN = 'COIN',
  INDIVIDUAL_TREASURE = 'INDIVIDUAL_TREASURE',
  RARE_OBJECT = 'RARE_OBJECT',
  MAGIC_OBJECT = 'MAGIC_OBJECT',
}

export interface ITreasureItem {
  name: string;

  type: ETreasureType;
}
