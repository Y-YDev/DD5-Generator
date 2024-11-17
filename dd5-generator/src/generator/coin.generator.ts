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

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      coinTable,
    );
    const generationString = coinTable[line][column].toString();
    console.debug(
      `Get coin generation for line ${line} and columns ${column}: ${generationString}.`,
    );
    return this.computeCoinGenerationString(generationString);
  }

  computeCoinGenerationString(inputString: string): string[] {
    let formatedString = inputString; // Can be for example: '1d6 × 100 (350) pe 1d6 × 100 (350) po'
    formatedString = this.utils.replaceDiceValue(formatedString); // After: '5 × 100 (350) pe 5 × 100 (350) po'
    formatedString = this.utils.removeAverageInfo(formatedString); // After: '5 × 100 pe 5 × 100 po'
    formatedString = this.computeProduct(formatedString); // After: '500 pe 500 po'

    return this.convertCoinStringToList(formatedString);
  }

  convertCoinStringToList(inputString: string): string[] {
    const coinElement = inputString.split(' ').filter(Boolean);
    // Should contain pair (value, coin)
    if (coinElement.length % 2 !== 0) {
      console.error(
        'Error in coin string must be value/coin couple :' + inputString,
      );
    }

    const res: string[] = [];
    for (let index = 0; index < coinElement.length; index += 2) {
      const value = coinElement[index];
      const coin = coinElement[index + 1];
      res.push(value + ' ' + coin); // Stringify the values
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
      // word by triplet (Value x coef), so need to check under length -2
      if (index < splitString.length - 2) {
        operator = splitString[index + 1]; // operator at second place of triplet
      }

      //Can get two next element and we have a product
      if (operator === '×' || operator === 'x') {
        const leftNumber = Number(element);
        const rightNumber = Number(splitString[index + 2]);

        if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber)) {
          resArray.push((leftNumber * rightNumber).toString());
          index += 3; // Go to next triplet
        }
      } else {
        // No multiplication, just push result
        resArray.push(element);
        index++;
      }
    }
    return resArray.join(' ');
  }
}
