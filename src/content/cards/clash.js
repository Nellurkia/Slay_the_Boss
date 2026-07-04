// Clash.js
export default {
	name: '急了',
	type: 'attack',
	energy: 0,
	damage: 14,
	target: 'enemy',
	conditions: [
		{
			type: 'onlyType',
			cardType: 'attack',
		},
	],
	description: '只有当手牌中全部是攻击牌时才能使用。造成14点伤害。',
	image: 'h-sperling-horrified.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 17,
	description: '只有当手牌中全部是攻击牌时才能使用。造成17点伤害。',
})
