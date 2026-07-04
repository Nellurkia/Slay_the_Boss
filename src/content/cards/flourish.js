const flourish = {
	name: '硬撑',
	type: 'skill',
	energy: 2,
	target: 'player',
	description: '获得5层再生。只有当生命值低于50%时才能使用。',
	image: '5.jpg',
	powers: {
		regen: 5,
	},
	conditions: [
		{
			type: 'healthPercentageBelow',
			percentage: 50,
		},
	],
}

export default flourish

export const upgrade = (card) => {
	const a = card.conditions.find((action) => action.type === 'healthPercentageBelow')
	a.percentage = 75
	return {
		...card,
		description: '获得5层再生。只有当生命值低于75%时才能使用。',
	}
}
