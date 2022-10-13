export class GeneratorUtils {
  computeCoinGenerationString(inputString: string): string {
    let res = inputString;
    res = this.replaceDiceValue(res);
    res = this.removeAverageInfo(res);
    res = this.computeProduct(res);
    return res;
  }

  computeProduct(inputString: string): string {
    const splitString = inputString.split(' ').filter(Boolean);

    const resArray: string[] = [];

    let index = 0;
    while (index < splitString.length) {
      const element = splitString[index];

      let operator: string;
      if (index < splitString.length - 2) {
        operator = splitString[index + 1];
      }

      //Can get two next element and we have a product
      if (operator === '×' || operator === 'x') {
        const leftNumber = Number(element);
        const rightNumber = Number(splitString[index + 2]);

        if (leftNumber !== NaN && rightNumber !== NaN) {
          resArray.push((leftNumber * rightNumber).toString());
          index += 3;
        }
      } else {
        resArray.push(element);
        index++;
      }
    }

    return resArray.join(' ');
  }
  replaceDiceValue(inputString: string): string {
    const diceRegex: RegExp = new RegExp('.d.', 'g');

    let match: RegExpExecArray;
    let resString = inputString;
    while ((match = diceRegex.exec(resString)) != null) {
      const position = match.index;

      resString =
        resString.substring(0, position) +
        this.generateDiceValue(match[0]) +
        resString.substring(position + match[0].length);
    }
    return resString;
  }

  removeAverageInfo(inputString: string): string {
    const infoRegex: RegExp = /\(([^)]+)\)/g;

    let match: RegExpExecArray;
    let resString = inputString;
    while ((match = infoRegex.exec(resString)) != null) {
      const position = match.index;

      resString =
        resString.substring(0, position) +
        resString.substring(position + 1 + match[0].length); // +1 for remove space
    }
    return resString;
  }

  generateDiceValue(inputDiceString: string): number {
    if (inputDiceString.length != 3) {
      console.error('Input dice string not in right format');
      return undefined;
    }

    const rollNumber = Number(inputDiceString[0]);
    const diceValue = Number(inputDiceString[2]);

    let total: number = 0;
    for (let index = 0; index < rollNumber; index++) {
      total += this.getRandomInt(1, diceValue);
    }
    return total;
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  }
}
