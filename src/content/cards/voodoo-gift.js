export default {
	name: '捣乱',
	energy: 0,
	type: 'attack',
	target: 'enemy',
	description: '造成等同于目标易伤与虚弱层数之和的伤害，并移除这些负面效果。',
	image: 'voodoo-education.png',
	actions: [
		{
			type: 'dealDamageEqualToWeak',
		},
		{
			type: 'dealDamageEqualToVulnerable',
		},
		{
			type: 'setPower',
			parameter: {
				power: 'weak',
				amount: 0,
			},
		},
		{
			type: 'setPower',
			parameter: {
				power: 'vulnerable',
				amount: 0,
			},
		},
	],
}

export const upgrade = (card) => {
	// remove the "reset of monster power"
	card.actions = [
		{
			type: 'dealDamageEqualToWeak',
		},
		{
			type: 'dealDamageEqualToVulnerable',
		},
	]
	return {
		...card,
		damage: 9,
		description: `${card.description}但不再移除负面效果。`,
	}
}
