import { Row } from 'read-excel-file/node';
import { EMagicRank } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { MAGIC_OBJECT_DROP_PATH, MAGIC_OBJECT_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';

const POTION = 'Potion';
const AMMO = 'Munition';
const SCROLL = 'Parchemin';
const WEAPON = 'Arme';
const WAND = 'Baguette';
const RETHROW = 'Relancer';

export class MagicObjectGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateMagicObject(encounterLvl: number): Promise<string[]> {
    const magicObjectDropTable: Row[] = await this.excelUtils.readExcelFile(
      MAGIC_OBJECT_DROP_PATH,
    );

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      magicObjectDropTable,
    );

    console.debug(
      `Get magic object drop generation for line ${line} and columns ${column}.`,
    );
    const magicObjToGenerate: EMagicRank[] = this.computeMagicObjectDropString(
      magicObjectDropTable[line][column].toString(),
    );
    return await this.computeMagicObjectsRank(magicObjToGenerate);
  }

  async computeMagicObjectsRank(
    magicObjsToGenerate: EMagicRank[],
  ): Promise<string[]> {
    const res: string[] = [];
    
    for (let index = 0; index < magicObjsToGenerate.length; index++) {
      const magicRank = magicObjsToGenerate[index];
      switch (magicRank) {
        
        case EMagicRank.OM1:
          res.push(await this.generateMagicObjectByRank(1));
          break;
        case EMagicRank.OM2:
          res.push(await this.generateMagicObjectByRank(2));
          break;
        case EMagicRank.OM3:
        case EMagicRank.OM4:
        case EMagicRank.OM5:
        case EMagicRank.OM6:
        case EMagicRank.OM7:
        case EMagicRank.OM8:
          break;
        default:
          console.error('Wrong magic rank :' + magicRank);
          res.push('-');
          break;
      }
    }
    return res;
  }

  async generateMagicObjectByRank(magicRank: number): Promise<string> {    
    const magicObjectTable: Row[] = await this.excelUtils.readExcelFile(
      MAGIC_OBJECT_PATH.replace('$', magicRank.toString()),
    );

    const diceRoll = this.utils.rollDice(100);
    const line = this.excelUtils.getDiceRangeLine(diceRoll, magicObjectTable);
    console.log(
      'Generate rank ' + magicRank + ' magic object for line ' + line,
    );

    let generatedString = await this.computeMagicObjItemString(
      magicObjectTable[line][1].toString(),
      magicRank,
    );

    generatedString = this.utils.replaceDiceValue(generatedString);
    generatedString = this.utils.removeAverageInfo(generatedString);
    return generatedString;
  }

  async computeMagicObjItemString(
    inputString: string,
    magicRank: number,
  ): Promise<string> {
    if(inputString.includes(RETHROW)){
      const newRank = this.getRethrowInfo(inputString);
      return await this.generateMagicObjectByRank(newRank);
    }

    const subGenInfo = this.getSubGenerationInfo(inputString, magicRank);
    if (subGenInfo.sheetPage !== -1) {
      return await this.generateSubMagicObject(magicRank, subGenInfo);
    }
    return inputString;
  }

  async generateSubMagicObject(
    magicRank: number,
    subGenInfo: {
      diceFace: number;
      sheetPage: number;
    },
  ): Promise<string> {
    const subGenerationTable: Row[] = await this.excelUtils.readExcelFile(
      MAGIC_OBJECT_PATH.replace('$', magicRank.toString()),
      subGenInfo.sheetPage,
    );

    const diceRoll = this.utils.rollDice(subGenInfo.diceFace);
    const line = this.excelUtils.getDiceRangeLine(diceRoll, subGenerationTable);

    console.log('Sub generate magic object for line ' + line);
    return subGenerationTable[line][1].toString();
  }

  getSubGenerationInfo(
    inputString: string,
    magicRank: number,
  ): {
    diceFace: number;
    sheetPage: number;
  } {
    if (inputString.includes('(lancer')) {
      const diceRegex = /\dd\d\d?/g; // Can be 1d20 or 1d10...
      const diceMatch = inputString.match(diceRegex);

      const diceFace = Number(diceMatch[0].split('d')[1]); // Right member X of 1dX
      const sheetPage = this.getSheetPageOfSubGen(inputString, magicRank);

      return { diceFace, sheetPage };
    } else {
      // No sub generation
      return { diceFace: -1, sheetPage: -1 };
    }
  }

  getSheetPageOfSubGen(inputString: string, magicRank: number) {
    if (magicRank === 1) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(AMMO)) return 4;
    }
    else if (magicRank === 2) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(WEAPON)) return 4;
      if (inputString.includes(WAND)) return 5;
    }
    return -1;
  }

  getRethrowInfo(inputString: string){
    const numberRegex: RegExp = /\d/g;
    const matchNumber = inputString.match(numberRegex);

    const rethrowRank = Number(matchNumber[0]);
    console.log("--------------------------------------------------Rethrow with magic rank "+rethrowRank);
    return rethrowRank;
  }

  computeMagicObjectDropString(inputString: string): EMagicRank[] {
    if (inputString === '-') return [];

    const formatedString = this.utils.replaceDiceValue(inputString);

    const numberRegex: RegExp = /(?<!OM)\d/g;
    const magicRankRegex: RegExp = /OM\d/g;

    const matchNumber = formatedString.match(numberRegex);
    const matchMagicRank = formatedString.match(magicRankRegex);

    if (matchNumber.length != matchMagicRank.length) {
      console.error('Error missing number or magic rank in: ' + formatedString);
    }

    const res: EMagicRank[] = [];
    for (let index = 0; index < matchNumber.length; index++) {
      const generationNumber = Number(matchNumber[index]);
      const magicRank = matchMagicRank[index];

      for (let index = 0; index < generationNumber; index++) {
        res.push(magicRank as unknown as EMagicRank);
      }
    }
    console.debug('Generate magic object ' + res);
    return res;
  }
}
