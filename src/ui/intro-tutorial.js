import {driver} from 'driver.js'
import 'driver.js/dist/driver.css'

export default function startTutorial() {
	const steps = [
		{
			popover: {
				title: '你好',
				description: '这是一段关于Slay the Boss 原福的简短介绍。跟我来...（按回车键继续）',
			},
		},
		{
			element: '.Target[data-type="player"]',
			popover: {align: 'center', description: '这是你。尽量不要把生命值全部耗光。'},
		},
		{
			element: '.Hand .Cards',
			popover: {align: 'center', description: '你抽了5张牌。打出卡牌需要消耗能量。'},
		},
		{
			element: '.EnergyBadge',
			popover: {description: '你有3点能量，每回合都会恢复。'},
		},
		{
			element: '.EndTurn',
			popover: {description: '结束回合后，怪物将会行动。'},
		},
	]
	const enemies = document.querySelectorAll('.Target[data-type="enemy"]')
	enemies.forEach((target) => {
		steps.push({
			element: target,
			popover: {
				align: 'center',
				position: 'left',
				description: '这是一个敌人。用卡牌攻击它直到它死亡。',
			},
		})
	})
	steps.push({popover: {description: '剩下的就要靠你自己摸索了。祝你好运！'}})

	const intro = driver({allowClose: false, nextBtnText: '好的', showButtons: ['next'], steps})
	intro.drive()
}
