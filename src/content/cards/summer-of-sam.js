export default {
	name: '休假',
	type: 'skill',
	energy: 1,
	target: 'player',
	description: '恢复1点生命值。若生命值低于50%则额外抽2张牌。',
	image: 'bare-feet-of-god.jpg',
	actions: [
		{
			type: 'addHealth',
			parameter: {
				amount: 1,
			},
		},
		{
			type: 'drawCards',
			parameter: {
				amount: 2,
			},
			conditions: [
				{
					type: 'healthPercentageBelow',
					percentage: 50,
				},
			],
		},
	],
}

export const upgrade = (card) => {
	// An example of how to upgrade a local action.
	const a = card.actions.find((action) => action.type === 'addHealth')
	a.parameter.amount = 2
	return {
		...card,
		description: '恢复2点生命值。若生命值低于50%则额外抽2张牌。',
	}
}
