export default {
	name: '立体防御',
	type: 'attack',
	energy: 1,
	damage: 5,
	block: 5,
	target: 'enemy',
	description: '造成5点伤害。获得5点格挡。',
	image: 'henry-stares-back.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 7,
	block: 7,
	description: '造成7点伤害。获得7点格挡。',
})
