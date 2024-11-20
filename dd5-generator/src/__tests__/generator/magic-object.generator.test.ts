import { MagicObjectGenerator } from '../../generator/magic-object.generator';

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
    expect(magicObject).toBe('Baguette de métamorphose');
  });

  it('should generate a "Fer gelé" from rank 7 when rolled a 75', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValue(75);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Fer gelé');
  });

  it('should generate a "Anneau de régénération" from rank 7 when rolled a 11 then a 3', async () => {
    jest
      .spyOn(magicObjectGenerator.utils, 'rollDice')
      .mockReturnValueOnce(11)
      .mockReturnValueOnce(3);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Anneau de régénération');
  });

  it('should generate a "Baton de givre" from rank 7 when rolled a 23 then a 6', async () => {
    jest
      .spyOn(magicObjectGenerator.utils, 'rollDice')
      .mockReturnValueOnce(23)
      .mockReturnValueOnce(6);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Baton de givre');
  });

  it('should generate a "Traité de perspicacité" from rank 7 when rolled a 44 then a 19', async () => {
    jest
      .spyOn(magicObjectGenerator.utils, 'rollDice')
      .mockReturnValueOnce(44)
      .mockReturnValueOnce(19);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Traité de perspicacité');
  });

  it('should generate a "Sceptre de sécurité" from rank 7 when rolled a 58 then a 4', async () => {
    jest
      .spyOn(magicObjectGenerator.utils, 'rollDice')
      .mockReturnValueOnce(58)
      .mockReturnValueOnce(4);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(7);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Sceptre de sécurité');
  });
});
