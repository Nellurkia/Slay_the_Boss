import {getCardRewards} from '../../game/cards.js'
import {pick} from '../../utils.js'
import {html} from '../lib.js'
import CardChooser from './card-chooser.js'

/**
 *
 * @param {object} props
 * @prop {function} props.onSelectCard
 * @prop {object} props.gameState
 * @returns {import('preact').VNode}
 */
export default function VictoryRoom(props) {
	const state = props.gameState
	return html`
		<div class="Container Container--center">
			<h1 center>胜利！</h1>
			<h2 center>${pick(victoryRoomIntroTexts)}</h2>
			${
				!state.didPickCard &&
				html`
				<${CardChooser}
					animate
					cards=${getCardRewards(3)}
					didSelectCard=${(card) => props.onSelectCard(card)}
					buttonLabel="加入牌组"
					showUpgrades=${false}
				/>
			`
			}
			<ul class="Options">
				<button class="Button" onClick=${props.onContinue}>前往下一个房间</button>
			</ul>
		</div>
	`
}

const victoryRoomIntroTexts = [
	'战斗告捷，新的卡牌已摆在桌上。请谨慎挑选。',
	'胜利虽甜，一张新卡岂不更甜？',
	'怪物已倒，士气正盛。',
	'败者的气息尚未散去，不如用一张新卡庆祝一下？',
	'当然，你也可以放弃奖励。悉听尊便。',
	'斩妖除魔之后，该有所收获了。英雄，你要选哪张？',
	'胜利在望！可别恋战太久，这些卡牌可不会自己跳进你手里。',
	'这里的卡牌，任你予取予求',
	'选一张吧，随便哪张！',
	'奖励就在眼前。别忘了，牌组贵精不贵多——除非你走的是"腐化"路线，那就另当别论了。',
	'欢迎来到胜利之室，今日的抉择，就是明日的胜利……或者，嗯，失败。',
	'新卡牌任你挑选，别小看这几张新纸牌的力量。',
]
