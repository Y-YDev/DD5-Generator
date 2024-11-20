import { Row } from 'read-excel-file/node';
import { EMagicRank } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { MAGIC_OBJECT_DROP_PATH, MAGIC_OBJECT_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';

const POTION = 'Potion';
const RING = 'Anneau';
const AMMO = 'Munition';
const SCROLL = 'Parchemin';
const WEAPON = 'Arme';
const IOUN = 'ioun';
const FIGURINE = 'Figurine';
const ARMOR = 'Armure';
const WAND = 'Baguette';
const STAFF = 'Baton';
const RETHROW = 'Relancer';
const THROW = '(lancer';

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
    const magicObjectString = magicObjectDropTable[line][column].toString();
    console.debug(
      `Get magic object base table generation for line ${line} and columns ${column}: ${magicObjectString}.`,
    );
    // Return magic object Rank array [OMX...]
    const magicObjToGenerate: EMagicRank[] =
      this.computeMagicObjectDropString(magicObjectString);

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
          res.push(await this.generateMagicObjectByRank(3));
          break;
        case EMagicRank.OM4:
          res.push(await this.generateMagicObjectByRank(4));
          break;
        case EMagicRank.OM5:
          res.push(await this.generateMagicObjectByRank(5));
          break;
        case EMagicRank.OM6:
          res.push(await this.generateMagicObjectByRank(6));
          break;
        case EMagicRank.OM7:
        case EMagicRank.OM8:
          console.debug(`Magic Rank not implement: ${magicRank}`);
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
      MAGIC_OBJECT_PATH.replace('$', magicRank.toString()), // Get file MOX
    );

    const diceRoll = this.utils.rollDice(100);
    const line = this.excelUtils.getDiceRangeLine(diceRoll, magicObjectTable);

    const magicObjectString = magicObjectTable[line][1].toString();
    console.debug(
      `Generate rank ${magicRank} magic object for line ${line}: ${magicObjectString}`,
    );

    // Generate magic object categories if needed
    let generatedString = await this.computeMagicObjItemString(
      magicObjectString,
      magicRank,
    );
    // Clean string
    generatedString = this.utils.replaceDiceValue(generatedString);
    generatedString = this.utils.removeAverageInfo(generatedString);
    return generatedString;
  }

  numberToMagicRank(x: number): EMagicRank | null {
    const key = `OM${x}` as keyof typeof EMagicRank; // Construct the key dynamically
    return EMagicRank[key] || null; // Return the enum value or null if invalid
  }

  async computeMagicObjItemString(
    inputString: string,
    magicRank: number,
  ): Promise<string> {
    // We need to re-throw on new magic rank
    if (inputString.includes(RETHROW)) {
      const newRankNb = this.getRethrowInfo(inputString);
      const newMagicRank = this.numberToMagicRank(newRankNb);

      if (newMagicRank === null) {
        console.error(`Magic Rank doesn't exist:${newMagicRank}`);
        return;
      }
      return (await this.computeMagicObjectsRank([newMagicRank]))[0];
    }

    const magicObjectCategoryInfo = this.getMagicItemCategoryInfo(
      inputString,
      magicRank,
    );
    // If we need to generate a magic item category (like scroll or potions, ect...)
    if (magicObjectCategoryInfo.sheetPage !== -1) {
      return await this.generateMagicObjectCategory(
        magicRank,
        magicObjectCategoryInfo,
      );
    }
    return inputString;
  }

  async generateMagicObjectCategory(
    magicRank: number,
    subGenInfo: {
      diceFace: number;
      sheetPage: number;
    },
  ): Promise<string> {
    const subGenerationTable: Row[] = await this.excelUtils.readExcelFile(
      MAGIC_OBJECT_PATH.replace('$', magicRank.toString()), // Get file MOX
      subGenInfo.sheetPage, // Get the right page of category
    );

    const diceRoll = this.utils.rollDice(subGenInfo.diceFace);
    const line = this.excelUtils.getDiceRangeLine(diceRoll, subGenerationTable);
    const magicItemCategoryString = subGenerationTable[line][1].toString();
    console.log(
      `Generate magic object category for line ${line}: ${magicItemCategoryString}`,
    );
    return magicItemCategoryString;
  }

  getMagicItemCategoryInfo(
    inputString: string,
    magicRank: number,
  ): {
    diceFace: number;
    sheetPage: number;
  } {
    // If "lancer" is in string, it mean magic item category
    if (inputString.includes(THROW)) {
      const diceRegex = /\dd\d\d?/g; // match 1d20 or 1d10...
      const diceMatch = inputString.match(diceRegex);

      const diceFace = Number(diceMatch[0].split('d')[1]); // Right member X of 1dX (always 1d)
      const sheetPage = this.getSheetPageOfCategory(inputString, magicRank);

      return { diceFace, sheetPage };
    } else {
      // No sub generation
      return { diceFace: -1, sheetPage: -1 };
    }
  }

  getSheetPageOfCategory(inputString: string, magicRank: number) {
    if (magicRank === 1) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(AMMO)) return 4;
    } else if (magicRank === 2) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(WEAPON)) return 4;
      if (inputString.includes(WAND)) return 5;
    } else if (magicRank === 3) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(ARMOR)) return 3;
    } else if (magicRank === 4) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(WEAPON)) return 4;
      if (inputString.includes(ARMOR)) return 5;
      if (inputString.includes(WAND)) return 6;
    } else if (magicRank === 5) {
      if (inputString.includes(RING)) return 2;
      if (inputString.includes(STAFF)) return 3;
      if (inputString.includes(FIGURINE)) return 4;
      if (inputString.includes(IOUN)) return 5;
    } else if (magicRank === 6) {
      if (inputString.includes(POTION)) return 2;
      if (inputString.includes(SCROLL)) return 3;
      if (inputString.includes(WEAPON)) return 4;
      if (inputString.includes(ARMOR)) return 5;
      if (inputString.includes(IOUN)) return 6;
    }
    return -1;
  }

  getRethrowInfo(inputString: string) {
    const numberRegex: RegExp = /\d/g;
    const matchNumber = inputString.match(numberRegex);

    const rethrowRank = Number(matchNumber[0]);
    console.log('Rethrow with magic rank: ' + rethrowRank);
    return rethrowRank;
  }

  computeMagicObjectDropString(inputString: string): EMagicRank[] {
    if (inputString === '-') return [];

    const formattedString = this.utils.replaceDiceValue(inputString);

    const numberRegex: RegExp = /(?<!OM)\d/g; // Catch X (on X fois sur OMY)
    const magicRankRegex: RegExp = /OM\d/g; // Catch OMY

    const matchNumber = formattedString.match(numberRegex);
    const matchMagicRank = formattedString.match(magicRankRegex);

    // Work by pair (X/OMY)
    if (matchNumber.length != matchMagicRank.length) {
      console.error(
        'Error missing number or magic rank in: ' + formattedString,
      );
    }

    const res: EMagicRank[] = [];
    for (let index = 0; index < matchNumber.length; index++) {
      const generationNumber = Number(matchNumber[index]);
      const magicRank = matchMagicRank[index];

      for (let index = 0; index < generationNumber; index++) {
        res.push(magicRank as unknown as EMagicRank);
      }
    }
    console.debug(`Generate magic object rank: ${res}`);
    return res;
  }
}
