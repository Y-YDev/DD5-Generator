import { Row } from 'read-excel-file';
import { EIndividualTreasureType, ETreasureType } from '../utils/enum';
import { ExcelUtils } from '../utils/excel.utils';
import { INDIVIDUAL_TREASURE_FILE_PATH } from '../utils/file.const';
import { GeneratorUtils } from '../utils/generator.utils';
import { TreasureItemDto } from '../dto/treasureItem.dto';

const TREASURE = {
  //Gems
  gemme: {
    '10 po': 'azurite,hématite,malachite,quartz bleu,turquoise',
    '50 po': 'calcédoine,héliotrope,jaspe,onyx,zircon',
    '100 po': 'ambre,améthyste,grenat,jade,perle,tourmaline',
    '500 po': 'chrysobéryl,péridot,perle noire,spinelle,topaze',
    '1000 po': 'émeraude,opale noire,opale de feu,rubis avec astérisme,saphir',
    '5000 po': 'diamant,rubis,saphir noir',
  },
  //Art objects
  objet: {
    '25 po':
      "statuette en os ou en bois rare,bracelet en or,calice en or,petit miroir d'argent,pendentif en électrum,portrait d'un noble",
    '250 po':
      "anneau en platine serti de jaspes,figurines en ivoire,couronne d'or et d'argent,statuette en jade,tapisserie brodée de fil d'or",
    '750 po':
      "masque cérémoniel en or serti d'ambre,dague sacrificielle damasquinée de platine,idole en or aux yeux de perle",
    '2500 po':
      "pectoral en platine serti d'opales,gantelet ouvragé en or et argent,calice en or serti de perles,sculpture en marbre d'un grand maître",
    '7500 po':
      "couronne d'un empereur en platine sertie d'opales noires,cor de chasse en ivoire relevé d'or et de platine,dague sacrificielle dont la lame est une dent de dragon",
  },
};

export class IndividualTreasureGenerator {
  utils = new GeneratorUtils();
  excelUtils = new ExcelUtils();

  async generateIndividualTreasure(
    encounterLvl: number,
  ): Promise<TreasureItemDto[]> {
    const indTreasureTable: Row[] = await this.excelUtils.readExcelFile(
      INDIVIDUAL_TREASURE_FILE_PATH,
    );

    const { line, column } = this.excelUtils.getGenerationLineAndColumn(
      encounterLvl,
      indTreasureTable,
    );
    const indTreasureString = indTreasureTable[line][column].toString();
    console.debug(
      `Get individual treasure generation for line ${line} and columns ${column}: ${indTreasureString}.`,
    );
    return this.computeIndTreasureGenString(indTreasureString).map((name) => ({
      name,
      type: ETreasureType.INDIVIDUAL_TREASURE,
    }));
  }

  private computeIndTreasureGenString(inputString: string): string[] {
    let formattedString = inputString;

    if (inputString === '-') {
      return [];
    }
    formattedString = this.utils.replaceDiceValue(formattedString);
    formattedString = this.utils.removeAverageInfo(formattedString);
    // get treasure value to fetch
    const treasureValue: string = this.getIndTreasureCoinValue(formattedString);
    // Get the treasure number
    const treasureNumber: number = this.getIndTreasureNumber(formattedString);
    // Get the treasure type : gems or objects
    const treasureType: EIndividualTreasureType =
      this.getIndTreasureType(formattedString);

    const res: string[] = [];
    for (let index = 0; index < treasureNumber; index++) {
      const treasureObject = this.generateIndTreasureObject(
        treasureType,
        treasureValue,
      );
      res.push(treasureObject);
    }
    return res;
  }

  private getIndTreasureCoinValue(inputString: string): string {
    const numberRegex: RegExp = /\d+.po/g; // Get XXXXpo

    const match = inputString.match(numberRegex);
    if (match === null) return 'Error';

    return match[0].toString();
  }

  private getIndTreasureNumber(inputString: string): number {
    const numberRegex: RegExp = /^\d+/g; // Get XXXX

    const match = inputString.match(numberRegex);
    if (match === null) return -1;

    return Number(match[0].toString());
  }

  private getIndTreasureType(inputString: string): EIndividualTreasureType {
    if (inputString.includes(EIndividualTreasureType.GEMS))
      return EIndividualTreasureType.GEMS;
    if (inputString.includes(EIndividualTreasureType.ART_OBJECT))
      return EIndividualTreasureType.ART_OBJECT;

    return EIndividualTreasureType.UNKNOWN;
  }

  public generateIndTreasureObject(
    treasureType: EIndividualTreasureType,
    treasureValue: string,
  ): string {
    // Get treasure rewards possible
    const treasurePoolString: string = TREASURE[treasureType][treasureValue];

    const treasures: string[] = treasurePoolString.split(',').filter(Boolean);
    const randomIndex = this.utils.rollDice(treasures.length) - 1; //== RandInt in pool
    return treasures[randomIndex];
  }
}
