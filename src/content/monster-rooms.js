import {Monster} from '../game/monster.js'
import {MonsterRoom} from '../game/rooms.js'
import {random} from '../utils.js'

// Groups of monster rooms of varying difficulty. Technically elites and bosses are just stronger monsters.
export const monsters = {}
export const elites = {}
export const bosses = {}

monsters['孤狼兽人斥候'] = MonsterRoom(
	Monster({
		name: '兽人斥候',
		sprite: [0, 2],
		hp: random(8, 14),
		intents: [{damage: 7}, {damage: 11}, {damage: 7}, {block: 9}],
		random: 2,
	}),
)
monsters['兽人巡逻队'] = MonsterRoom(
	Monster({
		name: '兽人弓箭手',
		sprite: [0, 5],
		hp: random(8, 14),
		intents: [{damage: 7}, {damage: 11}, {damage: 7}, {block: 9}],
		random: 2,
	}),
	Monster({
		name: '兽人斥候',
		sprite: [0, 2],
		hp: random(8, 14),
		intents: [{damage: 6}, {damage: 11}, {damage: 5}, {block: 5}],
		random: 1,
	}),
)

monsters['兽人武士'] = MonsterRoom(
	Monster({
		name: '兽人武士',
		sprite: [0, 0],
		hp: random(18, 20),
		intents: [{damage: 7}, {damage: 11}, {damage: 7}, {block: 9}],
		random: 4,
	}),
)
monsters['骷髅武士'] = MonsterRoom(
	Monster({
		name: '骷髅武士',
		sprite: [4, 0],
		hp: random(33, 37),
		intents: [{vulnerable: 1}, {damage: 10}, {damage: 6}, {}, {weak: 1}],
		random: 2,
	}),
)
//not perfect copy of base game monster, but pretty close
//needs to gain strength (add to the 6 block)
monsters['颚虫'] = MonsterRoom(
	Monster({
		name: '颚虫',
		sprite: [6, 2],
		hp: random(40, 44),
		intents: [{damage: 11}, {damage: 7, block: 5}, {block: 6}],
	}),
)
monsters['史莱姆与萨满'] = MonsterRoom(
	Monster({
		name: '小史莱姆',
		sprite: [2, 0],
		hp: random(13, 17),
		intents: [{damage: 7}, {block: 4, damage: 8}, {damage: 6}, {}, {block: 6}],
		random: 2,
	}),
	Monster({
		name: '兽人萨满',
		sprite: [0, 1],
		hp: 29,
		intents: [{damage: 9}, {damage: 8}, {weak: 1}, {damage: 6}, {}],
		random: 2,
	}),
)
monsters['幽灵与狂战士'] = MonsterRoom(
	Monster({
		name: '幽灵',
		sprite: [5, 3],
		hp: random(28, 32),
		intents: [{weak: 1}, {damage: 9}, {damage: 6}, {}, {weak: 1}],
		random: 2,
	}),
	Monster({
		name: '兽人狂战士',
		sprite: [0, 3],
		hp: random(50, 54),
		intents: [{vulnerable: 1}, {damage: 6}, {damage: 9}, {block: 10}],
		random: 2,
	}),
)
monsters['鼠群'] = MonsterRoom(
	Monster({name: '巨鼠', sprite: [6, 11], hp: random(12, 15), random: 2, intents: [{damage: 6}]}),
	Monster({name: '巨鼠', sprite: [6, 11], hp: random(12, 15), random: 2, intents: [{damage: 6}]}),
	Monster({name: '巨鼠', sprite: [6, 11], hp: random(10, 16), random: 3, intents: [{damage: 6}]}),
)
monsters['巨魔打手'] = MonsterRoom(
	Monster({
		name: '巨魔',
		sprite: [1, 2],
		hp: 28,
		intents: [{weak: 1}, {block: 10, damage: 10}, {damage: 21}],
	}),
)

elites['死亡骑士'] = MonsterRoom(
	Monster({
		name: '死亡骑士',
		sprite: [4, 3],
		hp: 46,
		intents: [{damage: 12}, {block: 6, damage: 11}, {block: 5, damage: 16}, {}, {block: 6}],
	}),
)
elites['兽人军阀'] = MonsterRoom(
	Monster({
		name: '兽人军阀',
		sprite: [0, 4],
		hp: 60,
		intents: [{damage: 12}, {damage: 11, weak: 1}, {damage: 4, block: 6}],
		random: 6,
	}),
)
elites['双头巨人'] = MonsterRoom(
	Monster({name: '巨人', sprite: [1, 0], hp: 70, block: 12, intents: [{block: 5}, {damage: 16}]}),
)
elites['黑暗盟约'] = MonsterRoom(
	Monster({
		name: '幽灵教徒',
		sprite: [5, 3],
		hp: random(39, 46),
		intents: [{weak: 1}, {damage: 10}],
	}),
	Monster({
		name: '女巫',
		sprite: [5, 4],
		hp: random(39, 46),
		intents: [{damage: 10}, {weak: 1}, {damage: 4}],
	}),
	Monster({
		name: '亡灵',
		sprite: [5, 2],
		hp: random(39, 46),
		intents: [{damage: 2}, {damage: 10}, {damage: 8}],
	}),
)

bosses['远古巨龙'] = MonsterRoom(
	Monster({
		name: '远古巨龙',
		sprite: [8, 2],
		hp: random(100, 140),
		intents: [{damage: 16}, {block: 6}, {damage: 16}, {damage: 7}, {weak: 2}],
		random: 5,
	}),
)
bosses['史莱姆之王'] = MonsterRoom(
	Monster({
		name: '史莱姆之王',
		sprite: [2, 1],
		hp: 62,
		intents: [
			{damage: 5},
			{damage: 8},
			{damage: 12},
			{damage: 17},
			{damage: 23},
			{damage: 30},
			{damage: 38},
			{damage: 45},
		],
	}),
)
