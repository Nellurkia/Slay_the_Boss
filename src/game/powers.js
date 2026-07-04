/**
 * The type of a power
 * @typedef POWER
 * @prop {string} name
 * @prop {string} description
 * @prop {string} type
 * @prop {string=} target
 * @prop {Function=} use
 */

// Class representing a power.
class Power {
	/**
	 * @param {POWER} power - The base power to create a class from
	 */
	constructor(power) {
		const {name, description, type, target, use} = power
		this.name = name
		this.description = description
		this.type = type
		this.target = target
		this.use = use
	}
}

export const regen = new Power({
	type: 'buff',
	name: '再生',
	description: '每回合恢复等同于再生层数的生命值',
	target: 'player',
	use: (stacks) => stacks,
})

export const poison = new Power({
	type: 'debuff',
	name: '中毒',
	description: '受到等同于中毒层数的伤害（todo: 应改为回合开始而非结束时递减）',
	use: (stacks) => stacks,
})

export const vulnerable = new Power({
	type: 'debuff',
	name: '易伤',
	description: '易伤状态下受到的伤害增加50%',
	use: (dmg) => Math.floor(dmg * 1.5),
})

export const weak = new Power({
	type: 'debuff',
	name: '虚弱',
	description: '虚弱状态下造成的伤害减少25%',
	use: (dmg) => Math.floor(dmg * 0.75),
})

export const strength = new Power({
	type: 'buff',
	name: '力量',
	description: '力量状态下造成的伤害增加x点', //make x be current strength level
	use: (stacks) => stacks,
})

/**tried to add strength, but can't figure out how to give the +1 dmg per stack and stack doesn't reduce*/
export default {regen, vulnerable, weak, strength}
