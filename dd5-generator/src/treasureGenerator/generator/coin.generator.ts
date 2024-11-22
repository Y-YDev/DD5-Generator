import { GeneratorUtils } from '../utils/generator.utils';
import { ExcelUtils } from '../utils/excel.utils';
import { Row } from 'read-excel-file/node';
import { COIN_FILE_PATH } from '../utils/file.const';
import { TreasureItemDto } from '../dto/treasureItem.dto';
import { ECoinType, ETreasureType } from '../utils/enum';

export class CoinGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  public async generateCoin(encounterLvl: number): Promise<TreasureItemDto[]> {
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
    return this.computeCoinGenerationString(generationString).map((name) => ({
      name,
      type: ETreasureType.COIN,
      metaData: { coinType: this.extractCoinType(name) },
    }));
  }

  private extractCoinType = (input: string): ECoinType => {
    const regex = /p[a-zA-Z]+/;
    const match = input.match(regex);

    if (match) {
      // Get the matched coin type prefix (e.g., "po", "pa", etc.)
      const coinType = match[0].toUpperCase(); // Convert to uppercase to match enum values
      if (coinType in ECoinType) {
        return ECoinType[coinType as keyof typeof ECoinType]; // Return the corresponding enum value
      }
    }
    return ECoinType.PO; // Return PO if no match is found or if it's not a valid coin type
  };

  private computeCoinGenerationString(inputString: string): string[] {
    let formattedString = inputString; // Can be for example: '1d6 × 100 (350) pe 1d6 × 100 (350) po'
    formattedString = this.utils.replaceDiceValue(formattedString); // After: '5 × 100 (350) pe 5 × 100 (350) po'
    formattedString = this.utils.removeAverageInfo(formattedString); // After: '5 × 100 pe 5 × 100 po'
    formattedString = this.computeProduct(formattedString); // After: '500 pe 500 po'

    return this.convertCoinStringToList(formattedString);
  }

  private convertCoinStringToList(inputString: string): string[] {
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

  private computeProduct(inputString: string): string {
    const splitString = inputString.split(' ').filter(Boolean);
    const resArray: string[] = [];

    let index = 0;
    while (index < splitString.length) {
      const element = splitString[index];

      let operator: string = '';
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
