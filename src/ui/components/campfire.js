import {isCurrRoomCompleted} from '../../game/utils-state.js'
import {pick} from '../../utils.js'
import {Component, html} from '../lib.js'
import CardChooser from './card-chooser.js'

export default class CampfireRoom extends Component {
	rest() {
		this.props.onChoose('rest')
	}
	choose(choice, reward) {
		this.setState({
			choice,
			reward,
			isChoosingCard: !this.state.isChoosingCard,
		})
		if (reward) {
			this.props.onChoose(choice, reward)
		}
	}
	onSelectCard(card) {
		this.choose(this.state.choice, card)
	}
	render(props, state) {
		const {gameState} = props
		const {choice, isChoosingCard} = state
		let label = ''
		if (isCurrRoomCompleted(gameState)) {
			return html`
			<div class="Container Container--center">
				<h1 center>你已经做过选择了</h1>
				<p center>
					<button class="Button" onClick=${props.onContinue}>前往下一个房间</button>
				</p>
			</div>
		`
		}

		let labelButton = ''
		if (choice === 'upgradeCard') {
			label = '选择一张要升级的卡牌'
			labelButton = '升级卡牌'
		}
		if (choice === 'removeCard') {
			label = '选择一张要移除的卡牌'
			labelButton = '移除卡牌'
		}

		return html`
			<div class="Container Container--center">
				<h1 center>营火</h1>
				<p center>${pick(campfireIntroTexts)}</p>

						${
							!isChoosingCard &&
							html`
				<div class="Box">
					<ul class="Options">
									<li><button class="Button" onClick=${() => this.rest()}>休息</button></li>
									<li><button class="Button" onClick=${() => this.choose('upgradeCard')}>升级卡牌</button></li>
									<li><button class="Button" onClick=${() => this.choose('removeCard')}>移除卡牌</button></li>
					</ul>
				</div>
								`
						}

				${
					isChoosingCard &&
					html`
					<br/>
					<h2 center>${label}</h2>
					<${CardChooser}
						gameState=${gameState}
						cards=${gameState.deck.filter((card) => !card.upgraded)}
						didSelectCard=${(card) => this.onSelectCard(card)}
						buttonLabel=${labelButton}
					/>`
				}

				<p center>
					${
						isChoosingCard
							? html`<button class="Button" onClick=${() => this.setState({isChoosingCard: false})}>取消</button>`
							: html`<button class="Button" onClick=${() => this.props.onContinue()}>不用了，谢谢</button>`
					}
				</p>

			</div>
		`
	}
}

const campfireIntroTexts = [
	'篝火的温暖在召唤你。趁现在好好休息，为接下来的挑战积蓄力量吧。',
	'跃动的篝火邀你稍作歇息。体力和你的牌组同样重要。',
	'火光洒在你的卡牌上。或许，此刻正适合打磨它们的力量？',
	'篝火的光芒映照着你的牌组。一次升级，或许就能扭转下一场战斗？',
	'坐在火堆旁，你审视着自己的牌组。也许，是时候舍弃一张牌了？',
	'火光摇曳，你翻看着手中的卡牌。有时候，少即是多。',
	'前方是一处篝火，难得的片刻安宁。你将如何把握它？',
	'火光映在卡牌上，这里的每个选择都可能成为你的制胜之机。',
]
