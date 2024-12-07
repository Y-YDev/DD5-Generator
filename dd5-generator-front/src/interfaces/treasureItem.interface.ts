export enum ETreasureType {
  COIN = 'COIN',
  HOARD = 'HOARD',
  RARE_OBJECT = 'RARE_OBJECT',
  MAGIC_OBJECT = 'MAGIC_OBJECT',
}

export enum ECoinType {
  PC = 'PC',
  PA = 'PA',
  PE = 'PE',
  PO = 'PO',
  PP = 'PP',
}

export enum EHoardType {
  GEMS = 'gemme',
  ART_OBJECT = "objet d'art",
  UNKNOWN = 'unknown',
}

export interface ITreasureItemMetadata {
  coinType?: ECoinType;
  repartition?: string;
}

export interface ITreasureItem {
  name: string;
  type: ETreasureType;
  price?: string;
  metaData?: ITreasureItemMetadata;
  subType?: string;
}
