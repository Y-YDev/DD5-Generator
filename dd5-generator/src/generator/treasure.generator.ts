import { Row } from 'read-excel-file';
import { ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { TREASURE_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { TREASURE } from '../utils/treasure.const';

export class TreasureGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateTreasure(encounterLvl: number): Promise<string[]> {
    const treasureTable: Row[] = await this.excelUtils.readExcelFile(
      TREASURE_FILE_PATH,
    );

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      treasureTable,
    );
    const treasureString = treasureTable[line][column].toString();
    console.debug(
      `Get treasure generation for line ${line} and columns ${column}: ${treasureString}.`,
    );
    return this.computeTreasureGenString(treasureString);
  }

  computeTreasureGenString(inputString: string): string[] {
    let formatedString = inputString;

    if (inputString === '-') {
      return [];
    }
    formatedString = this.utils.replaceDiceValue(formatedString);
    formatedString = this.utils.removeAverageInfo(formatedString);
    // get treasure value to fetch
    const treasureValue: string = this.getTreasureCoinValue(formatedString);
    // Get the treasure number
    const treasureNumber: number = this.getTreasureNumber(formatedString);
    // Get the treasure type : gems or objects
    const treasureType: ETreasureType = this.getTreasureType(formatedString);
    // Get treasure rewards possible
    const treasurePoolString: string = TREASURE[treasureType][treasureValue];

    const res: string[] = [];
    for (let index = 0; index < treasureNumber; index++) {
      const treasureObject = this.generateTreasureObject(treasurePoolString);
      res.push(treasureObject);
    }
    return res;
  }

  getTreasureCoinValue(inputString: string): string {
    const numberRegex: RegExp = /\d+.po/g; // Get XXXXpo

    const match = inputString.match(numberRegex);
    if (match === null) return 'Error';

    return match[0].toString();
  }

  getTreasureNumber(inputString: string): number {
    const numberRegex: RegExp = /^\d+/g; // Get XXXX

    const match = inputString.match(numberRegex);
    if (match === null) return -1;

    return Number(match[0].toString());
  }

  getTreasureType(inputString: string): ETreasureType {
    if (inputString.includes(ETreasureType.GEMS)) return ETreasureType.GEMS;
    if (inputString.includes(ETreasureType.ART_OBJECT))
      return ETreasureType.ART_OBJECT;

    return ETreasureType.UNKNOW;
  }

  generateTreasureObject(treasurePool: string): string {
    const treasures: string[] = treasurePool.split(',').filter(Boolean);
    const randomIndex = this.utils.rollDice(treasures.length) - 1; //== RandInt in pool
    return treasures[randomIndex];
  }
}
