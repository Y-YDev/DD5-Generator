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

    const rareObjectString = rareObjectTable[line][1].toString();
    console.debug(
      `Get rare object generation for line ${line}: ${rareObjectString}.`,
    );
    return this.computeRareObjectGenString(rareObjectString);
  }

  // Generation in the rare object base table (which give number of rare item)
  async generateCompleteRareObjects(encounterLvl: number) {
    const rareObjectDropTable: Row[] = await this.excelUtils.readExcelFile(
      RARE_OBJECT_NB_FILE_PATH,
    );

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      rareObjectDropTable,
    );

    const objectNumber = this.computeRareObjectNbGenString(
      rareObjectDropTable[line][column].toString(),
    );
    console.debug(
      `Get rare object base table generation for line ${line} and columns ${column}: ${objectNumber} rare object.`,
    );
    const res: string[] = [];
    // Generate X rare object
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
    // String like X objet(s) just get X
    const match = inputString.match(numberRegex);
    if (match === null) return 0;

    return Number(match[0].toString());
  }
}
