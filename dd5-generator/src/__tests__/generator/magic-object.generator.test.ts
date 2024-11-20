import { MagicObjectGenerator } from '../../generator/magic-object.generator';

describe('MagicObjectGenerator', () => {
  let magicObjectGenerator: MagicObjectGenerator;

  beforeEach(() => {
    magicObjectGenerator = new MagicObjectGenerator();
  });

  it('should be defined', () => {
    expect(magicObjectGenerator).toBeDefined();
  });

  it('should generate magic object', async () => {
    const magicObject = await magicObjectGenerator.generateMagicObject(1);
    expect(magicObject).toBeDefined();
    expect(magicObject.length).toBeGreaterThan(0);
  });

  it('should generate a "Baguette de métamorphose" from rank 6 when rolled a 87', async () => {
    jest.spyOn(magicObjectGenerator.utils, 'rollDice').mockReturnValue(87);
    const magicObject = await magicObjectGenerator.generateMagicObjectByRank(6);
    expect(magicObject).toBeDefined();
    expect(magicObject).toBe('Baguette de métamorphose');
  });
});
