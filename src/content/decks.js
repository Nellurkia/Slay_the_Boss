/**
 * @typedef {Object} Deck
 * @property {string} id
 * @property {string} name
 * @property {string[]} cards
 * @property {boolean} [custom] - whether this is a custom (user) deck
 */

/** @type {Deck} */
export const deck1 = {
	id: 'classic',
	name: '经典',
	cards: ['绷住', '绷住', '绷住', '绷住', '捶打', '捶打', '捶打', '捶打', '捶打', '电眼'],
}

/** @type {Deck} */
export const deck2 = {
	id: 'one-of-each',
	name: '每种一张',
	cards: [
		'摸鱼',
		'电眼',
		'头锤',
		'偷袭',
		'急了',
		'AOE',
		'绷住',
		'硬撑',
		'卖萌',
		'立体防御',
		'硬刚',
		'吐槽',
		'解压',
		'灵魂吸取',
		'捶打',
		'PUA',
		'麻了',
		'休假',
		'破防',
		'雷霆',
		'捣乱',
	],
}
