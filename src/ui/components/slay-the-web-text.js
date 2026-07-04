import createNewGame from '../../game/new-game.js'
import {getCurrRoom} from '../../game/utils-state.js'
import {html, render} from '../lib.js'
import Cards from './cards.js'
import {Monster} from './player.js'
import {SlayMap} from './slay-map.js'
import '../styles/map.css'
import '../styles/fct.css'
import '../styles/slay-the-web-text.css'

export default class SlayTheWebText extends HTMLElement {
	constructor() {
		super()
		this.game = createNewGame(true)
		window.stw = this.game
		// console.log('new text game', this.game)
	}

	connectedCallback() {
		this.update()
	}

	move(move) {
		this.game.enqueue({type: 'move', move})
		this.update()
	}

	submitCard(event) {
		event.preventDefault()
		const fd = new FormData(event.target)
		this.playCard(fd.get('card'), fd.get('target'))
	}

	playCard(cardId, target) {
		const card = this.game.state.hand.find((c) => c.id === cardId)
		this.game.enqueue({type: 'playCard', card, target})
		// this.update()
		this.render()
	}

	endTurn() {
		this.game.enqueue({type: 'endTurn'})
		this.update()
	}

	update() {
		console.log('update', this.game.state)
		this.game.dequeue()
		this.render()
	}

	undo() {
		this.game.undo()
		this.update()
	}

	render() {
		const {state} = this.game
		const room = getCurrRoom(state)
		console.log('render room', room)
		const template = html`
			<h1>Slay the Boss 原福</h1>
			<div>状态：${state.won ? '已获胜' : '进行中'}</div>
			<div>第${state.turn}回合</div>
			<p>${this.game.future.list.length} 个未来行动</p>
			<p>${this.game.past.list.length} 个历史行动</p>
			<menu>
				<button class="Button" onClick=${() => this.update()}><u>刷</u>新</button>
				<button class="Button EndTurn" onClick=${() => this.endTurn()}><u>结</u>束回合</button>
			</menu>
			<h2>玩家</h2>
			<p>格挡：${state.player.block}</p>
			<p>生命值：${state.player.currentHealth}/${state.player.maxHealth}</p>
			<p class="EnergyBadge">${state.player.currentEnergy}/${state.player.maxEnergy}</p>

			<h2>地图 x${state.dungeon.x}/y${state.dungeon.y} → ${room.type} 房间</h2>
			<div class="Targets-group">
				${room.monsters?.map((monster) => html`<${Monster} model=${monster} gameState=${state} />`)}
			</div>

			<h2>抽牌堆</h2>
			<${Cards} type="drawPile" gameState=${state} />
			<h2>手牌</h2>
			<${Cards} type="hand" gameState=${state} />

			<menu>
				<form onsubmit=${this.submitCard.bind(this)}>
					<select name="card" required>
						<option value="">选择一张卡牌</option>
						${state.hand.map((card) => html`<option value=${card.id}>${card.name}</option>`)}
					</select>
					<select name="target">
						<option value="">选择一个目标</option>
						<option value="player">玩家</option>
						<option value="allEnemies">所有敌人</option>
						${
							room?.monsters?.length &&
							room.monsters.map((_monster, i) => html`<option value=${`enemy${i}`}>敌人${i}</option>`)
						}
					</select>
					<button class="Button" type="submit">出牌</button>
				</form>
			</menu>

			<h2>弃牌堆</h2>
			<${Cards} type="discardPile" gameState=${state} />

			<${SlayMap}
				dungeon=${state.dungeon}
				x=${state.dungeon.x}
				y=${state.dungeon.y}
				onSelect=${this.move.bind(this)}
			><//>
		`
		render(template, this)
	}

	// handlePlayerReward(choice, card) {
	// 	this.game.enqueue({type: 'addCardToDeck', card})
	// 	this.setState({didPickCard: card})
	// 	this.update()
	// }

	handleCampfireChoice(choice, reward) {
		// Depending on the choice, run an action.
		if (choice === 'rest') {
			reward = Math.floor(this.game.state.player.maxHealth * 0.3)
			this.game.enqueue({type: 'addHealth', target: 'player', amount: reward})
		}
		if (choice === 'upgradeCard') {
			this.game.enqueue({type: 'upgradeCard', card: reward})
		}
		if (choice === 'removeCard') {
			this.game.enqueue({type: 'removeCard', card: reward})
		}
		// Store the result.
		this.game.enqueue({type: 'makeCampfireChoice', choice, reward})
		// Update twice (because two actions were enqueued)
		this.update()
		this.update()
		// this.goToNextRoom()
	}
}

if (!customElements.get('slay-the-web-text')) {
	customElements.define('slay-the-web-text', SlayTheWebText)
}
