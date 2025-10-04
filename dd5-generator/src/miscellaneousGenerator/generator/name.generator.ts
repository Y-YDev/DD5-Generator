import axios from 'axios';
import { GeneratorUtils } from 'src/utils/generator.utils';
import { ANCESTRIES, FAMILY, GENDERS, NAME_GENERATOR_API_URL } from '../utils/const';

export class NameGenerator {
	utils = new GeneratorUtils();

	public async generateRandomName(): Promise<string> {
		const ancestry = this.utils.getRandomElementInArray(ANCESTRIES);
		const gender = this.utils.getRandomElementInArray(GENDERS);
		const family = this.utils.getRandomElementInArray(FAMILY);

		// Call API with axios
		try {
			console.debug(`Fetching fantasy name with params: ancestry=${ancestry}, gender=${gender}, family=${family}`);
			const response = await axios.get(NAME_GENERATOR_API_URL, {
				params: {
					ancestry: ancestry,
					gender: gender,
					family: family,
				},
			});
			return response.data;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to fetch fantasy names: ${errorMessage}`);
		}
	}
}
