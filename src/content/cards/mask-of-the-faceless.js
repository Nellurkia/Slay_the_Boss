export default {
	name: '硬刚',
	type: 'skill',
	energy: 0,
	target: 'player',
	description: '获得1点能量。',
	image: 'mask-of-the-faceless.png',
	damage: 0,
	actions: [
		{
			type: 'addEnergyToPlayer',
			parameter: {
				amount: 1,
			},
		},
	],
}

export const upgrade = (card) => {
	return {
		...card,
		block: 5,
		description: '获得1点能量和5点格挡。',
	}
}
