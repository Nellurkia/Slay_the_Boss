export default {
	name: '绷住',
	type: 'skill',
	energy: 1,
	target: 'player',
	block: 5,
	description: '获得5点格挡。',
	image: 'angel-messenger.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		block: 8,
		description: '获得8点格挡。',
	}
}
