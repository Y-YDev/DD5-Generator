import { GeneratorUtils } from 'src/utils/generator.utils';

const INCIDENT = [
	"Une surtension magique inflige 1d6 dégâts de force par niveau du sort à l'utilisateur du parchemin.",
	"Le sort affecte l'utilisateur du parchemin ou un allié (déterminé au hasard) à la place de la cible prévue ou bien affecte une cible aléatoire à proximité si la cible originelle était l'utilisateur du parchemin.",
	'Le sort affecte un endroit déterminé au hasard et situé à portée du sort.',
	"Le sort produit l'effet contraire de celui normalement produit, mais il n'est ni nuisible ni avantageux.",
	"L'utilisateur du parchemin souffre d'un effet mineur mais bizarre, en rapport avec le sort. Cet effet dure aussi longtemps que la durée initiale du sort ou 1d10 minutes pour les sorts aux effets instantanés.",
	"Le sort s'active au bout de 1d12 heures. Si l'utilisateur du parchemin était la cible prévue, le sort prend effet normalement. S'il n'était pas la cible visée, le sort part dans la direction générale de la cible prévue, dans la limite qu'autorise de sa portée si la cible s'est déplacée.",
];

export class ScrollIncidentGenerator {
	utils = new GeneratorUtils();

	public generateScrollIncident(): string {
		const diceRoll = this.utils.rollDice(6);
		const incidentRaw = INCIDENT[diceRoll - 1];
		const incident = this.utils.replaceDiceValue(incidentRaw);
		return incident;
	}
}
