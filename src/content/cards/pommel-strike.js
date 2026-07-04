export default {
	name: '吐槽',
	type: 'attack',
	energy: 1,
	target: 'enemy',
	description: '造成9点伤害。抽1张牌。',
	image: '8.jpg',
	damage: 9,
	actions: [
		{
			type: 'drawCards',
			parameter: {
				amount: 1,
			},
		},
	],
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'drawCards')
	a.parameter.amount = 2
	return {
		...card,
		damage: 10,
		description: '造成10点伤害。抽2张牌。',
	}
}
