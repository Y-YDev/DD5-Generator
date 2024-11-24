import { MagicObjectGenerator } from '../../generator/magic-object.generator';
import { ETreasureType } from '../../utils/enum';

describe('MagicObjectGenerator', () => {
  let magicObjectGenerator: MagicObjectGenerator;

  beforeEach(() => {
    magicObjectGenerator = new MagicObjectGenerator();
  });

  it('should be defined', () => {
    expect(magicObjectGenerator).toBeDefined();
  });

  it('should generate a "Baguette de métamorphose" from rank 6 when rolled a 87', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValue(87);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(6);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Baguette de métamorphose',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });

  it('should generate a "Fer gelé" from rank 7 when rolled a 75', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValue(75);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Fer gelé',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });

  it('should generate a "Anneau de régénération" from rank 7 when rolled a 11 then a 3', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValueOnce(11).mockReturnValueOnce(3);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Anneau de régénération',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });

  it('should generate a "Baton de givre" from rank 7 when rolled a 23 then a 6', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValueOnce(23).mockReturnValueOnce(6);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Baton de givre',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });

  it('should generate a "Traité de perspicacité" from rank 7 when rolled a 44 then a 19', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValueOnce(44).mockReturnValueOnce(19);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Traité de perspicacité',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });

  it('should generate a "Sceptre de sécurité" from rank 7 when rolled a 58 then a 4', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValueOnce(58).mockReturnValueOnce(4);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toStrictEqual({
      name: 'Sceptre de sécurité',
      type: ETreasureType.MAGIC_OBJECT,
    });
  });
});
