// SoulDrain.js
export default {
	name: '灵魂吸取',
	type: 'attack',
	energy: 1,
	target: 'allEnemies',
	description: '对所有敌人施加3层虚弱和易伤。消耗你3点生命值。',
	image: 'soul-drain.png',
	damage: 0,
	powers: {
		weak: 3,
		vulnerable: 3,
	},
	actions: [
		{
			type: 'removeHealth',
			parameter: {
				amount: 3,
				target: 'player',
			},
		},
	],
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'removeHealth')
	a.parameter.amount = 4
	return {
		...card,
		powers: {
			weak: 4,
			vulnerable: 4,
		},
		description: '对所有敌人施加4层虚弱和易伤。消耗你3点生命值。',
	}
}
