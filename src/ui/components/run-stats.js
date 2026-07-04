import {getRun} from '../../game/backend.js'
import {createCard} from '../../game/cards.js'
import {html, useEffect, useState} from '../lib.js'
import {Card} from './cards.js'
import {getEnemiesStats} from './dungeon-stats.js'
import {SlayMap} from './slay-map.js'

export default function RunStats() {
	/** @type {ReturnType<typeof useState<import('../../game/backend.js').Run>>} */
	const [run, setRun] = useState()
	/** @type {ReturnType<typeof useState<string>>} */
	const [id, setId] = useState()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		setId(params.get('id'))
	}, [])

	useEffect(() => {
		if (!id) {
			setRun(null)
			return
		}
		getRun(id).then((what) => {
			setRun(what)
			console.log(what)
		})
	}, [id])

	if (!id) return html`<p>在网址中加上 ?id=1234（使用真实的ID）以查看某次对局。</p>`
	if (!run) return html`<h1>正在加载第 ${id} 号对局的统计数据……</h1>`

	const state = run.gameState
	const date = new Intl.DateTimeFormat('zh-CN', {
		dateStyle: 'long',
		hour12: false,
	}).format(new Date(state.createdAt))

	const ms = state.endedAt - state.createdAt
	const hours = Math.floor(ms / (1000 * 60 * 60))
	const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((ms / 1000) % 60)
	const duration = `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`

	// Not all runs have this data in the backend.
	const extraStats = state.dungeon.graph ? getEnemiesStats(state.dungeon) : null
	console.log('extraStats', extraStats)

	return html`
		<header class="Header">
			<h1>Slay the Boss 原福 第 ${run.id} 号对局</h1>
		</header>

		<div class="Box Box--text">
			<p>
				<em>${run.player}</em> 抵达了第 ${state.dungeon.y} 层，最终
				<strong>${state.won ? '获胜' : '落败'}</strong>。
			</p>
			<p>本次对局于 ${date} 进行，耗时 ${duration}。</p>
			<p>
				玩家在 ${run.gameState.turn} 个回合中共行动 ${run.gamePast.length} 次，<br />
				结束时生命值为 ${state.player.currentHealth}/${state.player.maxHealth}。
			</p>

			${
				extraStats &&
				html`<p>你遭遇了 ${extraStats.encountered} 个怪物，并击杀了其中 ${extraStats.killed} 个。</p>`
			}
		</div>

		<div class="Box">
			<p>
				查看本次对局的原始 JSON 数据
				<a href=${`https://api.slaytheweb.cards/api/runs/${run.id}`}
					>api.slaytheweb.cards/api/runs/${run.id}</a
				>。
			</p>
		</div>

		<div class="Box">
			<p>最终牌组共有 ${state.deck.length} 张卡牌：</p>
			<div class="Cards Cards--grid Cards--mini">
				${state.deck
					.map((cardName) => {
						try {
							return Card({card: createCard(cardName)})
						} catch (err) {
							console.warn(`Skipping card "${cardName}": ${err.message}`)
							return null
						}
					})
					.filter(Boolean)}
			</div>
		</div>

		<${SlayMap}
			dungeon=${run.gameState.dungeon}
			x=${state.dungeon.x}
			y=${state.dungeon.y}
			scatter=${20}
			debug=${true}
		><//>
	`
}
