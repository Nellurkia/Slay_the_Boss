import {postRun} from '../../game/backend.js'
import {html, useState} from '../lib.js'

/**
 * Renders a form to submit the game run to the backend.
 * @param {object} props
 * @param {import('../../game/new-game.js').Game} props.game
 * @returns {import('preact').VNode}
 */
export function PublishRun({game}) {
	const [loading, setLoading] = useState(false)
	const [didSubmit, setDidSubmit] = useState(false)

	async function onSubmit(event) {
		event.preventDefault()
		setLoading(true)
		const fd = new FormData(event.target)
		const name = String(fd.get('playername'))
		await postRun(game, name)
		setLoading(false)
		setDidSubmit(true)
	}

	const endedAt = game.state.endedAt || Date.now()
	const duration = (endedAt - game.state.createdAt) / 1000

	return html`
		<form onSubmit=${onSubmit} class="Form Form--vertical">
			<p>你抵达了第 ${game.state.dungeon.y} 层，用时 ${duration} 秒。</p>
			${
				game.state.didCheat
					? html`<p><em>由于本次对局使用了作弊指令，排行榜功能已禁用。</em></p>
						<p center><a href="/stats" class="Button">查看排行榜</a></p>`
					: !didSubmit
						? html`
							<label
								>是否将本次对局提交到 Slay the Boss 原福 公开排行榜？<br />
								<input type="text" name="playername" maxlength="140" required placeholder="认识你自己" />
							</label>
							<button class="Button" disabled=${loading} type="submit">提交我的对局</button>
							<p>${loading ? '提交中…' : ''}</p>
							<p center><a href="/stats">查看排行榜</a></p>
						`
						: html`<p>感谢你的提交。</p>`
			}
		</form>
	`
}
