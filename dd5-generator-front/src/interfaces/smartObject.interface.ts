export interface ISmartObjectConflict {
  requirements: string;
  punishment: string;
  charmDifficulty: number;
  charmTime: number;
}

export enum EStatsType {
  STR = 'STR',
  DEX = 'DEX',
  CON = 'CON',
  INT = 'INT',
  WIS = 'WIS',
  CHA = 'CHA',
}

export interface IDNDStats {
  type: EStatsType;
  value: number;
}

export interface ISmartObject {
  name: string;

  stats: IDNDStats[];

  communication: string;

  specialPurpose: string;

  alignment: string;

  sense: string;

  conflict: ISmartObjectConflict;

  additionalParticularity?: string;

  funFacts?: string;
}

export interface IMagicObjectParticularity {
  additionalParticularity: string;
  funFacts: string;
}
