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
});
