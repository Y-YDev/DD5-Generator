import { Row } from 'read-excel-file/node';
import { ExcelUtils } from '../utils/excel.utils';
import {
  RARE_OBJECT_FILE_PATH,
  RARE_OBJECT_NB_FILE_PATH,
} from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';

export class RareObjectGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateRareObject() {
    const rareObjectTable: Row[] = await this.excelUtils.readExcelFile(
      RARE_OBJECT_FILE_PATH,
    );

    const diceRoll = this.utils.rollDice(100);
    const line = this.excelUtils.getDiceRangeLine(diceRoll, rareObjectTable);

    console.debug(`Get object generation for line ${line}.`);

    return this.computeRareObjectGenString(rareObjectTable[line][1].toString());
  }

  async generateFullRareObjects(encounterLvl: number) {
    const rareObjectTable: Row[] = await this.excelUtils.readExcelFile(
      RARE_OBJECT_NB_FILE_PATH,
    );

    const diceRoll = this.utils.rollDice(20);

    const column = this.excelUtils.getEncounterLevelColumn(
      encounterLvl,
      rareObjectTable,
    );
    const line = this.excelUtils.getDiceRangeLine(diceRoll, rareObjectTable);

    const objectNumber = this.computeRareObjectNbGenString(
      rareObjectTable[line][column].toString(),
    );
    console.debug('Generate ' + objectNumber + ' rare objects');

    const res: string[] = [];
    for (let i = 0; i < objectNumber; i++) {
      res.push(await this.generateRareObject());
    }
    return res;
  }

  computeRareObjectGenString(inputString: string): string {
    let res = inputString;
    res = this.utils.replaceDiceValue(res);
    return res;
  }

  computeRareObjectNbGenString(inputString: string): number {
    const computeString = this.utils.replaceDiceValue(inputString);
    return this.getRareObjectNumber(computeString);
  }

  getRareObjectNumber(inputString: string): number {
    const numberRegex: RegExp = /\d/g;

    const match = inputString.match(numberRegex);
    if (match === null) return 0;

    return Number(match[0].toString());
  }
}
