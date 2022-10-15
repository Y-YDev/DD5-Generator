import { GeneratorUtils } from '../utils/generator.utils';
import { ExcelUtils } from './../utils/excel.utils';
import { Row } from 'read-excel-file/node';
import { COIN_FILE_PATH } from '../utils/file.const';

export class CoinGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateCoinRoll(encounterLvl: number): Promise<string[]> {
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

  computeCoinGenerationString(inputString: string): string[] {
    let formatedString = inputString;
    formatedString = this.utils.replaceDiceValue(formatedString);
    formatedString = this.utils.removeAverageInfo(formatedString);
    formatedString = this.computeProduct(formatedString);

    return this.convertCoinStringToList(formatedString);
  }

  convertCoinStringToList(inputString: string): string[] {
    const coinElement = inputString.split(' ').filter(Boolean);

    if (coinElement.length % 2 !== 0) {
      console.error(
        'Error in coin string must be value/coin couple :' + inputString,
      );
    }

    const res: string[] = [];
    for (let index = 0; index < coinElement.length; index += 2) {
      const value = coinElement[index];
      const coin = coinElement[index + 1];
      res.push(value + ' ' + coin);
    }
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
}
