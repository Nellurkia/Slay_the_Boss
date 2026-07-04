export default {
	name: '解压',
	type: 'skill',
	energy: 2,
	target: 'player',
	description: '驱散你的虚弱和易伤。',
	image: 'ritual-rain.png',
	damage: 0,
	actions: [
		{
			type: 'removePlayerDebuffs',
		},
	],
}

export const upgrade = (card) => {
	return {
		...card,
		description: '驱散你的虚弱和易伤。获得10点格挡。',
		block: 10,
	}
}
