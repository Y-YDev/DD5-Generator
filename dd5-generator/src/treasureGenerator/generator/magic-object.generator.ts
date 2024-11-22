import { Row } from 'read-excel-file/node';
import { EMagicRank, ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { MAGIC_OBJECT_DROP_PATH, MAGIC_OBJECT_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';

const RETHROW = 'Relancer';
const THROW = '(lancer';

const POTION = 'Potion';
const RING = 'Anneau';
const AMMO = 'Munition';
const SCROLL = 'Parchemin';
const WEAPON = 'Arme';
const IOUN = 'Ioun';
const FIGURINE = 'Figurine';
const ARMOR = 'Armure';
const WAND = 'Baguette';
const STAFF = 'Baton';
const MANUAL = 'Manuel';
const ROD = 'Sceptre';
const BALL = 'Boule';
const TALISMAN = 'Talisman';

const categoryPageByRank: { [key: number]: { [key: string]: number } } = {
  1: {
    [POTION]: 2,
    [SCROLL]: 3,
    [AMMO]: 4,
  },
  2: {
    [POTION]: 2,
    [SCROLL]: 3,
    [WEAPON]: 4,
    [WAND]: 5,
  },
  3: {
    [POTION]: 2,
    [ARMOR]: 3,
  },
  4: {
    [POTION]: 2,
    [SCROLL]: 3,
    [WEAPON]: 4,
    [ARMOR]: 5,
    [WAND]: 6,
  },
  5: {
    [RING]: 2,
    [STAFF]: 3,
    [FIGURINE]: 4,
    [IOUN]: 5,
  },
  6: {
    [POTION]: 2,
    [SCROLL]: 3,
    [WEAPON]: 4,
    [ARMOR]: 5,
    [IOUN]: 6,
  },
  7: {
    [RING]: 2,
    [STAFF]: 3,
    [MANUAL]: 4,
    [ROD]: 5,
  },
  8: {
    [SCROLL]: 2,
    [WEAPON]: 3,
    [ARMOR]: 4,
    [RING]: 5,
    [BALL]: 6,
    [IOUN]: 7,
    [TALISMAN]: 8,
  },
};

export class MagicObjectGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  public async generateMagicObject(
    encounterLvl: number,
  ): Promise<TreasureItemDto[]> {
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

  private async computeMagicObjectsRank(
    magicObjsToGenerate: EMagicRank[],
  ): Promise<TreasureItemDto[]> {
    const validRanks = Object.values(EMagicRank); // ['OM1', 'OM2', ..., 'OM8']
    const res: TreasureItemDto[] = [];

    for (const magicRank of magicObjsToGenerate) {
      if (validRanks.includes(magicRank)) {
        // Extract the numeric rank from the string, e.g., 'OM1' -> 1
        const rankNumber = parseInt(magicRank.slice(2), 10);
        res.push(await this.generateMagicObjectByRank(rankNumber));
      } else {
        console.error('Wrong magic rank:', magicRank);
      }
    }

    return res;
  }

  public async generateMagicObjectByRank(
    magicRank: number,
  ): Promise<TreasureItemDto> {
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
    return { name: generatedString, type: ETreasureType.MAGIC_OBJECT };
  }

  private numberToMagicRank(x: number): EMagicRank | null {
    const key = `OM${x}` as keyof typeof EMagicRank; // Construct the key dynamically
    return EMagicRank[key] || null; // Return the enum value or null if invalid
  }

  private async computeMagicObjItemString(
    inputString: string,
    magicRank: number,
  ): Promise<string> {
    // We need to re-throw on new magic rank
    if (inputString.includes(RETHROW)) {
      const newRankNb = this.getRethrowInfo(inputString);
      const newMagicRank = this.numberToMagicRank(newRankNb);

      if (newMagicRank === null) {
        console.error(`Magic Rank doesn't exist:${newMagicRank}`);
        return '';
      }
      return (await this.computeMagicObjectsRank([newMagicRank]))[0].name;
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

  private async generateMagicObjectCategory(
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

  private getMagicItemCategoryInfo(
    inputString: string,
    magicRank: number,
  ): {
    diceFace: number;
    sheetPage: number;
  } {
    // If "lancer" is in string, it mean magic item category
    if (inputString.includes(THROW)) {
      const diceRegex = /\dd\d\d?/g; // match 1d20 or 1d10...
      const diceMatch = inputString.match(diceRegex) ?? [];

      const diceFace = Number(diceMatch[0]?.split('d')[1]); // Right member X of 1dX (always 1d)
      const sheetPage = this.getSheetPageOfCategory(inputString, magicRank);

      return { diceFace, sheetPage };
    } else {
      // No sub generation
      return { diceFace: -1, sheetPage: -1 };
    }
  }

  private getSheetPageOfCategory(
    inputString: string,
    magicRank: number,
  ): number {
    const pageByCategory = categoryPageByRank[magicRank];
    if (pageByCategory) {
      for (const categoryKey in pageByCategory) {
        if (inputString.includes(categoryKey)) {
          return pageByCategory[categoryKey];
        }
      }
    }
    return -1;
  }

  private getRethrowInfo(inputString: string) {
    const numberRegex: RegExp = /\d/g;
    const matchNumber = inputString.match(numberRegex) ?? [];

    const rethrowRank = Number(matchNumber[0]);
    console.log('Rethrow with magic rank: ' + rethrowRank);
    return rethrowRank;
  }

  private computeMagicObjectDropString(inputString: string): EMagicRank[] {
    if (inputString === '-') return [];

    const formattedString = this.utils.replaceDiceValue(inputString);

    const numberRegex: RegExp = /(?<!OM)\d/g; // Catch X (on X time on OMY)
    const magicRankRegex: RegExp = /OM\d/g; // Catch OMY

    const matchNumber = formattedString.match(numberRegex);
    const matchMagicRank = formattedString.match(magicRankRegex);

    if (matchNumber === null || matchMagicRank === null) {
      return [];
    }

    // Work by pair (X/OMY)
    if (matchNumber.length !== matchMagicRank.length) {
      console.error(
        'Error missing number or magic rank in: ' + formattedString,
      );
    }

    const res: EMagicRank[] = [];
    for (let index = 0; index < matchNumber?.length; index++) {
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
