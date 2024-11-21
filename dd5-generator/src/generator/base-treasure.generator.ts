import { Row } from 'read-excel-file/node';
import { ExcelUtils } from '../utils/excel.utils';
import { BASE_TREASURE_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { CoinGenerator } from './coin.generator';
import { MagicObjectGenerator } from './magic-object.generator';
import { RareObjectGenerator } from './rare-object.generator';
import { TreasureGenerator } from './treasure.generator';

export class BaseTreasureGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  coinGenerator = new CoinGenerator();
  rareObjectGenerator = new RareObjectGenerator();
  treasureGenerator = new TreasureGenerator();
  magicObjectGenerator = new MagicObjectGenerator();

  async generateWholeTreasure(encounterLvl: number): Promise<string[]> {
    const baseTable: Row[] = await this.excelUtils.readExcelFile(
      BASE_TREASURE_FILE_PATH,
    );

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      baseTable,
    );
    const baseGenString = baseTable[line][column].toString();
    console.debug(
      `Get general generation for line ${line} and columns ${column}: ${baseGenString}.`,
    );
    return this.computeWholeTreasureString(baseGenString, encounterLvl);
  }

  async computeWholeTreasureString(
    inputString: string,
    encounterLvl: number,
  ): Promise<string[]> {
    const finalTreasure: string[] = [];
    if (inputString.includes('A')) {
      const coinGen = await this.coinGenerator.generateCoin(encounterLvl);
      finalTreasure.push(...coinGen);
    }
    if (inputString.includes('B')) {
      const rareObjGen =
        await this.rareObjectGenerator.generateCompleteRareObjects(
          encounterLvl,
        );
      finalTreasure.push(...rareObjGen);
    }
    if (inputString.includes('C')) {
      const treasureGen = await this.treasureGenerator.generateTreasure(
        encounterLvl,
      );
      finalTreasure.push(...treasureGen);
    }
    if (inputString.includes('D')) {
      const magicGen = await this.magicObjectGenerator.generateMagicObject(
        encounterLvl,
      );
      finalTreasure.push(...magicGen);
    }
    return finalTreasure;
  }
}
