import readXlsxFile, { CellValue, Row } from 'read-excel-file/node';
import { GeneratorUtils } from './generator.utils';

export class ExcelUtils {
  utils = new GeneratorUtils();

  async readExcelFile(path: string, sheetPage: number = 1): Promise<Row[]> {
    return await readXlsxFile(path, { sheet: sheetPage });
  }

  getGenerationLineAndColumn(
    encounterLvl: number,
    table: Row[],
  ): { line: number; column: number } {
    // All dice roll are 20 faces
    const diceRoll = this.utils.rollDice(20);

    const column = this.getEncounterLevelColumn(encounterLvl, table);
    const line = this.getDiceRangeLine(diceRoll, table);

    return { line, column };
  }

  getEncounterLevelColumn(encounterLvl: number, table: Row[]) {
    const encounterLevelsRange: Row = table[0]; // For getting number of columns
    // Start at 1 (ignore first column)
    for (let index = 1; index < encounterLevelsRange.length; index++) {
      // encounterRange string : "X à Y"
      const encounterRange: CellValue = encounterLevelsRange[index];
      if (this.isInEncounterLevel(encounterLvl, encounterRange.toString())) {
        return index;
      }
    }
    console.error(
      'No encounter level range was found for encounter level: ' + encounterLvl,
    );
    return -1;
  }

  getDiceRangeLine(diceRoll: number, table: Row[]) {
    // Ignore first line (info line)
    for (let index = 1; index < table.length; index++) {
      const diceRange: CellValue = table[index][0]; //First column
      // diceRange string : "X-Y"
      if (this.isInDiceRange(diceRoll, diceRange.toString())) {
        return index;
      }
    }
    console.error('No dice range was found for dice roll : ' + diceRoll);
    return -1;
  }

  isInEncounterLevel(encounterLvl: number, encounterTitle: string) {
    const encounterElmt = encounterTitle.split(' ').filter(Boolean);

    // 3 elements should be X,à,Y
    if (encounterElmt.length !== 3) {
      console.error('Encounter title string not in right format');
      return undefined;
    }

    const minLvl = Number(encounterElmt[0]);
    let maxLvl = Number(encounterElmt[2]);

    // If maxLvl is +, mean to the end, so put 99
    if (encounterElmt[2] === '+') {
      maxLvl = 99;
    }

    return minLvl <= encounterLvl && encounterLvl <= maxLvl;
  }

  isInDiceRange(diceRoll: number, diceRange: string) {
    const rangeElmt = diceRange.split('-').filter(Boolean);

    if (rangeElmt.length !== 2) {
      // Can be a unique value without range
      if (rangeElmt.length === 1) {
        const rangeValue = Number(rangeElmt[0]);
        return rangeValue === diceRoll;
      }
      console.error('Dice range string not in right format');
      return undefined;
    }

    const minRange = Number(rangeElmt[0]);
    const maxRange = Number(rangeElmt[1]);

    return minRange <= diceRoll && diceRoll <= maxRange;
  }
}
