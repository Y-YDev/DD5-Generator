export class GeneratorUtils {
  replaceDiceValue(inputString: string): string {
    const diceRegex: RegExp = /\dd\d/g; // Regex to detect "XdY"

    let match: RegExpExecArray;
    let resString = inputString;
    while ((match = diceRegex.exec(resString)) != null) {
      const position = match.index;

      resString =
        resString.substring(0, position) + // Keep beginin
        this.generateDiceValue(match[0]) + // Replace the value by the dice roll in the string
        resString.substring(position + match[0].length); // Keep end
    }
    return resString;
  }

  generateDiceValue(inputDiceString: string): number {
    // String must be XDY
    if (inputDiceString.length != 3) {
      console.error('Input dice string not in right format');
      return undefined;
    }

    const rollNumber = Number(inputDiceString[0]);
    const diceFace = Number(inputDiceString[2]);

    let total: number = 0;
    // Roll X time dice of Y face
    for (let index = 0; index < rollNumber; index++) {
      total += this.rollDice(diceFace);
    }
    console.debug(`Roll ${rollNumber}d${diceFace}: ${total}`);
    return total;
  }

  rollDice(diceFace: number) {
    const roll = Math.floor(Math.random() * diceFace) + 1;
    return roll;
  }

  removeAverageInfo(inputString: string): string {
    // Detect "(XXX)" (at least one X)
    const infoRegex: RegExp = /\(\d+\)/g;

    let match: RegExpExecArray;
    let resString = inputString;
    while ((match = infoRegex.exec(resString)) != null) {
      const position = match.index;
      // Remove the (XXX) in the string
      resString =
        resString.substring(0, position) +
        resString.substring(position + 1 + match[0].length); // +1 for remove space after (XX)
    }
    return resString;
  }
}
