export class GeneratorUtils {
	replaceDiceValue(inputString: string): string {
		const diceRegex: RegExp = /\d+d\d+/g; // Regex to detect "XdY"

		let match: RegExpExecArray | null;
		let resString = inputString;
		while ((match = diceRegex.exec(resString)) != null) {
			const position = match.index;
			resString =
				resString.substring(0, position) + // Keep beginning
				this.generateDiceValue(match[0]) + // Replace the value by the dice roll in the string
				resString.substring(position + match[0].length); // Keep end
		}
		return resString;
	}

	generateDiceValue(inputDiceString: string): number | undefined {
		const [rollNumber, diceFace] = inputDiceString.split('d').map(Number);

		if (isNaN(rollNumber) || isNaN(diceFace)) {
			console.error('Invalid dice number or face');
			return undefined;
		}
		let total = 0;
		for (let i = 0; i < rollNumber; i++) {
			total += this.rollDice(diceFace);
		}
		console.debug(`Rolled ${rollNumber}d${diceFace}: ${total}`);
		return total;
	}

	rollDice(diceFace: number) {
		const roll = Math.floor(Math.random() * diceFace) + 1;
		return roll;
	}

	removeAverageInfo(inputString: string): string {
		// Detect "(XXX)" (at least one X)
		const infoRegex: RegExp = /\(\d+\)/g;

		let match: RegExpExecArray | null;
		let resString = inputString;
		while ((match = infoRegex.exec(resString)) != null) {
			const position = match.index;
			// Remove the (XXX) in the string
			resString = resString.substring(0, position) + resString.substring(position + 1 + match[0].length); // +1 for remove space after (XX)
		}
		return resString;
	}
}
