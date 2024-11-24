import { Row } from 'read-excel-file/node';
import { ExcelUtils } from '../utils/excel.utils';
import { TREASURE_FILE_PATH } from '../utils/file.const';
import { CoinGenerator } from './coin.generator';
import { MagicObjectGenerator } from './magic-object.generator';
import { RareObjectGenerator } from './rare-object.generator';
import { IndividualTreasureGenerator } from './individual-treasure.generator';
import { GeneratorUtils } from '../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';

export class TreasureGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  coinGenerator = new CoinGenerator();
  rareObjectGenerator = new RareObjectGenerator();
  indTreasureGenerator = new IndividualTreasureGenerator();
  magicObjectGenerator = new MagicObjectGenerator();

  async generateTreasure(encounterLvl: number): Promise<TreasureItemDto[]> {
    const baseTable: Row[] = await this.excelUtils.readExcelFile(TREASURE_FILE_PATH);

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(encounterLvl, baseTable);
    const baseGenString = baseTable[line][column].toString();
    console.debug(`Get general generation for line ${line} and columns ${column}: ${baseGenString}.`);
    return this.computeTreasureString(baseGenString, encounterLvl);
  }

  async computeTreasureString(inputString: string, encounterLvl: number): Promise<TreasureItemDto[]> {
    const finalTreasure: TreasureItemDto[] = [];
    if (inputString.includes('A')) {
      const coinGen = await this.coinGenerator.generateCoin(encounterLvl);
      finalTreasure.push(...coinGen);
    }
    if (inputString.includes('B')) {
      const rareObjGen = await this.rareObjectGenerator.generateCompleteRareObjects(encounterLvl);
      finalTreasure.push(...rareObjGen);
    }
    if (inputString.includes('C')) {
      const indTreasureGen = await this.indTreasureGenerator.generateIndividualTreasure(encounterLvl);
      finalTreasure.push(...indTreasureGen);
    }
    if (inputString.includes('D')) {
      const magicGen = await this.magicObjectGenerator.generateMagicObject(encounterLvl);
      finalTreasure.push(...magicGen);
    }
    return finalTreasure;
  }
}
