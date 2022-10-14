import { GeneratorUtils } from '../utils/generator.utils';
import { ExcelUtils } from './../utils/excel.utils';
import { Row } from 'read-excel-file/node';
import { COIN_FILE_PATH } from '../utils/fileConst';

export class CoinGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateCoinRoll(encounterLvl: number): Promise<string> {
    const coinTable: Row[] = await this.excelUtils.readExcelFile(
      COIN_FILE_PATH,
    );
    const diceRoll = this.utils.rollDice(20);

    const column = this.excelUtils.getEncounterLevelColumn(
      encounterLvl,
      coinTable,
    );
    const line = this.excelUtils.getDiceRangeLine(diceRoll, coinTable);

    console.debug(
      `Get coin generation for line ${line} and columns ${column}.`,
    );
    return this.computeCoinGenerationString(coinTable[line][column].toString());
  }

  computeCoinGenerationString(inputString: string): string {
    let res = inputString;
    res = this.utils.replaceDiceValue(res);
    res = this.removeAverageInfo(res);
    res = this.computeProduct(res);
    return res;
  }

  computeProduct(inputString: string): string {
    const splitString = inputString.split(' ').filter(Boolean);
    const resArray: string[] = [];

    let index = 0;
    while (index < splitString.length) {
      const element = splitString[index];

      let operator: string;
      if (index < splitString.length - 2) {
        operator = splitString[index + 1];
      }

      //Can get two next element and we have a product
      if (operator === '×' || operator === 'x') {
        const leftNumber = Number(element);
        const rightNumber = Number(splitString[index + 2]);

        if (leftNumber !== NaN && rightNumber !== NaN) {
          resArray.push((leftNumber * rightNumber).toString());
          index += 3;
        }
      } else {
        resArray.push(element);
        index++;
      }
    }
    return resArray.join(' ');
  }

  removeAverageInfo(inputString: string): string {
    const infoRegex: RegExp = /\(([^)]+)\)/g;

    let match: RegExpExecArray;
    let resString = inputString;
    while ((match = infoRegex.exec(resString)) != null) {
      const position = match.index;

      resString =
        resString.substring(0, position) +
        resString.substring(position + 1 + match[0].length); // +1 for remove space
    }
    return resString;
  }
}
