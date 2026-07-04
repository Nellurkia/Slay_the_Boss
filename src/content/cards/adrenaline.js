export default {
	name: '摸鱼',
	type: 'skill',
	energy: 0,
	damage: 0,
	target: 'player',
	actions: [
		{
			type: 'drawCards',
			parameter: {
				amount: 2,
			},
		},
		{
			type: 'addEnergyToPlayer',
			parameter: {
				amount: 1,
			},
		},
	],
	description: '获得1点能量。抽2张牌。消耗。',
	image: 'serpentine-dancer.jpg',
	exhaust: true,
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'addEnergyToPlayer')
	a.parameter.amount = 2
	return {
		...card,
		description: '获得2点能量。抽2张牌。消耗。',
	}
}
